import express from 'express';
import prisma from '../prismaClient.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all blogs (public - with filters)
router.get('/', async (req, res, next) => {
  try {
    const { category, tag, search, published = 'true' } = req.query;
    
    const where = {
      published: published === 'true',
    };

    if (category) {
      where.category = category;
    }

    if (tag) {
      where.tags = { contains: tag };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    const blogs = await prisma.blog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

// Get single blog by slug (public)
router.get('/:slug', async (req, res, next) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug: req.params.slug },
    });

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    next(error);
  }
});

// Create blog (protected)
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const blog = await prisma.blog.create({
      data: req.body,
    });

    await prisma.log.create({
      data: {
        eventType: 'blog_created',
        message: `Blog created: ${blog.title}`,
        meta: JSON.stringify({ blogId: blog.id, userId: req.user.id }),
      },
    });

    res.status(201).json(blog);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Blog with this slug already exists' });
    }
    next(error);
  }
});

// Update blog (protected)
router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const blog = await prisma.blog.update({
      where: { id: req.params.id },
      data: req.body,
    });

    await prisma.log.create({
      data: {
        eventType: 'blog_updated',
        message: `Blog updated: ${blog.title}`,
        meta: JSON.stringify({ blogId: blog.id, userId: req.user.id }),
      },
    });

    res.json(blog);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Blog not found' });
    }
    next(error);
  }
});

// Delete blog (protected)
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const blog = await prisma.blog.delete({
      where: { id: req.params.id },
    });

    await prisma.log.create({
      data: {
        eventType: 'blog_deleted',
        message: `Blog deleted: ${blog.title}`,
        meta: JSON.stringify({ blogId: blog.id, userId: req.user.id }),
      },
    });

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Blog not found' });
    }
    next(error);
  }
});

// Get categories (public)
router.get('/meta/categories', async (req, res, next) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      select: { category: true },
    });
    
    const categories = [...new Set(blogs.map(b => b.category))];
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// Get tags (public)
router.get('/meta/tags', async (req, res, next) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      select: { tags: true },
    });
    
    const allTags = blogs.flatMap(b => b.tags.split(',').map(t => t.trim()));
    const tags = [...new Set(allTags)];
    res.json(tags);
  } catch (error) {
    next(error);
  }
});

export default router;
