import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Log frontend errors to backend
    if (error.response?.status >= 500) {
      try {
        await api.post('/exceptions', {
          level: 'error',
          source: 'frontend',
          message: error.message,
          stack: error.stack,
          metadata: JSON.stringify({
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
          }),
        });
      } catch (logError) {
        console.error('Failed to log error:', logError);
      }
    }

    // Handle token expiration
    if (error.response?.status === 401 && error.response?.data?.error === 'Token expired') {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await api.post('/auth/refresh', { refreshToken });
          localStorage.setItem('token', response.data.token);
          error.config.headers.Authorization = `Bearer ${response.data.token}`;
          return api.request(error.config);
        } catch (refreshError) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/admin/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// API methods
export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  verify: () => api.get('/auth/verify'),
  refresh: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
};

export const blogs = {
  getAll: (params) => api.get('/blogs', { params }),
  getBySlug: (slug) => api.get(`/blogs/${slug}`),
  create: (data) => api.post('/blogs', data),
  update: (id, data) => api.put(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`),
  getCategories: () => api.get('/blogs/meta/categories'),
  getTags: () => api.get('/blogs/meta/tags'),
};

export const testimonials = {
  getAll: () => api.get('/testimonials'),
  getAllAdmin: () => api.get('/testimonials/admin/all'),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

export const inquiries = {
  submit: (data) => api.post('/inquiries', data),
  getAll: () => api.get('/inquiries'),
  reply: (id, message) => api.post(`/inquiries/${id}/reply`, { message }),
  delete: (id) => api.delete(`/inquiries/${id}`),
};

export const settings = {
  getPublic: () => api.get('/settings'),
  getAll: () => api.get('/settings/admin/all'),
  update: (data) => api.put('/settings', data),
  getEmailTemplates: () => api.get('/settings/email-templates'),
  updateEmailTemplate: (id, data) => api.put(`/settings/email-templates/${id}`, data),
};

export const exceptions = {
  log: (data) => api.post('/exceptions', data),
  getAll: (params) => api.get('/exceptions', { params }),
  resolve: (id) => api.put(`/exceptions/${id}/resolve`),
  delete: (id) => api.delete(`/exceptions/${id}`),
};

export const logs = {
  getAll: (params) => api.get('/logs', { params }),
  getStats: () => api.get('/logs/stats'),
  cleanup: (days) => api.delete('/logs/cleanup', { params: { days } }),
};

export const health = {
  check: () => api.get('/health'),
  getStats: () => api.get('/health/stats'),
};
