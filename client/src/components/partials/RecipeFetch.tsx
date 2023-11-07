import React, { useState, useEffect } from 'react'
import { Recipe } from '../Homepage';

interface RecipeFetchProps {
  apiUrl: string; 
  render: (recipes: Recipe[]) => JSX.Element;
}

const RecipeFetch: React.FC<RecipeFetchProps> = ({ apiUrl, render }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);;

    useEffect(() => {
      async function fetchRecipes() {
        try {
          const response = await fetch(apiUrl ,  {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json', 
            }});
          console.log(response);
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
    }, [apiUrl]);
  
    return render(recipes);
}

export default RecipeFetch