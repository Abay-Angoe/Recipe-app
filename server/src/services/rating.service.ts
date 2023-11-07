import { Rating } from '../type/rating.type';
import { db } from '../config/db.config';
import { Review } from '@prisma/client';

export const addRattings = async (rating: Rating) => {
    try {
        const { id, rating: ratingValue, comment, userId, recipeId } = rating;
        return await db.rating.create({
            data: {
                id,
                rating: ratingValue,
                comment,
                userId,
                recipeId
            },
            include: {
                recipe: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        email : true
                    }}
                
            }
        })
        
    } catch (error: any) {
        throw new Error(error);
    }
}
export const addReview = async (review:Review) => {
    try {
        return await db.review.create({
            data :review
        });
        
    } catch (error : any) {
        throw new Error(error)
    }
}

export const getRecipeWithReview = async () => {
    try {
        return await db.recipe.findMany({
            include:{
               review : true 
            }
        })
    } catch (error : any) {
        throw new Error(error)
    }
    
}