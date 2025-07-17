import axios from 'axios';
import { ApiResponse, ApiParams } from '../types';

const API_BASE_URL = '/api/ideas';

export const fetchIdeas = async (params: ApiParams): Promise<ApiResponse> => {
  const response = await axios.get(API_BASE_URL, {
    params: {
      'page[number]': params.page,
      'page[size]': params.size,
      'append[]': ['small_image', 'medium_image'],
      'sort': params.sort,
    },
  });
  
  return response.data;
};