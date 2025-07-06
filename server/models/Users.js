import moongose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = moongose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'member'],
    default: 'member',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
  }],
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project',
  }],
});

//  Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); 
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//  Method to check password
UserSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};


const User = moongose.model('User', UserSchema);

export default User;