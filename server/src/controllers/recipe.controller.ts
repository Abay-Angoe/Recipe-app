import { Request, Response, NextFunction } from 'express';
import * as recipeService from '../services/recipe.services';
import { CustomRequest } from '../interfaces/token.interfaces';
import cloudinary from '../config/cloudinary.config';
import { Recipe } from '../type/recipe.type'
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';


export const searchRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipes = await recipeService.searchRecipe(req.query);
        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
}


export const activateAndDeactivateFavorite = async (req: Request, res: Response, next: NextFunction) => {
    const user: any = (req as CustomRequest).token;
    const recipeId = req.params.recipeId;
    try {
        const favorite = await recipeService.activateAndDeactivateFavorite({
            userId: user.id, recipeId,
            id: uuidv4()
        });
        return res.status(201).json(favorite);
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getFavorites = async (req: Request, res: Response, next: NextFunction) => {
    const user: any = (req as CustomRequest).token;
    try {
        const favorites = await recipeService.getFavorites(user.id);
        if (!favorites) {
            return res.status(404).json({ message: 'Favorites not found' });
        }
        res.status(200).json(favorites);
    }
    catch (error: any) {
        throw new Error(error);
    }
}


export const saveRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            name,
            ingredients,
            numberOfServing,
            directions,
            firstName,
            lastName,
            email } = req.body;

       
       const photoFile = req.file;
       let photoUrl = '';
       if (photoFile) {
        const result = await cloudinary.uploader.upload(photoFile.path);
        photoUrl = result.secure_url;
      }

      if(photoFile) fs.unlinkSync(photoFile.path);

        const recipeData = {
            id: uuidv4(),
            name : name.toLowerCase(),
            photoUrl,
            ingredients: ingredients.toLowerCase().split(','),
            numberOfServing: parseInt(numberOfServing),
            directions : directions.toLowerCase()
        };


        const submitRecipe = async (recipeData: any, creatorId: string) => {
            const recipe = await recipeService.submitRecipe({
                ...recipeData,
                creatorId
            });
            if (recipe) {
                return res.status(201).json({ success: true, message: "Recipe Save Successfully" });
            }
        };
        const recipeCreatorExit = await recipeService.getCreatorByEmail(email);

        if (recipeCreatorExit) {
            await submitRecipe(recipeData, recipeCreatorExit.id);
        } else {
            const newCreator = await recipeService.saveRecipeCreator({
                id: uuidv4(),
                firstName,
                lastName,
                email
            });
            await submitRecipe(recipeData, newCreator.id);
        }
        


    } catch (error) {
        next(error)
    }
}


export const getRecipes = async (req : Request , res : Response , next : NextFunction) => {
    try {
        const recipes = await recipeService.getRecipes();
        if(!recipes) return res.status(404).json({message : 'Recipes not found'});
        res.status(200).json(recipes);
    }
    catch (error: any) {
        next(error)
}
}

export const editRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params ;
        const {
            name,
            ingredients,
            numberOfServing,
            directions,
            firstName,
            lastName,
            email } = req.body;

            const photoFile = req.file;
            let photoUrl = '';
            if (photoFile) {
             const result = await cloudinary.uploader.upload(photoFile.path);
             photoUrl = result.secure_url;
           }
     
           if(photoFile) fs.unlinkSync(photoFile.path);
        

        const recipeData = {
            id,
            name : name.toLowerCase(),
            photoUrl,
            ingredients : ingredients.toLowerCase().trim().split(','),
            numberOfServing: parseInt(numberOfServing),
            directions : directions.toLowerCase()
        };


        const submitRecipe = async (recipeData: any, creatorId: string) => {
            const recipe = await recipeService.editRecipe({
                ...recipeData,
                creatorId
            });
            if (recipe) {
                return res.status(201).json({ success: true, message: "Recipe Updated Successfully" });
            }
        };
        
        const recipeCreatorExit = await recipeService.getCreatorByEmail(email);
        if (recipeCreatorExit)  await submitRecipe(recipeData, recipeCreatorExit.id);
        
    } catch (error) {
        next(error)
    }
}

export const deleteRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params ;
        const recipe = await recipeService.deleteRecipe(id);
        if(!recipe) return res.status(404).json({message : 'Recipe not found'});
        res.status(200).json({message : 'Recipe deleted successfully'});
        
    }catch(error){
        next(error);
    }
}
