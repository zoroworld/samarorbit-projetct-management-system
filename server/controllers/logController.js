import ActivityLog from '../models/ActivityLog.js';

// get active logs of a user and project
export const getActiveLogsController = async (req, res) => {
    try {
        const { userId, projectId } = req.params;
        const logs = await ActivityLog.find({ user: userId, project: projectId, status: 'active' })
            .populate('users', 'name email')
            .populate('projects', 'name status');

        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching active logs', error });
    }
}