import axios from 'axios';
import { getHeaders } from './headers';

const API_URL = `${import.meta.env.VITE_BASEURL}/view`;

export const getAllStats = async () => { 
  try {
    const response = await axios.get(`${API_URL}/stats`, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Stats:', error);
    throw error;
  }
};