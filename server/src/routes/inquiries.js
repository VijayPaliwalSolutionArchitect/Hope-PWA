import express from 'express';
import prisma from '../prismaClient.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Submit inquiry (public)
router.post('/', async (req, res, next) => {
  try {
    const inquiry = await prisma.inquiry.create({
      data: req.body,
    });

    // Try to send auto-reply email
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

        const template = await prisma.emailTemplate.findUnique({
          where: { name: 'inquiry_received' },
        });

        if (template) {
          let htmlBody = template.htmlBody.replace('{{name}}', inquiry.name);
          
          await transporter.sendMail({
            from: settingsMap.smtp_user,
            to: inquiry.email,
            subject: template.subject,
            html: htmlBody,
          });
        }

        // Notify admin
        await transporter.sendMail({
          from: settingsMap.smtp_user,
          to: process.env.ADMIN_EMAIL,
          subject: 'New Inquiry Received',
          html: `<h2>New Inquiry</h2><p><strong>Name:</strong> ${inquiry.name}</p><p><strong>Email:</strong> ${inquiry.email}</p><p><strong>Message:</strong> ${inquiry.message}</p>`,
        });
      }
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
    }

    res.status(201).json(inquiry);
  } catch (error) {
    next(error);
  }
});

// Get all inquiries (protected)
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(inquiries);
  } catch (error) {
    next(error);
  }
});

// Reply to inquiry (protected)
router.post('/:id/reply', authMiddleware, async (req, res, next) => {
  try {
    const { message } = req.body;
    const inquiry = await prisma.inquiry.findUnique({
      where: { id: req.params.id },
    });

    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    const settings = await prisma.setting.findMany();
    const settingsMap = Object.fromEntries(settings.map(s => [s.key, s.value]));
    
    if (!settingsMap.smtp_user || !settingsMap.smtp_pass) {
      return res.status(400).json({ error: 'Email not configured' });
    }

    const transporter = nodemailer.createTransporter({
      host: settingsMap.smtp_host || 'smtp.gmail.com',
      port: parseInt(settingsMap.smtp_port) || 587,
      secure: settingsMap.smtp_secure === 'true',
      auth: {
        user: settingsMap.smtp_user,
        pass: settingsMap.smtp_pass,
      },
    });

    const template = await prisma.emailTemplate.findUnique({
      where: { name: 'inquiry_reply' },
    });

    let htmlBody = template ? template.htmlBody : '<p>{{message}}</p>';
    htmlBody = htmlBody.replace('{{name}}', inquiry.name).replace('{{message}}', message);

    await transporter.sendMail({
      from: settingsMap.smtp_user,
      to: inquiry.email,
      subject: template ? template.subject : 'Response to Your Inquiry',
      html: htmlBody,
    });

    await prisma.inquiry.update({
      where: { id: req.params.id },
      data: { replied: true },
    });

    await prisma.log.create({
      data: {
        eventType: 'inquiry_replied',
        message: `Replied to inquiry from ${inquiry.name}`,
        meta: JSON.stringify({ inquiryId: inquiry.id, userId: req.user.id }),
      },
    });

    res.json({ message: 'Reply sent successfully' });
  } catch (error) {
    next(error);
  }
});

// Delete inquiry (protected)
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const inquiry = await prisma.inquiry.delete({
      where: { id: req.params.id },
    });

    await prisma.log.create({
      data: {
        eventType: 'inquiry_deleted',
        message: `Inquiry deleted from ${inquiry.name}`,
        meta: JSON.stringify({ inquiryId: inquiry.id, userId: req.user.id }),
      },
    });

    res.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    next(error);
  }
});

export default router;
