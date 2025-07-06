import {getAllProjectsService, 
    getAllProjectAssignToUserService, 
    projectWithTaskService, 
    createProjectService, 
    getProjectByIdService, 
    updateProjectService, 
    deleteProjectService} from '../services/projectService.js';


export const getAllProjects = async (req, res) => {
    try {
        const userId = req.params.userId;
        const data = await getAllProjectsService(userId);

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No projects found" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error retrieving projects:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const createProject = async (req, res) => {
    try {
        const projectData = req.body;
        const newProject = await createProjectService(projectData);
        if (!newProject) {
            return res.status(500).json({ message: "Failed to create project" });
        }
        res.status(201).json({project: newProject});
    } catch (error) {
        console.error("Error creating project:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const projectWithTaskController = async (req, res) => {
    try {
        const projectId = req.params.id;
        const newProject = await projectWithTaskService(projectId);
        if (!newProject) {
            return res.status(500).json({ message: "Project tasks not found" });
        }
        res.status(201).json({project: newProject});
    } catch (error) {
        console.error("Error creating project:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;
        // Logic to get a project by ID
        const project = await getProjectByIdService(projectId);
        if (!project) {
            return res.status(404).json({ message: `Project with ID ${projectId} not found` });
        }
        res.status(200).json({ message: `Project with ID ${projectId} retrieved successfully`, data: project });
    } catch (error) {
        console.error("Error retrieving project:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const updateProject = async (req, res) => {
    try {

        const projectData = req.body;
        const projectId = req.params.id;

        // Logic to update a project
        const updatedProject = await updateProjectService(projectId, projectData);
        if (!updatedProject) {
            return res.status(404).json({ message: `Project with ID ${projectId} not found` });
        }
        // Assuming updateProjectService returns the updated project
        if (!updatedProject) {
            return res.status(500).json({ message: "Failed to update project" });
        }
    
        res.status(200).json({ message: `Project with ID ${projectId} updated successfully` });
    } catch (error) {
        console.error("Error updating project:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;

        // Logic to delete a project
        const deletedProject = await deleteProjectService(projectId);
        if (!deletedProject) {
            return res.status(404).json({ message: `Project with ID ${projectId} not found` });
        }
    
        res.status(200).json({ message: `Project with ID ${projectId} deleted successfully` });
    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const getAllProjectAssignToUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await getAllProjectAssignToUserService(userId);

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No projects found" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error retrieving projects:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



