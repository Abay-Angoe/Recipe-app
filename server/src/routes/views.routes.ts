import { Router } from 'express';
import express from 'express';
import * as viewControllers from '../controllers/views.controller';

const viewRouter: Router = express.Router();

viewRouter.get('/reset-password/:token', viewControllers.resetPassword);

viewRouter.get('/success-reset-password', viewControllers.successResetPassword);

export default viewRouter;


