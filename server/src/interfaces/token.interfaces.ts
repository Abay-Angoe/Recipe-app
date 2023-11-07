import  { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface TokenPayload {
    userId: string;
    iat: number;
    exp: number;
} ;

export interface CustomRequest extends Request {
    token: string | JwtPayload;
} ;