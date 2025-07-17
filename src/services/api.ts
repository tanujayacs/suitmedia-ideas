import axios from 'axios';
import { ApiResponse, ApiParams } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchIdeas = async (params: ApiParams): Promise<ApiResponse> => {
  try {
    const response = await api.get('/ideas', {
      params: {
        'page[number]': params.page || 1,
        'page[size]': params.size || 10,
        'append[]': ['small_image', 'medium_image'],
        sort: params.sort || '-published_at',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching ideas:', error);
    throw error;
  }
};