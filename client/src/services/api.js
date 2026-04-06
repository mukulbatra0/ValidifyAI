import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

export const ideasAPI = {
  create: (data) => api.post('/ideas', data),
  getAll: () => api.get('/ideas'),
  getById: (id) => api.get(`/ideas/${id}`),
  delete: (id) => api.delete(`/ideas/${id}`),
};

export default api;
