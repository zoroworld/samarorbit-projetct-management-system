import moongose from 'mongoose';
const Schema = moongose.Schema;
const ProjectSchema = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    action: {
        type: String,
        required: true,
        enum: ['created', 'updated', 'deleted'],
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    details: {
        type: String,
        required: true,
    },
}); 

const ActivityLog = moongose.model('ActivityLog', ProjectSchema);

export default ActivityLog;