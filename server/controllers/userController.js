import { userRegister, userLogin, getAllUserService, updateUserService, deleteUserService} from '../services/userService.js';


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
                 return res.status(400).json({ message: 'All fields are required' });
        }
        const data = await userRegister(name, email, password);

        if (data.error) {
            return res.status(400).json({ message: data.error });
        }
        res.status(201).json({
            message: 'User registered successfully', 
            user: {
                name: data.name,
                email: data.email,
                role: data.role
            }  
        });
    } catch (error) {
        console.error('Error in register:', error);
        return res.status(500).json({ message: 'Internal Server Error' , error: error.message });
    }
};

export const login = async (req, res) => {

  try {
    // Validate request body

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const data = await userLogin(email, password);
   
    if (data.error) {
      return res.status(400).json({ message: data.error });
    }

    res.status(200).json({
      message: 'Login successful',
      user: data.user
    });
    
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
  
};

export const getDashboard = (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}` });
};

export const getAllUserController = async (req, res) => {
    try {
        const users = await getAllUserService();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const updateUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;

        const updatedUser = await updateUserService(userId, userData);
        
        if (updatedUser.error) {
            return res.status(404).json({ message: updatedUser.error });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const deleteUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await deleteUserService(userId);
        
        if (result.error) {
            return res.status(404).json({ message: result.error });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


