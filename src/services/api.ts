import axios from 'axios';
import { Scheme, Document } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const schemes = {
  getAll: async () => {
    const response = await api.get<Scheme[]>('/schemes');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get<Scheme>(`/schemes/${id}`);
    return response.data;
  },
  checkEligibility: async (schemeId: string, userData: any) => {
    const response = await api.post(`/schemes/${schemeId}/check-eligibility`, userData);
    return response.data;
  },
};

export const documents = {
  getAll: async () => {
    const response = await api.get<Document[]>('/documents');
    return response.data;
  },
  upload: async (formData: FormData) => {
    const response = await api.post<Document>('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  verify: async (documentId: string) => {
    const response = await api.post<Document>(`/documents/${documentId}/verify`);
    return response.data;
  },
};

export default api; 