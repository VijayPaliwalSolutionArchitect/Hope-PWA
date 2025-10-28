import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { exceptions } from '../../services/api';

const ExceptionsManager = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState({ level: '', source: '', resolved: '' });

  useEffect(() => {
    fetchItems();
  }, [filter]);

  const fetchItems = async () => {
    const res = await exceptions.getAll(filter);
    setItems(res.data);
  };

  const handleResolve = async (id) => {
    await exceptions.resolve(id);
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete?')) {
      await exceptions.delete(id);
      fetchItems();
    }
  };

  return (
    <AdminLayout title="Exception Logs">
      <div className="mb-6 card">
        <div className="flex flex-wrap gap-4">
          <select value={filter.level} onChange={(e) => setFilter({...filter, level: e.target.value})} className="px-4 py-2 border rounded-lg dark:bg-gray-700">
            <option value="">All Levels</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="critical">Critical</option>
          </select>
          <select value={filter.source} onChange={(e) => setFilter({...filter, source: e.target.value})} className="px-4 py-2 border rounded-lg dark:bg-gray-700">
            <option value="">All Sources</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </select>
          <select value={filter.resolved} onChange={(e) => setFilter({...filter, resolved: e.target.value})} className="px-4 py-2 border rounded-lg dark:bg-gray-700">
            <option value="">All Status</option>
            <option value="false">Unresolved</option>
            <option value="true">Resolved</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="card">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 text-xs rounded ${item.level === 'critical' ? 'bg-red-600 text-white' : item.level === 'error' ? 'bg-red-100 text-red-700' : item.level === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{item.level}</span>
                  <span className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">{item.source}</span>
                  {item.resolved && <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Resolved</span>}
                </div>
                <p className="font-semibold">{item.message}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{new Date(item.createdAt).toLocaleString()}</p>
                {item.stack && <pre className="text-xs mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded overflow-x-auto">{item.stack}</pre>}
              </div>
              <div className="flex flex-col space-y-2">
                {!item.resolved && <button onClick={() => handleResolve(item.id)} className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Resolve</button>}
                <button onClick={() => handleDelete(item.id)} className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ExceptionsManager;
