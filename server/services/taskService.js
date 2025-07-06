import Task  from '../models/Tasks.js';

export const getAllTaskService = async () => {
    try {
        // Assuming you have a Task model to interact with your database
        const tasks = await Task.find();
        return tasks;
    } catch (error) {
        throw new Error('Error fetching tasks: ' + error.message);
    }
}

export const createTaskService = async (taskData) => {
    try {
        const newTask = new Task(taskData);
        await newTask.save();
        return newTask;
    } catch (error) {
        throw new Error('Error creating task: ' + error.message);
    }
}

export const updateTaskService = async (id, taskData) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, taskData, { new: true });
        if (!updatedTask) {
            throw new Error('Task not found');
        }
        return updatedTask;
    } catch (error) {   
        throw new Error('Error updating task: ' + error.message);
    }
}

export const deleteTaskService = async (id) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            throw new Error('Task not found');
        }
        return { message: 'Task deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting task: ' + error.message);
    }
}   



export const getAllTaskAssignToUserService = async (userId) => {
    const tasks = await Task.find({ assignedUsers: userId }).populate('project', 'title');
    return ({ tasks: tasks, message: "All Tasks assign to user retrieved successfully" });
}