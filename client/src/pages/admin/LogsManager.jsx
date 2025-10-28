import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { logs } from '../../services/api';

const LogsManager = () => {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [logsRes, statsRes] = await Promise.all([
      logs.getAll({ limit: 100 }),
      logs.getStats(),
    ]);
    setItems(logsRes.data);
    setStats(statsRes.data);
  };

  return (
    <AdminLayout title="Activity Logs">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total Logs</p>
          <p className="text-2xl font-bold">{stats.total || 0}</p>
        </div>
        {stats.byEventType && Object.entries(stats.byEventType).slice(0, 3).map(([type, count]) => (
          <div key={type} className="card">
            <p className="text-gray-600 dark:text-gray-400 text-sm">{type.replace(/_/g, ' ')}</p>
            <p className="text-2xl font-bold">{count}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-sm">{item.eventType.replace(/_/g, ' ').toUpperCase()}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.message}</p>
                </div>
                <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default LogsManager;
