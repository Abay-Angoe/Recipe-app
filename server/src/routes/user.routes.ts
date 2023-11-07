import express from 'express';
import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import {isLogin} from '../middlewares/authorization'
import upload from '../config/multer.config';

const userRouter : Router = express.Router();

userRouter.put('/profile/update', isLogin,upload.single('photo') ,userController.updateProfile)
userRouter.get('/profile' , isLogin , userController.profile) ;


export default userRouter ;