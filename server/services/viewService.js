import Project from "../models/Projects.js";
import Task from "../models/Tasks.js";
import User from "../models/Users.js";

export const getAllStatsService = async () => {
    const [projectStats, taskStats, userCount] = await Promise.all([
        Project.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
        Task.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
        User.countDocuments()
    ]);

    const formatStats = (data) => {
    const normalized = data.reduce((acc, item) => {
        const key = item._id.toLowerCase().replace(/\s/g, '');
        acc[key] = item.count;
        return acc;
    }, {});

    return {
        complete: normalized['completed'] || 0,
        inProgress: normalized['inprogress'] || 0,
        notStarted: normalized['notstarted'] || 0,
    };
    };

    return {
    projects: formatStats(projectStats),
    tasks: formatStats(taskStats),
    users: userCount
    };

};
