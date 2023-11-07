
import { Request, Response, NextFunction } from 'express';
import * as authServices from '../services/auth.service';
import * as helper from '../utils/helpers';
import bcrypt from 'bcrypt'
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from '../utils/send.email'
import html from '../utils/email.template';



export const googleAuthCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.user as any;
        if (!id) throw new Error('User not found');
        const token = await helper.generateToken(id);
        res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 });
        res.status(201).json({ access_token: token });

    } catch (error) {
        next(error);
    }
}

export const googleAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, googleId, email } = req.body;
        const existingUser = await authServices.getUserByGoogleId(googleId);

        const emailExist = await authServices.getUserByEmail(email);
        if(emailExist?.googleId === null) return res.status(400).json({success : false , message : 'Email already exist'});

        if(existingUser) {
            const token = await helper.generateToken(existingUser.id);  
            res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 });
            return res.status(200).json({ access_token: token });
    
        }
        const saveUser = await authServices.registerUserByGoogle({
            username : name,
            googleId,
            email 

        });

        if (!saveUser) throw new Error('Error saving data');

        const token = await helper.generateToken(saveUser.id);
        res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 });
        return res.status(201).json({ access_token: token });
    } catch (error) {
        next(error);
    }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('token');
        res.status(200).send('Logout successfully');
    } catch (error) {
        next(error);
    }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await authServices.getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ success: false, error: "User already exists" })
        }

        const hashedPassword = await helper.hashData(password);

        const saveUser = await authServices.registerUser({
            id: uuidv4(),
            username ,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            user: saveUser,
            access_token: await helper.generateToken(saveUser.id)
        })

    } catch (error) {
        console.error('Error saving data:', error);
        return res.status(500).json({ success: false, error: 'Internal server error.' });
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    try {

        const user = await authServices.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ success: false, error: 'User not found. Please register first.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password!);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, error: 'Invalid password.' });
        }

        const token = await helper.generateToken(user.id);
        res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 });
        return res.status(200).json({ success: true, access_token: token })

    } catch (error) {
        console.error('Error saving data:', error);
        return res.status(500).json({ success: false, error: 'Internal server error.' });
    }
}

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const user = await authServices.getUserByEmail(email);
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = new Date();
        resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1);

        const updateToken = await authServices.updateToken({ id: user.id, resetToken, resetTokenExpiry });
        if (!updateToken) return res.status(500).json({ success: false, error: 'Internal server error.' });

        const resetUrl = `http://${req.headers.host}/reset-password/${resetToken}`;

        const mailOption = {
            from: "Recipe App",
            to: email,
            subject: 'Forget Password Reset Link',
            html: await html(resetUrl, user.username)
        };

        await sendEmail(mailOption);

        return res.status(200).json({ success: true, message: 'Reset password link sent to your email' });


    } catch (error) {
        next(error);
    }
}

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await authServices.getUserByToken(token);
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });

        const isTokenExpired = new Date() > user.resetTokenExpiry!;
        if (isTokenExpired) return res.status(400).json({ success: false, error: 'Token expired' });

        const hashedPassword = await helper.hashData(password);
        const resetPassword = await authServices.resetPassword(user.id , hashedPassword);

        if(!resetPassword) return res.status(500).json({success : false , message : 'Internal Server Error'}) ;

        return res.status(200).json({succss : true , message : 'Password reset successfull'})
        
    } catch (error) {
        next(error)
    }
}