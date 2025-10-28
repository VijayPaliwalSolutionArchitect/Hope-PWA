import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { settings as settingsAPI } from '../../services/api';

const SettingsManager = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await settingsAPI.getAll();
      setSettings(res.data);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await settingsAPI.update(settings);
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Failed to save settings');
    }
  };

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  if (loading) return <AdminLayout title="Settings"><div className="spinner" /></AdminLayout>;

  return (
    <AdminLayout title="Site Settings">
      <form onSubmit={handleSave} className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Site Title</label>
              <input type="text" value={settings.site_title || ''} onChange={(e) => handleChange('site_title', e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Site Description</label>
              <textarea value={settings.site_description || ''} onChange={(e) => handleChange('site_description', e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" rows="3" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Hero Title</label>
              <input type="text" value={settings.hero_title || ''} onChange={(e) => handleChange('hero_title', e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Hero Subtitle</label>
              <input type="text" value={settings.hero_subtitle || ''} onChange={(e) => handleChange('hero_subtitle', e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Clinic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Clinic Name</label>
              <input type="text" value={settings.clinic_name || ''} onChange={(e) => handleChange('clinic_name', e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input type="email" value={settings.clinic_email || ''} onChange={(e) => handleChange('clinic_email', e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <input type="tel" value={settings.clinic_phone || ''} onChange={(e) => handleChange('clinic_phone', e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">WhatsApp Number</label>
              <input type="tel" value={settings.clinic_whatsapp || ''} onChange={(e) => handleChange('clinic_whatsapp', e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Address</label>
              <input type="text" value={settings.clinic_address || ''} onChange={(e) => handleChange('clinic_address', e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">SMTP Email Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">SMTP Host</label>
              <input type="text" value={settings.smtp_host || ''} onChange={(e) => handleChange('smtp_host', e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">SMTP Port</label>
              <input type="number" value={settings.smtp_port || ''} onChange={(e) => handleChange('smtp_port', e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">SMTP User (Email)</label>
              <input type="email" value={settings.smtp_user || ''} onChange={(e) => handleChange('smtp_user', e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">SMTP Password</label>
              <input type="password" value={settings.smtp_pass || ''} onChange={(e) => handleChange('smtp_pass', e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" placeholder="Leave blank to keep current" />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" checked={settings.smtp_secure === 'true'} onChange={(e) => handleChange('smtp_secure', e.target.checked ? 'true' : 'false')} />
              <label className="text-sm">Use Secure Connection (SSL/TLS)</label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary">Save All Settings</button>
      </form>
    </AdminLayout>
  );
};

export default SettingsManager;
