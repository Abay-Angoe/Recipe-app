import React from 'react'
import { Footer } from './partials/Footer'
import { GridItem } from './partials/Griditem'
import RecipeFetch from './partials/RecipeFetch'
import { MobileNav } from './partials/MobileNav'
import { Navbar } from './partials/Navbar'

export const Favorites = () => {
  return (
    <>
        <Navbar/>
        <MobileNav/>
            <section className='recipes'>
                <h1>Recipes</h1>
                <RecipeFetch apiUrl="http://localhost:8000/api/v1/recipes/favorites" render={(recipes) => (
                    <div className="second-grid">
                        {recipes.map((recipe) => (
                            <GridItem
                            key={recipe.id} 
                            imgurl={recipe.photoUrl} 
                            title={recipe.name} 
                            />
                        ))}
                    </div>
                )} />
            </section>
        <Footer/>
    </>
  )
}
