// RecipePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from './partials/Navbar';
import { Footer } from './partials/Footer';
import { Recipe } from './Homepage';

export const RecipeDetails: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    async function fetchRecipeDetails() {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/recipes/${recipeId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSelectedRecipe(data);
        } else {
          console.error('Error fetching recipe details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    }
    fetchRecipeDetails();
  }, [recipeId]);

  if (!selectedRecipe) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className="recipe-details">
        <div className="recipe-image">
          <img src={selectedRecipe.photoUrl} alt={selectedRecipe.name} />
        </div>
        <div className="recipe-content">
          <h1>{selectedRecipe.name}</h1>
          <p>Number of Servings: {selectedRecipe.numberOfServing}</p>
          <h2>Ingredients:</h2>
          <ul>
            {selectedRecipe.ingredients?.map((ingredient: string, index: number) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2>Directions:</h2>
          <p>{selectedRecipe.directions}</p>
        </div>
      </section>
      <Footer />
    </>
  );
};






/*
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from './partials/Navbar';
import { Footer } from './partials/Footer';
import { Recipe } from './Homepage';


interface RecipeDetailsProps {
  recipes: Recipe[];
}

export const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipes }) => {
 
  const { recipeId } = useParams<{ recipeId: string }>();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>();

  useEffect(() => {
    const recipe = recipes.find(recipe => recipe.id === recipeId);
    if (recipe) {
      setSelectedRecipe(recipe);
    }
  }, [recipeId, recipes]);

  if (!selectedRecipe) {
    return (
      <div>
        <p>Recipe not found.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className="recipe-details">
        <div className="recipe-image">
          <img src={selectedRecipe.photoUrl} alt={selectedRecipe.name} />
        </div>
        <div className="recipe-content">
          <h1>{selectedRecipe.name}</h1>
          <p>Number of Servings: {selectedRecipe.numberOfServing}</p>
          <h2>Ingredients:</h2>
          <ul>
            {selectedRecipe.ingredients?.map((ingredient: string, index: number) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2>Directions:</h2>
          <p>{selectedRecipe.directions}</p>
        </div>
      </section>
      <Footer />
    </>
  );
};
*/
