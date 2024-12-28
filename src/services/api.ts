import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const schemes = {
  getAll: () => api.get('/schemes'),
  getById: (id: string) => api.get(`/schemes/${id}`),
  checkEligibility: (schemeId: string, userData: any) => 
    api.post(`/schemes/${schemeId}/check-eligibility`, userData),
};

export const documents = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('document', file);
    return api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  verify: (documentId: string) => api.post(`/documents/${documentId}/verify`),
};

export default api; 