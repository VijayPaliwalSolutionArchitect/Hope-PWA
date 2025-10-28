import prisma from '../prismaClient.js';
import nodemailer from 'nodemailer';

export const errorHandler = async (err, req, res, next) => {
  console.error('Error:', err);

  // Log exception to database
  try {
    await prisma.exception.create({
      data: {
        level: 'error',
        source: 'backend',
        message: err.message || 'Unknown error',
        stack: err.stack || '',
        metadata: JSON.stringify({
          url: req.url,
          method: req.method,
          body: req.body,
        }),
        emailSent: false,
        resolved: false,
      },
    });

    // Attempt to send email alert
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

        await transporter.sendMail({
          from: settingsMap.smtp_user,
          to: process.env.ADMIN_EMAIL,
          subject: '🚨 HopeClinic Error Alert',
          html: `<h2>Error Occurred</h2><p><strong>Message:</strong> ${err.message}</p><p><strong>URL:</strong> ${req.url}</p><pre>${err.stack}</pre>`,
        });
      }
    } catch (emailError) {
      console.error('Failed to send email alert:', emailError);
    }
  } catch (dbError) {
    console.error('Failed to log exception:', dbError);
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
};
