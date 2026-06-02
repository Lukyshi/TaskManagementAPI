import express from 'express';
import { Router } from 'express';
const router = Router();
import auhController from '../controllers/auth.controller.js';
import { validateRegister } from '../validators/auth.validator.js';


router.post('/register', validateRegister, authController.register);
router.post('/login', authController.login);

router.get('/me', authController.getProfile);

module.exports = router;
