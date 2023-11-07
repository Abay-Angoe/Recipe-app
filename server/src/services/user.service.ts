import { db } from '../config/db.config';
import { User } from '../type/user.type';

export const getUserById = async (id: string) => {
    try {
        return await db.user.findUnique({
            where: { id }
        });
    } catch (error: any) {
        throw new Error(error)
    }
}

export const updateProfile = async (id: string, data: User) => {
    const { email, username, photoUrl } = data;
    try {
        const updatedUser = await db.user.update({
            where: { id },
            data: {
                email,
                username,
                photoUrl
            }
        });
        return updatedUser
    } catch (error: any) {
        throw new Error(error)
    }
}