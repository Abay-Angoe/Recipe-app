import { Request , Response , NextFunction } from "express";
import * as authServices from '../services/auth.service' ;

export const resetPassword = async (req:Request , res:Response , next:NextFunction) => {
    try {
        const { token } = req.params ;
        const user = await authServices.getUserByToken(token) ;
        if(!user) return res.status(404).json({ message: 'User Not Found' }) ;

        if(user.resetToken !== token) return res.status(400).json({ message: 'Invalid Token' })
        const isTokenExpired = new Date() > user.resetTokenExpiry!;
        
        if(isTokenExpired) return res.status(400).json({ message: 'Token Expired' })
        res.render('reset-password') ;
    } catch (error) {
        next(error) ;
    }
}

export const successResetPassword = async (req:Request , res:Response , next:NextFunction) => {
    try {
        res.render('success-reset-password') ;
    } catch (error) {
        next(error) ;
    }
}
