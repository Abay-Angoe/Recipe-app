import  { Router } from "express";
import express  from 'express';

import passport from 'passport';


import { validateFullName } from '../middlewares/validateFullname';
import { validateEmail } from '../middlewares/validateEmail';


import * as authController from "../controllers/auth.controller";

const authRouter : Router = express.Router();

authRouter.post('/logout' , authController.logout)

authRouter.get('/google', passport.authenticate('google', { scope: ['profile'] }));
authRouter.get('/google/callback', passport.authenticate('google', { scope: ['profile'] }), authController.googleAuthCallback);

authRouter.post('/google', authController.googleAuth);

authRouter.post('/register', validateFullName, validateEmail, authController.register)
authRouter.post('/login',validateEmail, authController.login) 

authRouter.post('/forget-password', authController.forgotPassword) ;

authRouter.post('/reset-password/:token', authController.resetPassword);




export default authRouter;