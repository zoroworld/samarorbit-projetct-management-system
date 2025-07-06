import axios from 'axios';
import { getHeaders } from './headers';

const API_URL = `${import.meta.env.VITE_BASEURL}/projects`;

export const getAllProjects = async () => { 
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};


export const getProjectById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    throw error;
  }
}

export const getAllProjectTasks = async (id) => {
  
  
  try {
    const response = await axios.get(`${API_URL}/${id}/tasks`, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    throw error;
  }
}

export const createProject = async (projectData) => {
  try {
    const response = await axios.post(`${API_URL}`, projectData, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export const updateProject = async (id, projectData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, projectData, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating project with ID ${id}:`, error);
    throw error;
  }
}

export const deleteProject = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error);
    throw error;
  }
}

export const assignProjectToMember = async (projectId, memberId) => {
  try {
    const response = await axios.post(`${API_URL}/${projectId}/members/${memberId}`, {}, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error(`Error assigning member with ID ${memberId} to project with ID ${projectId}:`, error);
    throw error;
  }
}


export const getProjectsByMember = async (memberId) => {
  try {
    const response = await axios.get(`${API_URL}/members/${memberId}`, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching projects for member with ID ${memberId}:`, error);
    throw error;
  }
}


export const getProjectsByStatus = async (status) => {
  try {
    const response = await axios.get(`${API_URL}/status/${status}`, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching projects with status ${status}:`, error);
    throw error;
  }
}

export const getProjectsByDateRange = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}/date-range`, {
      params: { startDate, endDate },
      ...getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching projects between ${startDate} and ${endDate}:`, error);
    throw error;
  }
}


export const getProjectsByPriority = async (priority) => {
  try {
    const response = await axios.get(`${API_URL}/priority/${priority}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error fetching projects with priority ${priority}:`, error);
    throw error;
  }
}

export const getProjectsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/category/${category}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error fetching projects in category ${category}:`, error);
    throw error;
  }
}

export const getProjectsByMemberAndStatus = async (memberId, status) => {
  try {
    const response = await axios.get(`${API_URL}/members/${memberId}/status/${status}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error fetching projects for member with ID ${memberId} and status ${status}:`, error);
    throw error;
  }
}

export const getProjectsByMemberAndDateRange = async (memberId, startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}/members/${memberId}/date-range`, {
      params: { startDate, endDate },
      ...getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching projects for member with ID ${memberId} between ${startDate} and ${endDate}:`, error);
    throw error;
  }
}
export const getProjectsByMemberAndPriority = async (memberId, priority) => {
  try {
    const response = await axios.get(`${API_URL}/members/${memberId}/priority/${priority}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error fetching projects for member with ID ${memberId} with priority ${priority}:`, error);
    throw error;
  }
}

export const getProjectsByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching projects for user with ID ${userId}:`, error);
    throw error;
  }
}
