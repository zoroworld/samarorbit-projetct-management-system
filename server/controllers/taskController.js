import {getAllTaskService, getAllTaskAssignToUserService ,createTaskService, updateTaskService, deleteTaskService} from '../services/taskService.js';


export const getAllTaskController = async (req, res) => {
    try {
        const tasks = await getAllTaskService();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createTaskController = async (req, res) => {
    try {
        const taskData = req.body;
        const newTask = await createTaskService(taskData);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateTaskController = async (req, res) => {
    try {
        const { id } = req.params;
        const taskData = req.body;
        const updatedTask = await updateTaskService(id, taskData);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteTaskController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteTaskService(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// getAllTaskAssignToUserController

export const getAllTaskAssignToUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await getAllTaskAssignToUserService(userId);

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No Tasks found" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error retrieving Tasks:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
