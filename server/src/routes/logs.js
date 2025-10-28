import express from 'express';
import prisma from '../prismaClient.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all logs (protected)
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const { eventType, limit = 100 } = req.query;
    
    const where = eventType ? { eventType } : {};

    const logs = await prisma.log.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
    });
    
    res.json(logs);
  } catch (error) {
    next(error);
  }
});

// Get log statistics (protected)
router.get('/stats', authMiddleware, async (req, res, next) => {
  try {
    const logs = await prisma.log.findMany({
      orderBy: { createdAt: 'desc' },
      take: 1000,
    });

    const stats = {
      total: logs.length,
      byEventType: {},
      recent: logs.slice(0, 10),
    };

    logs.forEach(log => {
      stats.byEventType[log.eventType] = (stats.byEventType[log.eventType] || 0) + 1;
    });

    res.json(stats);
  } catch (error) {
    next(error);
  }
});

// Delete old logs (protected)
router.delete('/cleanup', authMiddleware, async (req, res, next) => {
  try {
    const { days = 30 } = req.query;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));

    const result = await prisma.log.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    });

    res.json({ message: `Deleted ${result.count} old logs` });
  } catch (error) {
    next(error);
  }
});

export default router;
