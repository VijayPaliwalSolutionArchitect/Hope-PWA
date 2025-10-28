import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Heart, Users, Star, Send } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { settings, testimonials, blogs, inquiries } from '../services/api';

const HomePage = () => {
  const [siteSettings, setSiteSettings] = useState({});
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, testimonialsRes, blogsRes] = await Promise.all([
          settings.getPublic(),
          testimonials.getAll(),
          blogs.getAll({ published: 'true' }),
        ]);
        setSiteSettings(settingsRes.data);
        setTestimonialsData(testimonialsRes.data.slice(0, 3));
        setRecentBlogs(blogsRes.data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: 'loading', message: 'Sending...' });
    try {
      await inquiries.submit(formData);
      setFormStatus({ type: 'success', message: 'Thank you! We will get back to you soon.' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <>
      <Helmet>
        <title>{siteSettings.site_title || 'Hope Clinic - Modern Psychology Centre'}</title>
        <meta name="description" content={siteSettings.site_description || 'Professional psychological counseling and therapy services'} />
      </Helmet>

      <Header />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center aurora-bg pt-20">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              {siteSettings.hero_title || 'Transform Your Mind, Transform Your Life'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-slide-up">
              {siteSettings.hero_subtitle || 'Expert psychological counseling and therapy services'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <a href="#contact" className="btn-primary" data-testid="get-started-btn">
                Get Started <ArrowRight className="inline ml-2" />
              </a>
              <Link to="/blogs" className="px-6 py-3 bg-white/20 backdrop-blur-lg text-white rounded-lg font-semibold hover:bg-white/30 transition-all duration-300">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-900" data-testid="services-section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Services</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Comprehensive mental health care tailored to your needs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: 'Cognitive Therapy', description: 'Evidence-based cognitive behavioral therapy to help you overcome negative thought patterns.' },
              { icon: Heart, title: 'Emotional Wellness', description: 'Develop emotional intelligence and resilience to handle life\'s challenges.' },
              { icon: Users, title: 'Family Counseling', description: 'Strengthen family bonds and improve communication within your household.' },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="card hover:transform hover:scale-105 transition-all duration-300"
                data-testid={`service-card-${index}`}
              >
                <service.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      {recentBlogs.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800" data-testid="blogs-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Latest Insights</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Explore our latest articles on mental health</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.slug}`}
                  className="card hover:transform hover:scale-105 transition-all duration-300"
                  data-testid={`blog-card-${blog.slug}`}
                >
                  {blog.image && (
                    <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                  )}
                  <div className="text-sm text-indigo-600 dark:text-indigo-400 mb-2">{blog.category}</div>
                  <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{blog.summary}</p>
                  <div className="text-indigo-600 dark:text-indigo-400 font-semibold">
                    Read More <ArrowRight className="inline w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/blogs" className="btn-primary">
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonialsData.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-900" data-testid="testimonials-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">What Our Clients Say</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Real stories from real people</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonialsData.map((testimonial) => (
                <div key={testimonial.id} className="card" data-testid={`testimonial-${testimonial.id}`}>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{testimonial.message}"</p>
                  <p className="font-semibold text-indigo-600 dark:text-indigo-400">- {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800" data-testid="contact-section">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Have questions? We're here to help</p>
          </div>

          <form onSubmit={handleSubmit} className="card" data-testid="contact-form">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                data-testid="contact-name-input"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                data-testid="contact-email-input"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                data-testid="contact-phone-input"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" htmlFor="message">Message *</label>
              <textarea
                id="message"
                required
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                data-testid="contact-message-input"
              />
            </div>
            
            {formStatus.message && (
              <div className={`mb-4 p-3 rounded-lg ${formStatus.type === 'success' ? 'bg-green-100 text-green-700' : formStatus.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                {formStatus.message}
              </div>
            )}

            <button type="submit" className="btn-primary w-full" data-testid="contact-submit-btn">
              Send Message <Send className="inline ml-2 w-5 h-5" />
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HomePage;
