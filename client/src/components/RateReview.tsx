import React, { useState, useEffect } from 'react'
import { GridItem } from './partials/Griditem'
import { Navbar } from './partials/Navbar'
import { Footer } from './partials/Footer'
import StarRating from './partials/Stars'
import { Link, useNavigate } from 'react-router-dom'
import '../index.css'
import './partials/partials.css'
import RecipeFetch from './partials/RecipeFetch'
import { Recipe } from './Homepage';



export const RateReview = () => {

  const navigate = useNavigate();

  const handleGridItemClick = (recipeId: string) => {
    navigate(`/review/${recipeId}`);
  };

  return (
    <>
        <Navbar/>
        <section className="rate-review">
            <h2>Review Recipes</h2>
            <RecipeFetch apiUrl="http://localhost:8000/api/v1/recipes" render={(recipes) => (
              <div className="second-grid">
                {recipes.map((recipe) => (
                
                  <GridItem 
                  key={recipe.id} 
                  imgurl={recipe.photoUrl} 
                  title={recipe.name}
                  onClick={() => handleGridItemClick(recipe.id)}
                // stars={
                  // <StarRating recipeId={recipe.id} setRating={recipe.id}/>
                // }
                  />
        
                ))}

              </div>
           )} />
        </section>
        <Footer/>
    </>
  )
}
