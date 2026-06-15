import express from 'express';
import { Router } from 'express';
const router = Router();
//import authController from '../controllers/auth.controller.js';
import authControlerr from '../controllers/auth.controller.js';
import validateRegister from '../validators/auth.validator.js';
import authController from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';


router.post('/register', validateRegister.validateRegister, authController.register);
router.post('/login', authController.login);

router.use(authMiddleware.authenticate); 

router.get('/me/:id', authController.getProfile);

export default router;
