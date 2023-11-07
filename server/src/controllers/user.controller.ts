import { Request, Response, NextFunction } from "express";
import * as userServices from '../services/user.service';
import cloudinary from "../config/cloudinary.config";
import fs from 'fs';
import { CustomRequest } from '../interfaces/token.interfaces';

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user: any = (req as CustomRequest).token;
    const { fullName, email } = req.body;

    const photoFile = req.file;
    let photoUrl = '';
    
    if (photoFile) {
     const result = await cloudinary.uploader.upload(photoFile.path);
     photoUrl = result.secure_url;
   }

   if(photoFile) fs.unlinkSync(photoFile.path);
    try {

        const userExit = await userServices.getUserById(user.id);
        if (!userExit) return res.status(404).json({ message: 'User Not Found' });
        const updatedUser = await userServices.updateProfile(user.id, { username : fullName, email , photoUrl });
        return res.status(200).json({ success: true, user: updatedUser })

    } catch (error: any) {
        next(error) ;
    }
}

export const profile = async (req:Request , res:Response , next:NextFunction) => {
    try {
        const user: any = (req as CustomRequest).token ;
        const profile = await userServices.getUserById(user.id) ;
        if(!profile) return res.status(404).json({ message: 'User Not Found' })
        return res.status(200).json({
            success : true ,
            data : profile
        }) ;
    } catch (error) {
        next(error) ;
    }   
}