import { db } from '../config/db.config';
import { Favorite } from '../type/favorite.type';
import { Recipe } from '../type/recipe.type';
import { RecipeCreator } from '../type/recipeCreator.type';


export const searchRecipe = async (query: any) => {
    const { term } = query;
    try {
        const recipes = await db.recipe.findMany({
            where: {
                OR: [
                    { name: { contains: term } },
                    { ingredients: { has: term } },
                    { cuisine: { contains: term } },
                    { dietaryRestrictions: { contains: term } },
                ]
            }
        });
        return recipes;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getRecipeById = async (id: string) => {
    try {
        const recipe = await db.recipe.findUnique({
            where: {
                id
            }
        });
        return recipe;
    } catch (error: any) {
        throw new Error(error);
    }
}


export const activateFavorite = async (favorite: Favorite) => {
    try {
        const { userId, recipeId, id } = favorite;
        return await db.favorite.create({
            data: {
                id,
                userId,
                recipeId
            },
        })


    } catch (error: any) {
        throw new Error(error);
    }
}

export const deactivateFavorite = async (userId: string, recipeId: string) => {
    try {
        const favorite = await db.favorite.deleteMany({
            where: {
                userId,
                recipeId
            },
        })
        return favorite;
    } catch (error: any) {
        throw new Error(error);
    }
}
export const activateAndDeactivateFavorite = async (favorite: Favorite) => {
    const { id, userId, recipeId } = favorite
    try {
        const exitFavorite = await db.favorite.findFirst({
            where: {
                userId,
                recipeId
            }
        });

        if (exitFavorite) {
            const deactivate= await deactivateFavorite(userId, recipeId);
            if(deactivate) return { recipeId, status: 'deactivate'} ;
        }
    
         const activate = await activateFavorite(favorite) ;
            if(activate) return { recipeId, status: 'activate'} ;
        

    } catch (error: any) {
        throw new Error(error)
    }
}

export const getFavorites = async (userId: string) => {
    try {
        const favorites = await db.favorite.findMany({
            where: {
                userId
            },
            include: {
                recipe: true
            }
        });
        return favorites;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const submitRecipe = async (recipe: Recipe) => {
    try {
        return await db.recipe.create({
            data: recipe
        });

    } catch (error: any) {
        throw new Error(error)
    }
}

export const saveRecipeCreator = async (creator: RecipeCreator) => {
    try {
        return await db.recipeCreator.create({
            data: creator
        });

    } catch (error: any) {
        throw new Error(error)
    }
}

export const getCreatorByEmail = async (email: string) => {
    try {
        return await db.recipeCreator.findUnique({
            where: { email }
        });

    } catch (error: any) {
        throw new Error(error)
    }
}

export const getRecipes = async () => {
    try {
        return await db.recipe.findMany();
    } catch (error: any) {
        throw new Error(error)
    }
}

export const editRecipe = async (recipe: Recipe) => {
    try {
        return await db.recipe.update({
            where: {
                id: recipe.id
            },
            data: recipe
        });
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteRecipe = async (id:string) => {
    try {
        return await db.recipe.delete({
            where: {
                id}});
    } catch (error: any) {
        throw new Error(error)
    }
}




