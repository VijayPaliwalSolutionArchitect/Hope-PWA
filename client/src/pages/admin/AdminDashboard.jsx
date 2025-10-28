import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, MessageSquare, Mail, AlertCircle, TrendingUp } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { health, logs } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, logsRes] = await Promise.all([
          health.getStats(),
          logs.getAll({ limit: 10 }),
        ]);
        setStats(statsRes.data);
        setRecentLogs(logsRes.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { icon: FileText, label: 'Total Blogs', value: stats.database?.blogs || 0, color: 'indigo' },
    { icon: MessageSquare, label: 'Testimonials', value: stats.database?.testimonials || 0, color: 'purple' },
    { icon: Mail, label: 'Inquiries', value: stats.database?.inquiries || 0, color: 'blue' },
    { icon: AlertCircle, label: 'Exceptions', value: stats.database?.exceptions || 0, color: 'red' },
  ];

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="spinner"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Hope Clinic</title>
      </Helmet>

      <AdminLayout title="Dashboard">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900 rounded-lg`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* System Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">System Information</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Uptime:</span>
                <span className="font-semibold">{Math.floor((stats.system?.uptime || 0) / 60)} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Node Version:</span>
                <span className="font-semibold">{stats.system?.nodeVersion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Memory Usage:</span>
                <span className="font-semibold">{Math.round((stats.system?.memory?.heapUsed || 0) / 1024 / 1024)} MB</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <a href="/admin/blogs" className="block px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
                Create New Blog Post
              </a>
              <a href="/admin/testimonials" className="block px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
                Add Testimonial
              </a>
              <a href="/admin/inquiries" className="block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                View Inquiries
              </a>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentLogs.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No recent activity</p>
            ) : (
              recentLogs.map((log) => (
                <div key={log.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{log.eventType.replace(/_/g, ' ').toUpperCase()}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{log.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;
