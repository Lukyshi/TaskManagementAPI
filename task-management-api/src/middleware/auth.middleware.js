import { verifyToken } from '../utils/jwt.js';


const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; //splits ["Bearer", "token"]

  if(!token) {
    return await res.status(401).json({
      success: false,
      message: 'Authentication token is missing'
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();

  }catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token'
    })
  }
}

export default {
  authenticate
}