import express from 'express';
import { getUserProfile, logOut, signIn, signUp } from '../contoller/user.contorlloer.js';

const router = express.Router();


router.post('/signup',signUp)
router.post('/login',signIn)
router.get('/profile',getUserProfile)
router.post('/logout',logOut)


export default router