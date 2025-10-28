import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { blogs as blogsAPI } from '../../services/api';

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '', slug: '', summary: '', content: '', author: '', 
    tags: '', category: '', image: '', published: false
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogsAPI.getAll({});
      setBlogs(response.data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        await blogsAPI.update(editingBlog.id, formData);
      } else {
        await blogsAPI.create(formData);
      }
      setShowForm(false);
      setEditingBlog(null);
      setFormData({ title: '', slug: '', summary: '', content: '', author: '', tags: '', category: '', image: '', published: false });
      fetchBlogs();
    } catch (error) {
      console.error('Failed to save blog:', error);
      alert('Failed to save blog');
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData(blog);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await blogsAPI.delete(id);
      fetchBlogs();
    } catch (error) {
      console.error('Failed to delete blog:', error);
      alert('Failed to delete blog');
    }
  };

  return (
    <>
      <Helmet><title>Blog Manager - Admin</title></Helmet>
      <AdminLayout title="Blog Manager">
        <div className="mb-6">
          <button onClick={() => { setShowForm(!showForm); setEditingBlog(null); setFormData({ title: '', slug: '', summary: '', content: '', author: '', tags: '', category: '', image: '', published: false }); }} className="btn-primary">
            <Plus className="inline w-5 h-5 mr-2" /> {showForm ? 'Cancel' : 'Create New Blog'}
          </button>
        </div>

        {showForm && (
          <div className="card mb-6">
            <h2 className="text-xl font-bold mb-4">{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Title *" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
              <input type="text" placeholder="Slug *" required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
              <textarea placeholder="Summary *" required value={formData.summary} onChange={(e) => setFormData({...formData, summary: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" rows="2" />
              <textarea placeholder="Content (HTML) *" required value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" rows="6" />
              <input type="text" placeholder="Author *" required value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
              <input type="text" placeholder="Category *" required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
              <input type="text" placeholder="Tags (comma-separated) *" required value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
              <input type="url" placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={formData.published} onChange={(e) => setFormData({...formData, published: e.target.checked})} />
                <span>Published</span>
              </label>
              <button type="submit" className="btn-primary">Save Blog</button>
            </form>
          </div>
        )}

        <div className="card">
          <h2 className="text-xl font-bold mb-4">All Blogs ({blogs.length})</h2>
          {loading ? (
            <div className="spinner" />
          ) : (
            <div className="space-y-3">
              {blogs.map((blog) => (
                <div key={blog.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-bold">{blog.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{blog.category} • {blog.author}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {blog.published ? <Eye className="w-4 h-4 text-green-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                      <span className="text-xs">{blog.published ? 'Published' : 'Draft'}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(blog)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"><Edit2 className="w-5 h-5" /></button>
                    <button onClick={() => handleDelete(blog.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default BlogManager;
