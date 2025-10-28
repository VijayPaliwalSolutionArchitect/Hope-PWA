import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';

// Import routes
import authRoutes from './routes/auth.js';
import blogsRoutes from './routes/blogs.js';
import testimonialsRoutes from './routes/testimonials.js';
import inquiriesRoutes from './routes/inquiries.js';
import settingsRoutes from './routes/settings.js';
import exceptionsRoutes from './routes/exceptions.js';
import logsRoutes from './routes/logs.js';
import healthRoutes from './routes/health.js';

const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/exceptions', exceptionsRoutes);
app.use('/api/logs', logsRoutes);
app.use('/api/health', healthRoutes);

// Root endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Hope Clinic API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      blogs: '/api/blogs',
      testimonials: '/api/testimonials',
      inquiries: '/api/inquiries',
      settings: '/api/settings',
      exceptions: '/api/exceptions',
      logs: '/api/logs',
      health: '/api/health',
    },
  });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
