import axios from 'axios';
import { getHeaders } from './headers';

const API_URL = `${import.meta.env.VITE_BASEURL}/tasks`;

export const createTasks = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}`, taskData, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export const updateTask = async (id, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, taskData, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating task with ID ${id}:`, error);
    throw error;
  }
}

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting task with ID ${id}:`, error);
    throw error;
  }
}

export const getTasksByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching Tasks for user with ID ${userId}:`, error);
    throw error;
  }
}

