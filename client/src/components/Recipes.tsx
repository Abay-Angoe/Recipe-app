import React, { useState } from 'react';
import { GridItem } from './partials/Griditem';
import { Navbar } from './partials/Navbar';
import { Footer } from './partials/Footer';
import RecipeFetch from './partials/RecipeFetch';
import { MobileNav } from './partials/MobileNav';
import DeleteModal from './partials/DeleteModal';
import { Recipe } from './Homepage';


export const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedRecipe) {
        const response = await fetch(
          `http://localhost:8000/api/v1/recipes/${selectedRecipe.id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );

        if (response.ok) {
          console.log(`Deleted recipe with ID: ${selectedRecipe.id}`);
          setIsModalOpen(false);
         
          setRecipes(recipes.filter(recipe => recipe.id !== selectedRecipe.id));
        } else {
          const data = await response.json();
          console.error('Error deleting recipe:', data.message);
        }
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <>
      <Navbar />
      <MobileNav />
      <section className='recipes'>
        <h1>Recipes</h1>
        <RecipeFetch apiUrl="http://localhost:8000/api/v1/recipes" render={(recipes) => (
          <div className="second-grid">
            {recipes.map((recipe) => (
                <GridItem
                  imgurl={recipe.photoUrl}
                  title={recipe.name}
                  key={recipe.id}
                  onClick={() => handleDeleteClick(recipe)}
                />
            ))}
          </div>
        )} />
        {selectedRecipe && (
          <DeleteModal
            isOpen={isModalOpen}
            onCancel={handleCancelDelete}
            onDelete={handleConfirmDelete}
          />
        )}
      </section>
      <Footer />
    </>
  );
};
