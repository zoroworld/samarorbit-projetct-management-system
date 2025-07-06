import axios from 'axios';
import { getHeaders } from './headers';

const API_URL = `${import.meta.env.VITE_BASEURL}/users`;

export const getAllMembers = async () => {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
}

export const getMemberById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error fetching member with ID ${id}:`, error);
    throw error;
  }
}

export const createMember = async (memberData) => {
  try {
    const response = await axios.post(`${API_URL}`, memberData, getHeaders());
    return response.data;
  } catch (error) {
    console.error('Error creating member:', error);
    throw error;
  }
}

export const updateMember = async (id, memberData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, memberData, getHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error updating member with ID ${id}:`, error);
    throw error;
  }
}

export const deleteMember = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/members/${id}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error deleting member with ID ${id}:`, error);
    throw error;
  }
}
export const assignMemberToProject = async (projectId, memberId) => {
  try {
    const response = await axios.post(`${API_URL}/projects/${projectId}/members/${memberId}`, {}, getHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error assigning member with ID ${memberId} to project with ID ${projectId}:`, error);
    throw error;
  }
}

export const removeMemberFromProject = async (projectId, memberId) => {
  try {
    const response = await axios.delete(`${API_URL}/projects/${projectId}/members/${memberId}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error removing member with ID ${memberId} from project with ID ${projectId}:`, error);
    throw error;
  }
}

export const assignMemberToTask = async (taskId, memberId) => {
  try {
    const response = await axios.post(`${API_URL}/tasks/${taskId}/members/${memberId}`, {}, getHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error assigning member with ID ${memberId} to task with ID ${taskId}:`, error);
    throw error;
  }
}

export const removeMemberFromTask = async (taskId, memberId) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}/members/${memberId}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error removing member with ID ${memberId} from task with ID ${taskId}:`, error);
    throw error;
  }
}

export const getMembersByProject = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error fetching members for project with ID ${projectId}:`, error);
    throw error;
  }
}

export const getMembersByTask = async (taskId) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${taskId}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error fetching members for task with ID ${taskId}:`, error);
    throw error;
  }
}

export const getMembersByProjectAndTask = async (projectId, taskId) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}/tasks/${taskId}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error fetching members for project with ID ${projectId} and task with ID ${taskId}:`, error);
    throw error;
  }
}

export const getMembersByStatus = async (status) => {
  try {
    const response = await axios.get(`${API_URL}/status/${status}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error fetching members with status ${status}:`, error);
    throw error;
  }
}

export const getMembersByRole = async (role) => {
  try {
    const response = await axios.get(`${API_URL}/role/${role}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error fetching members with role ${role}:`, error);
    throw error;
  }
}

export const getMembersBySearch = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_URL}/search/${searchTerm}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error fetching members with search term ${searchTerm}:`, error);
    throw error;
  }
}

export const getMembersByProjectAndRole = async (projectId, role) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}/role/${role}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error fetching members for project with ID ${projectId} and role ${role}:`, error);
    throw error;
  }
}