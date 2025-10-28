import express from 'express';
import prisma from '../prismaClient.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Log exception from frontend or backend (public for frontend errors)
router.post('/', async (req, res, next) => {
  try {
    const exception = await prisma.exception.create({
      data: req.body,
    });
    res.status(201).json(exception);
  } catch (error) {
    next(error);
  }
});

// Get all exceptions (protected)
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const { level, source, resolved } = req.query;
    
    const where = {};
    if (level) where.level = level;
    if (source) where.source = source;
    if (resolved !== undefined) where.resolved = resolved === 'true';

    const exceptions = await prisma.exception.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    
    res.json(exceptions);
  } catch (error) {
    next(error);
  }
});

// Mark exception as resolved (protected)
router.put('/:id/resolve', authMiddleware, async (req, res, next) => {
  try {
    const exception = await prisma.exception.update({
      where: { id: req.params.id },
      data: {
        resolved: true,
        resolvedAt: new Date(),
      },
    });

    await prisma.log.create({
      data: {
        eventType: 'exception_resolved',
        message: `Exception resolved: ${exception.message}`,
        meta: JSON.stringify({ exceptionId: exception.id, userId: req.user.id }),
      },
    });

    res.json(exception);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Exception not found' });
    }
    next(error);
  }
});

// Delete exception (protected)
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    await prisma.exception.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Exception deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Exception not found' });
    }
    next(error);
  }
});

export default router;
