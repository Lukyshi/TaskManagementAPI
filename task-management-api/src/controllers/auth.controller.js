import authService from '../services/auth.service.js';


const register = async (req, res, next) => {

  try {
    const userData = req.body;
    const user = await authService.register(userData);

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
}

const login = async (req, res, next) => {

  try {
    const userData = req.body;
    const user = await authService.login(userData);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
}

const getProfile = async (req, res, next) => {

  try {
    const userId = req.params.id;
    const user = await authService.getProfile(userId);

    if (!user) {
      return res.status(404).json({
        success: false, 
        message : 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  }catch (error) {
    next(error);
  }
}

export default {
  register,
  login,
  getProfile
}
