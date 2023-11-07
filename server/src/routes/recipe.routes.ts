import { Router } from "express";
import express from 'express';
import * as recipeController from "../controllers/recipe.controller";
import * as ratingController from "../controllers/rating.controller";
import { isLogin} from '../middlewares/authorization'
import upload from '../config/multer.config'

const recipeRouter: Router = express.Router();

recipeRouter.get('/search', recipeController.searchRecipe );

recipeRouter.post('/favorites/:recipeId', isLogin, recipeController.activateAndDeactivateFavorite);

recipeRouter.get('/favorites', isLogin, recipeController.getFavorites);

recipeRouter.post('/ratings/:recipeId', isLogin, ratingController.addRattings);

recipeRouter.post('/save', upload.single('photo'), recipeController.saveRecipe);

recipeRouter.get('/',  recipeController.getRecipes);

recipeRouter.put('/edit/:id' , upload.single('photo'), recipeController.editRecipe )

recipeRouter.post('/reviews/:recipeId',ratingController.addReview);

recipeRouter.get('/reviews',ratingController.getRecipeWithReview);

recipeRouter.delete('/:id', recipeController.deleteRecipe);



export default recipeRouter;