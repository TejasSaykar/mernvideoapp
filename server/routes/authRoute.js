import express from 'express'
import { googleAuth, signinController, signupController } from '../controllers/authController.js';
const router = express.Router();


// Signup
router.post("/signup", signupController);

// Signin
router.post("/signin", signinController);

// Google login
router.post("/google", googleAuth);


export default router;