import express from 'express';
import prisma from '../prismaClient.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all visible testimonials (public)
router.get('/', async (req, res, next) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { visible: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(testimonials);
  } catch (error) {
    next(error);
  }
});

// Get all testimonials including hidden (protected)
router.get('/admin/all', authMiddleware, async (req, res, next) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(testimonials);
  } catch (error) {
    next(error);
  }
});

// Create testimonial (protected)
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const testimonial = await prisma.testimonial.create({
      data: req.body,
    });

    await prisma.log.create({
      data: {
        eventType: 'testimonial_created',
        message: `Testimonial created: ${testimonial.name}`,
        meta: JSON.stringify({ testimonialId: testimonial.id, userId: req.user.id }),
      },
    });

    res.status(201).json(testimonial);
  } catch (error) {
    next(error);
  }
});

// Update testimonial (protected)
router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const testimonial = await prisma.testimonial.update({
      where: { id: req.params.id },
      data: req.body,
    });

    await prisma.log.create({
      data: {
        eventType: 'testimonial_updated',
        message: `Testimonial updated: ${testimonial.name}`,
        meta: JSON.stringify({ testimonialId: testimonial.id, userId: req.user.id }),
      },
    });

    res.json(testimonial);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    next(error);
  }
});

// Delete testimonial (protected)
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const testimonial = await prisma.testimonial.delete({
      where: { id: req.params.id },
    });

    await prisma.log.create({
      data: {
        eventType: 'testimonial_deleted',
        message: `Testimonial deleted: ${testimonial.name}`,
        meta: JSON.stringify({ testimonialId: testimonial.id, userId: req.user.id }),
      },
    });

    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    next(error);
  }
});

export default router;
