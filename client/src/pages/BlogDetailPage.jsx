import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { blogs as blogsAPI } from '../services/api';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await blogsAPI.getBySlug(slug);
        setBlog(response.data);

        // Fetch related blogs from same category
        const relatedRes = await blogsAPI.getAll({ category: response.data.category, published: 'true' });
        setRelatedBlogs(relatedRes.data.filter(b => b.id !== response.data.id).slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch blog:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
          <Link to="/blogs" className="text-indigo-600 hover:underline">Back to Blogs</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} - Hope Clinic</title>
        <meta name="description" content={blog.summary} />
      </Helmet>

      <Header />
      <WhatsAppButton />

      <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/blogs" className="inline-flex items-center text-indigo-600 hover:underline mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>

          {blog.image && (
            <img src={blog.image} alt={blog.title} className="w-full h-96 object-cover rounded-xl mb-6" />
          )}

          <div className="mb-6">
            <span className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">{blog.category}</span>
            <h1 className="text-4xl md:text-5xl font-bold my-4">{blog.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {blog.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {blog.tags.split(',').map((tag, index) => (
                <span key={index} className="text-xs px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full flex items-center">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-12" dangerouslySetInnerHTML={{ __html: blog.content }} />

          {/* Related Blogs */}
          {relatedBlogs.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id}
                    to={`/blog/${relatedBlog.slug}`}
                    className="card hover:transform hover:scale-105 transition-all duration-300"
                  >
                    {relatedBlog.image && (
                      <img src={relatedBlog.image} alt={relatedBlog.title} className="w-full h-32 object-cover rounded-lg mb-3" />
                    )}
                    <h3 className="font-bold mb-2">{relatedBlog.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{relatedBlog.summary.substring(0, 100)}...</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogDetailPage;
