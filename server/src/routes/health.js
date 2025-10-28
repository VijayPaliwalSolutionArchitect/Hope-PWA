import express from 'express';
import prisma from '../prismaClient.js';
import nodemailer from 'nodemailer';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const router = express.Router();

// Health check endpoint
router.get('/', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      database: { status: 'unknown' },
      email: { status: 'unknown' },
    },
    system: {
      memory: process.memoryUsage(),
      nodeVersion: process.version,
    },
  };

  // Check database
  try {
    await prisma.$queryRaw`SELECT 1`;
    health.services.database.status = 'ok';
  } catch (error) {
    health.services.database.status = 'error';
    health.services.database.error = error.message;
    health.status = 'degraded';
  }

  // Check email service
  try {
    const settings = await prisma.setting.findMany();
    const settingsMap = Object.fromEntries(settings.map(s => [s.key, s.value]));
    
    if (settingsMap.smtp_user && settingsMap.smtp_pass) {
      const transporter = nodemailer.createTransporter({
        host: settingsMap.smtp_host || 'smtp.gmail.com',
        port: parseInt(settingsMap.smtp_port) || 587,
        secure: settingsMap.smtp_secure === 'true',
        auth: {
          user: settingsMap.smtp_user,
          pass: settingsMap.smtp_pass,
        },
      });
      
      await transporter.verify();
      health.services.email.status = 'ok';
    } else {
      health.services.email.status = 'not_configured';
    }
  } catch (error) {
    health.services.email.status = 'error';
    health.services.email.error = error.message;
  }

  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(health);
});

// Get system stats (protected)
router.get('/stats', async (req, res) => {
  try {
    const stats = {
      database: {
        blogs: await prisma.blog.count(),
        testimonials: await prisma.testimonial.count(),
        inquiries: await prisma.inquiry.count(),
        exceptions: await prisma.exception.count({ where: { resolved: false } }),
        logs: await prisma.log.count(),
      },
      system: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        nodeVersion: process.version,
      },
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
