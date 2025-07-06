import mongoose from 'mongoose';
import Project from '../models/Projects.js';
import Task from '../models/Tasks.js';


export const getAllProjectsService = async () => {

      const data = await Project.find()
      .populate('assignedUsers', 'username email')
      .sort({ createdAt: -1 });

    return ({ projects: data, message: "All projects retrieved successfully" });
}
export const createProjectService = async (projectData) => {
    if (!projectData || Object.keys(projectData).length === 0) {
        throw new Error('Project data is required');
    }

    try {
        const project = new Project(projectData);
        const savedProject = await project.save();
       

        return {
        message: 'Project created successfully',
        project: savedProject,
        };
    } catch (error) {
        throw new Error('Failed to create project: ' + error.message);
    }
}

export const projectWithTaskService = async (projectId) => {

    if (!projectId) {
        throw new Error('Project ID is required');
    }

    const ProjectIdWithTask = await Task.find({ project: projectId }) 
            .populate('assignedUsers', 'username email')            
            .sort({ createdAt: -1 });

    console.log(ProjectIdWithTask);
    
    if (!ProjectIdWithTask) {
        throw new Error(`All task of Project not found`);
    }
     return {
        message: ' All task of project get successfully',
        tasks: ProjectIdWithTask,
    };

};


export const getProjectByIdService = async (projectId) => {
    if (!projectId) {
        throw new Error('Project ID is required');
    }

    const project = await Project.findById(projectId)
        .populate('assignedUsers', 'name email')
        .sort({ createdAt: -1 });   
    
    if (!project) {
        throw new Error(`Project not found`);
    }
     return {
        message: 'Project get successfully',
        project: project,
    };
}
export const updateProjectService = async (projectId, projectData) => {
    if (!projectId || !projectData) {
        throw new Error('Project ID and data are required');
    }

    const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        projectData,
        { new: true, runValidators: true }
    );
    if (!updatedProject) {
        throw new Error(`Project with ID ${projectId} not found`);
    }
    return {
        message: `Project with ID ${projectId} updated successfully`,
        project: updatedProject,
    };
}
export const deleteProjectService = async (projectId) => {
    if (!projectId) {
        throw new Error('Project ID is required');
    }

    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (!deletedProject) {
        throw new Error(`Project with ID ${projectId} not found`);
    }
    return {
        message: `Project with ID ${projectId} deleted successfully`,
        project: deletedProject,
    };
}



export const getAllProjectAssignToUserService = async (userId) => {
    const projects = await Project.find({ assignedUsers: userId }).populate('assignedUsers', 'username');
    return ({ projects: projects, message: "All projects assign to user retrieved successfully" });
}