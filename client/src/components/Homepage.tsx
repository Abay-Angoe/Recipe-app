import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './partials/Navbar'
import { Footer } from './partials/Footer'
import { GridItem } from './partials/Griditem'



export type Recipe = {
  id : string ;
  name : string;
  photoUrl :  string;
  ingredients? : string[];
  cuisine? : string ;
  dietaryRestrictions? : string;
  numberOfServing : number ;
  directions : string ;
  creatorId : string ;

}

export const Homepage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);;
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search') || '';
  const [likedRecipes, setLikedRecipes] = useState<string[]>([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        let url = 'http://localhost:8000/api/v1/recipes';
        if (searchQuery) {
          url = `http://localhost:8000/api/v1/recipes/search?term=${encodeURIComponent(
            searchQuery.toLowerCase()
          )}`;
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.error('Error fetching recipes:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
    fetchRecipes();
  }, [searchQuery]);



  const handleLikeClick = async (recipeId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/recipes/favorites/${recipeId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.ok) {
      
        setLikedRecipes([...likedRecipes, recipeId]);
      } else {
        console.error('Error while liking recipe:', response.statusText);
      }
    } catch (error) {
      console.error('Error while liking recipe:', error);
    }
  };

  const handleGridItemClick = () => {
    navigate(`/rateandreview`);
  };
  const handleCreateRecipeClick = () => {
    navigate('/addrecipe'); 
  };

  return (
    <>
      <Navbar />
      <section className="homepage">
      
        <div className='mobile-logo'>
          <img src="https://www.svgrepo.com/show/492596/food.svg" alt="" />
          <h1>Good Taste</h1>
        </div>
        <div className="heading">
            <h2>New recipes</h2>
            <p>Choose from an ever - changing mix of meat, fish. beyond meat <br /> Recommended, diabetes friendly recipes and health-conscious offerings</p>
        </div>
        <div className='banner'>
          <h2>Cheesy Truffle Cavatappi</h2>
          <p>{[ ...Array(5)].map( () => {
            return (<i className='bx bxs-star star'></i>);})}
          </p>
        </div>
        <div className='main'>
          <div className="recipes">

            <h2>Latest Recipes</h2>
            
            <button className='create-recipe' onClick={handleCreateRecipeClick}>
            Create Recipe
            </button>
          </div>

          <div className="first-grid">
            {recipes.map((recipe) => (
              <GridItem 
              key={recipe.id} 
              imgurl={recipe.photoUrl} 
              title={recipe.name} 
              liked={likedRecipes.includes(recipe.id)}
              handleLikeClick={() => handleLikeClick(recipe.id)}
              onClick={handleGridItemClick}
              />
              
            ))}
          </div>

          <h2>Join the Good Taste Community!</h2>
          <p>Have a recipe of your own to share? <a href="">Submit it here</a></p>

          <div className="second-grid">
          {recipes.map((recipe) => (
              <GridItem 
              key={recipe.id} 
              imgurl={recipe.photoUrl} 
              title={recipe.name} 
              liked={likedRecipes.includes(recipe.id)}
              handleLikeClick={() => handleLikeClick(recipe.id)}
              //onClick={() => handleGridItemClick(recipe.id)}
              />
              
            ))}
          </div>
        </div>
        
      </section>
      <Footer/>
    </>

)
}
