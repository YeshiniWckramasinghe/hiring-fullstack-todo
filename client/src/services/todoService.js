import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      (error.code === 'ECONNABORTED' ? 'Request timed out. Please try again.' : 'Network error. Is the server running?');
    return Promise.reject(new Error(message));
  }
);

export const todoService = {
  getAll: () => api.get('/todos'),
  create: (data) => api.post('/todos', data),
  update: (id, data) => api.put(`/todos/${id}`, data),
  toggleDone: (id) => api.patch(`/todos/${id}/done`),
  delete: (id) => api.delete(`/todos/${id}`),
};
