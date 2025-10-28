import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { inquiries } from '../../services/api';

const InquiriesManager = () => {
  const [items, setItems] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await inquiries.getAll();
    setItems(res.data);
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!selectedInquiry) return;
    try {
      await inquiries.reply(selectedInquiry.id, replyMessage);
      alert('Reply sent successfully!');
      setSelectedInquiry(null);
      setReplyMessage('');
      fetchItems();
    } catch (error) {
      alert('Failed to send reply: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this inquiry?')) {
      await inquiries.delete(id);
      fetchItems();
    }
  };

  return (
    <AdminLayout title="Inquiries Manager">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">All Inquiries</h2>
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold">{item.name}</h3>
                  {item.replied && <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Replied</span>}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.email} {item.phone && `• ${item.phone}`}</p>
                <p className="text-sm mt-2">{item.message}</p>
                <p className="text-xs text-gray-500 mt-2">{new Date(item.createdAt).toLocaleString()}</p>
                <div className="flex space-x-2 mt-3">
                  <button onClick={() => setSelectedInquiry(item)} className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Reply</button>
                  <button onClick={() => handleDelete(item.id)} className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedInquiry && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Reply to {selectedInquiry.name}</h2>
            <form onSubmit={handleReply} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Original Message:</label>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">{selectedInquiry.message}</div>
              </div>
              <textarea placeholder="Your reply..." required value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" rows="6" />
              <div className="flex space-x-2">
                <button type="submit" className="btn-primary">Send Reply</button>
                <button type="button" onClick={() => setSelectedInquiry(null)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default InquiriesManager;
