import { Request, Response, NextFunction } from 'express';
import * as recipeService from '../services/recipe.services';
import * as ratingsService from '../services/rating.service';
import { CustomRequest } from '../interfaces/token.interfaces';
import { v4 as uuidv4 } from 'uuid';


export const addRattings = async (req: Request, res: Response, next: NextFunction) => {
    const user: any = (req as CustomRequest).token;
    const recipeId = req.params.recipeId;
    const { rating, comment } = req.body;
    try {
        const recipeExit = await recipeService.getRecipeById(recipeId);
        if (!recipeExit) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }
        if (comment.length < 8) {
            return res.status(400).json({ message: 'Comment must be at least 8 character' });
        }

        const newRating = await ratingsService.addRattings({
            userId: user.id, recipeId,
            id: uuidv4(),
            rating: req.body.rating,
            comment: req.body.comment
        });
        return res.status(201).json(newRating);
    } catch (error: any) {
        throw new Error(error)
    }
}


export const addReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { recipeId } = req.params;
        const { thought, comment, title, displayName, country, rating } = req.body;

        const recipeExit = await recipeService.getRecipeById(recipeId);
        if (!recipeExit) return res.status(404).json({ message: 'Recipe not found' });

        if (rating < 1 || rating > 5) return res.status(400).json({ message: 'Rating must be between 1 and 5' });

        const savedReview = await ratingsService.addReview({
            id: uuidv4(),
            comment,
            thought,
            title,
            displayName,
            country,
            rating : parseInt(rating),
            recipeId
        }) ;

        if(!savedReview) return res.status(500).json({ succes: false , data : "Review is not Saved"})

        return res.status(201).json({ succes: true , data : savedReview})


    } catch (error) {
        next(error)
    }

}

export const getRecipeWithReview = async (req : Request , res : Response , next:NextFunction) => {
    try {
        const recipes = await ratingsService.getRecipeWithReview();

        if(!recipes) return res.status(404).json("No Recipe") ;

        return res.status(200).json({success: true , data :recipes})
    } catch (error) {
        next(error)
    }
    
}