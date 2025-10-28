import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { settings } from '../../services/api';

const EmailTemplatesManager = () => {
  const [templates, setTemplates] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const res = await settings.getEmailTemplates();
    setTemplates(res.data);
  };

  const handleSave = async (template) => {
    await settings.updateEmailTemplate(template.id, template);
    setEditing(null);
    fetchTemplates();
    alert('Template saved!');
  };

  return (
    <AdminLayout title="Email Templates">
      <div className="space-y-6">
        {templates.map(template => (
          <div key={template.id} className="card">
            <h3 className="text-xl font-bold mb-4">{template.name}</h3>
            {editing?.id === template.id ? (
              <div className="space-y-4">
                <input type="text" value={editing.subject} onChange={(e) => setEditing({...editing, subject: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" placeholder="Subject" />
                <textarea value={editing.htmlBody} onChange={(e) => setEditing({...editing, htmlBody: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" rows="10" />
                <div className="flex space-x-2">
                  <button onClick={() => handleSave(editing)} className="btn-primary">Save</button>
                  <button onClick={() => setEditing(null)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Subject: {template.subject}</p>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm" dangerouslySetInnerHTML={{ __html: template.htmlBody }} />
                <button onClick={() => setEditing(template)} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default EmailTemplatesManager;
