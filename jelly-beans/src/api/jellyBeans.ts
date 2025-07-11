import axios from 'axios';
import { ColorsResponse, Combination, JellyBeanResponse } from '../types/jellyBean';

const API_BASE = process.env.REACT_APP_API_URL || 'https://tikal-home-assignment.vercel.app';

export const fetchJellyBeans = async (limit: number, offset: number): Promise<JellyBeanResponse> => {
  const response = await axios.get<JellyBeanResponse>(`${API_BASE}/api/beans`, {
    params: { limit, offset }
  });
  return response.data;
};
  
export const fetchColors = async (): Promise<ColorsResponse> => {
    const response = await axios.get<ColorsResponse>(`${API_BASE}/api/colors`);
    return response.data;
  };
  
export const fetchCombinations = async (): Promise<Combination> => {
    const response = await axios.get<Combination>(`${API_BASE}/api/combinations`);
    return response.data;
};