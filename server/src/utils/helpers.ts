import jwt from "jsonwebtoken";
import  bcrypt  from 'bcryptjs'
import * as dotenv from "dotenv";


dotenv.config();

export const generateToken = async (id:string) :Promise<string> => {
    try {
        return await jwt.sign({ id }, process.env.JWT_SECRET!, {
            expiresIn: process.env.JWT_EXPIRE
        }); 
    } catch (error :any) {
        throw new Error(error);
    }
};

export const verifyToken = async (token: string) :Promise<string | object> => {
    try {
        return await jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error :any) {
        throw new Error(error);
    }
} ;

export const hashData = async (data: string) :Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, salt);
};

export const verifyHashData = async (data: string, hash: string) :Promise<boolean> => {
    return await bcrypt.compare(data, hash);
}
