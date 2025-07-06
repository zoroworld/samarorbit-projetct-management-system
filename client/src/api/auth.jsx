import axios from 'axios';
import { getHeaders } from './headers';

const API_URL = `${import.meta.env.VITE_BASEURL}/users`;

export const registerUser = async (userData) => {
 
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (err) {
    if (err.response.data.message) {
      throw new Error(err.response.data.message);
    }else if (err.response.data.error) {
      throw new Error(err.response.data.error);
    } else {
      log.error(err)
      throw new Error('Registration failed');
    }
  }
}

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      headers: getHeaders(),
    });
    
    return response.data;
  } catch (err) {
    if (err.response.data.message) {
      throw new Error(err.response.data.message);
    }else if (err.response.data.error) {
      throw new Error(err.response.data.error);
    } else {
      log.error(err)
      throw new Error('Registration failed');
    }
  }
}