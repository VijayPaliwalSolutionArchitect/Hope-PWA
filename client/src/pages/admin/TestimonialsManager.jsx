import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { testimonials } from '../../services/api';

const TestimonialsManager = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', message: '', rating: 5, visible: true });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await testimonials.getAllAdmin();
    setItems(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await testimonials.create(formData);
    setFormData({ name: '', message: '', rating: 5, visible: true });
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete?')) {
      await testimonials.delete(id);
      fetchItems();
    }
  };

  return (
    <AdminLayout title="Testimonials Manager">
      <div className="card mb-6">
        <h2 className="text-xl font-bold mb-4">Add Testimonial</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
          <textarea placeholder="Message" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" rows="3" />
          <select value={formData.rating} onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})} className="px-4 py-2 border rounded-lg dark:bg-gray-700">
            {[1,2,3,4,5].map(r => <option key={r} value={r}>{r} Star{r>1?'s':''}</option>)}
          </select>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={formData.visible} onChange={(e) => setFormData({...formData, visible: e.target.checked})} />
            <span>Visible</span>
          </label>
          <button type="submit" className="btn-primary">Add</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4">All Testimonials</h2>
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm">{item.message}</p>
                <p className="text-xs text-gray-500">{item.rating} stars • {item.visible ? 'Visible' : 'Hidden'}</p>
              </div>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:bg-red-100 p-2 rounded">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default TestimonialsManager;
