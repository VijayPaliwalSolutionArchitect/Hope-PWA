import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('Shivam@123', 10);
  await prisma.user.upsert({
    where: { username: 'bharat' },
    update: {},
    create: {
      username: 'bharat',
      passwordHash: hashedPassword,
      role: 'admin',
    },
  });
  console.log('✅ Admin user created: bharat');

  // Create default settings
  const settings = [
    { key: 'site_title', value: 'Hope Clinic - Modern Psychology Centre' },
    { key: 'site_description', value: 'Professional psychological counseling and therapy services' },
    { key: 'clinic_name', value: 'Hope Clinic' },
    { key: 'clinic_email', value: 'vijay.paliwal@outlook.com' },
    { key: 'clinic_phone', value: '+91-9413833633' },
    { key: 'clinic_whatsapp', value: '+919413833633' },
    { key: 'clinic_address', value: 'Near Rajkamal Hotel, Sukher, Udaipur' },
    { key: 'hero_title', value: 'Transform Your Mind, Transform Your Life' },
    { key: 'hero_subtitle', value: 'Expert psychological counseling and therapy services to help you achieve mental wellness' },
    { key: 'smtp_host', value: 'smtp.gmail.com' },
    { key: 'smtp_port', value: '587' },
    { key: 'smtp_secure', value: 'false' },
    { key: 'smtp_user', value: '' },
    { key: 'smtp_pass', value: '' },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log('✅ Default settings created');

  // Create sample blogs
  const blogs = [
    {
      title: 'Understanding Anxiety: Causes and Coping Strategies',
      slug: 'understanding-anxiety',
      summary: 'Learn about the causes of anxiety and effective coping strategies to manage it.',
      content: '<h2>What is Anxiety?</h2><p>Anxiety is a normal emotion that everyone experiences. However, when it becomes excessive, it can interfere with daily life.</p><h2>Common Causes</h2><ul><li>Stress</li><li>Genetics</li><li>Environmental factors</li></ul><h2>Coping Strategies</h2><p>Therapy, medication, and lifestyle changes can help manage anxiety effectively.</p>',
      author: 'Dr. Vijay Paliwal',
      tags: 'anxiety,mental health,coping',
      category: 'Mental Health',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
      published: true,
    },
    {
      title: 'The Importance of Self-Care in Mental Wellness',
      slug: 'self-care-mental-wellness',
      summary: 'Discover why self-care is crucial for maintaining good mental health.',
      content: '<h2>Why Self-Care Matters</h2><p>Self-care is not selfish—it\'s essential for mental wellness and overall health.</p><h2>Self-Care Activities</h2><ul><li>Exercise regularly</li><li>Get enough sleep</li><li>Practice mindfulness</li><li>Connect with loved ones</li></ul>',
      author: 'Dr. Vijay Paliwal',
      tags: 'self-care,wellness,mental health',
      category: 'Wellness',
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88',
      published: true,
    },
    {
      title: 'Depression: Breaking the Stigma',
      slug: 'depression-breaking-stigma',
      summary: 'Understanding depression and how to seek help without shame.',
      content: '<h2>What is Depression?</h2><p>Depression is a medical condition that affects how you feel, think, and handle daily activities.</p><h2>Breaking the Stigma</h2><p>Seeking help is a sign of strength, not weakness. Professional support can make a significant difference.</p>',
      author: 'Dr. Vijay Paliwal',
      tags: 'depression,mental health,stigma',
      category: 'Mental Health',
      image: 'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8',
      published: true,
    },
  ];

  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: {},
      create: blog,
    });
  }
  console.log('✅ Sample blogs created');

  // Create sample testimonials
  const testimonials = [
    {
      name: 'Priya Sharma',
      message: 'The counseling sessions at Hope Clinic have been life-changing. I feel more confident and at peace with myself.',
      rating: 5,
      visible: true,
    },
    {
      name: 'Rahul Verma',
      message: 'Dr. Paliwal is an excellent therapist. His approach is compassionate and professional. Highly recommended!',
      rating: 5,
      visible: true,
    },
    {
      name: 'Anjali Gupta',
      message: 'I was struggling with anxiety for years. The therapy here helped me understand and manage my condition better.',
      rating: 5,
      visible: true,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }
  console.log('✅ Sample testimonials created');

  // Create default email templates
  const emailTemplates = [
    {
      name: 'welcome',
      subject: 'Welcome to Hope Clinic',
      htmlBody: '<h1>Welcome!</h1><p>Thank you for reaching out to Hope Clinic. We are here to support you on your journey to mental wellness.</p>',
    },
    {
      name: 'inquiry_received',
      subject: 'We Received Your Inquiry',
      htmlBody: '<h1>Thank You for Contacting Us</h1><p>Dear {{name}},</p><p>We have received your inquiry and will get back to you within 24 hours.</p><p>Best regards,<br>Hope Clinic Team</p>',
    },
    {
      name: 'inquiry_reply',
      subject: 'Response to Your Inquiry',
      htmlBody: '<h1>Response from Hope Clinic</h1><p>Dear {{name}},</p><p>{{message}}</p><p>Best regards,<br>Hope Clinic Team</p>',
    },
  ];

  for (const template of emailTemplates) {
    await prisma.emailTemplate.upsert({
      where: { name: template.name },
      update: {},
      create: template,
    });
  }
  console.log('✅ Default email templates created');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
