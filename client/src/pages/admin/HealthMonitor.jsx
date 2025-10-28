import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { health } from '../../services/api';

const HealthMonitor = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchHealth = async () => {
    try {
      const res = await health.check();
      setHealthData(res.data);
    } catch (error) {
      console.error('Failed to fetch health data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <AdminLayout title="Health Monitor"><div className="spinner" /></AdminLayout>;

  const getStatusColor = (status) => {
    if (status === 'ok') return 'bg-green-500';
    if (status === 'degraded' || status === 'not_configured') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusText = (status) => {
    if (status === 'ok') return 'Healthy';
    if (status === 'degraded') return 'Degraded';
    if (status === 'not_configured') return 'Not Configured';
    return 'Error';
  };

  return (
    <AdminLayout title="System Health Monitor">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-4 h-4 rounded-full ${getStatusColor(healthData.status)}`} />
            <h3 className="text-xl font-bold">Overall Status</h3>
          </div>
          <p className="text-3xl font-bold">{getStatusText(healthData.status)}</p>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-4 h-4 rounded-full ${getStatusColor(healthData.services?.database?.status)}`} />
            <h3 className="text-xl font-bold">Database</h3>
          </div>
          <p className="text-2xl font-bold">{getStatusText(healthData.services?.database?.status)}</p>
          {healthData.services?.database?.error && (
            <p className="text-sm text-red-600 mt-2">{healthData.services.database.error}</p>
          )}
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-4 h-4 rounded-full ${getStatusColor(healthData.services?.email?.status)}`} />
            <h3 className="text-xl font-bold">Email Service</h3>
          </div>
          <p className="text-2xl font-bold">{getStatusText(healthData.services?.email?.status)}</p>
          {healthData.services?.email?.error && (
            <p className="text-sm text-red-600 mt-2">{healthData.services.email.error}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold mb-4">System Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Uptime:</span>
              <span className="font-semibold">{Math.floor((healthData.uptime || 0) / 60)} minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Node Version:</span>
              <span className="font-semibold">{healthData.system?.nodeVersion}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Memory Used:</span>
              <span className="font-semibold">{Math.round((healthData.system?.memory?.heapUsed || 0) / 1024 / 1024)} MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Memory Total:</span>
              <span className="font-semibold">{Math.round((healthData.system?.memory?.heapTotal || 0) / 1024 / 1024)} MB</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-4">Last Checked</h3>
          <p className="text-lg">{new Date(healthData.timestamp).toLocaleString()}</p>
          <button onClick={fetchHealth} className="mt-4 btn-primary">Refresh Now</button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HealthMonitor;
