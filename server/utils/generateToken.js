import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN}
  );

  return `Bearer ${token}`;
};

export default generateToken;
