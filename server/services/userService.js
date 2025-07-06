import User from '../models/Users.js';
import generateToken from '../utils/generateToken.js';

export const userRegister = async (username, email, password) => {
    
    const userExists = await User.findOne({ email });

    if (userExists) return { error: 'User already exists' };

    const user = await User.create({ username, email, password});

    return {
        name: user.username,
        email: user.email,
        role: user.role
    };

};


export const userLogin = async (email, password) => {
   
   
    const user = await User.findOne({ email });

    if (!user) return { error: 'User not found' };

    if (!(await user.matchPassword(password)))
        return { error: 'Invalid credentials' };

    return {
        'message': 'Login successful',
        user: {
            name: user.username,
            email: user.email,
            role: user.role,
            id: user._id,
            token: generateToken(user._id)
        }
    }
}

export const getAllUserService = async () => {
    return await User.find({});
};

export const updateUserService = async (id, userData) => {
    const user = await User.findById(id);
    if (!user) return { error: 'User not found' };
    user.username = userData.username || user.username;
    user.email = userData.email || user.email;
    if (userData.password) {
        user.password = userData.password;
    }
    await user.save();
    return {
        name: user.username,
        email: user.email,
        role: user.role
    };
};

export const deleteUserService = async (id) => {
    const user = await User.findById(id);
    if (!user) return { error: 'User not found' };
    await user.remove();
    return { message: 'User deleted successfully' };
};