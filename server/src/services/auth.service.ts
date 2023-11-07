import { User } from '@prisma/client';
import { db } from '../config/db.config';
import { IUserAuth } from '../interfaces/user-auth.interface';
import { GoogleAuth } from '../type/googleAuth.type';
import { TokenOption } from '../type/tokenOption.type';
import { v4 as uuidv4 } from 'uuid';



export const getUserByGoogleId = async (googleId: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                googleId
            }
        })
        return user;
    } catch (error) {
        throw error;
    }
}

export const registerUserByGoogleId = async (googleId: string, username: string): Promise<object | null> => {
    try {
        const user = await db.user.create({
            data: {
                id: uuidv4(),
                googleId,
                username
            }
        })
        return user;
    } catch (error) {
        throw error;
    }
}

export const registerUserByGoogle= async (googleUser : GoogleAuth): Promise<User> => {
    try {
        const user = await db.user.create({
            data: {
                id: uuidv4(),
                ...googleUser
            }
        })
        return user;
    } catch (error) {
        throw error;
    }
}


export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        });
        return user;
    } catch (error) {
        throw error;
    }
}



export const registerUser = async (user: IUserAuth) => {
    try {
        const { id, username, email, password } = user;
        return await db.user.create({
            data: {
                id,
                username,
                email,
                password
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        })
    } catch (error) {
        throw error;
    }
}

export const updateToken = async (tokenOption: TokenOption) => {
    const { id, resetToken, resetTokenExpiry } = tokenOption;
    try {
        return await db.user.update({
            where: { id },
            data: { resetToken, resetTokenExpiry },
        });

    } catch (error: any) {
        throw new Error(error)
    }

}

export const getUserByToken =async (resetToken: string) => {
    try {
       return await db.user.findFirst({
            where: { resetToken, resetTokenExpiry: { gte: new Date() } },
          });
        
    } catch (error : any) {
        throw new Error(error)
    }
    
}

export const resetPassword = async (id : string , password : string) => {
    try {
        return await db.user.update({
            where: { id },
            data: { password, resetToken: null, resetTokenExpiry: null},
        });
    }
    catch (error: any) {    
        throw new Error(error)
    }
}

