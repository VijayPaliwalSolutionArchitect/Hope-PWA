import express from 'express';
import prisma from '../prismaClient.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all settings (public - filtered)
router.get('/', async (req, res, next) => {
  try {
    const settings = await prisma.setting.findMany();
    const settingsMap = Object.fromEntries(settings.map(s => [s.key, s.value]));
    
    // Filter out sensitive settings
    const publicSettings = {};
    const publicKeys = [
      'site_title', 'site_description', 'clinic_name', 'clinic_email',
      'clinic_phone', 'clinic_whatsapp', 'clinic_address',
      'hero_title', 'hero_subtitle'
    ];
    
    publicKeys.forEach(key => {
      if (settingsMap[key]) {
        publicSettings[key] = settingsMap[key];
      }
    });
    
    res.json(publicSettings);
  } catch (error) {
    next(error);
  }
});

// Get all settings including sensitive (protected)
router.get('/admin/all', authMiddleware, async (req, res, next) => {
  try {
    const settings = await prisma.setting.findMany();
    const settingsMap = Object.fromEntries(settings.map(s => [s.key, s.value]));
    res.json(settingsMap);
  } catch (error) {
    next(error);
  }
});

// Update settings (protected)
router.put('/', authMiddleware, async (req, res, next) => {
  try {
    const updates = req.body;
    
    for (const [key, value] of Object.entries(updates)) {
      await prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }

    await prisma.log.create({
      data: {
        eventType: 'settings_updated',
        message: 'Settings updated',
        meta: JSON.stringify({ keys: Object.keys(updates), userId: req.user.id }),
      },
    });

    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    next(error);
  }
});

// Get email templates (protected)
router.get('/email-templates', authMiddleware, async (req, res, next) => {
  try {
    const templates = await prisma.emailTemplate.findMany();
    res.json(templates);
  } catch (error) {
    next(error);
  }
});

// Update email template (protected)
router.put('/email-templates/:id', authMiddleware, async (req, res, next) => {
  try {
    const template = await prisma.emailTemplate.update({
      where: { id: req.params.id },
      data: req.body,
    });

    await prisma.log.create({
      data: {
        eventType: 'email_template_updated',
        message: `Email template updated: ${template.name}`,
        meta: JSON.stringify({ templateId: template.id, userId: req.user.id }),
      },
    });

    res.json(template);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Template not found' });
    }
    next(error);
  }
});

export default router;
