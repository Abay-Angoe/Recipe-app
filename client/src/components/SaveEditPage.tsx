import React from 'react'
import { GridItem } from './partials/Griditem'
import { MobileNav } from './partials/MobileNav'
import { Navbar } from './partials/Navbar'
import { Footer } from './partials/Footer'
import { Recipe } from './Homepage';

export const SaveEditPage = () => {
  return (
    <>
    <Navbar/>
        <section className='saved-recipes'>
          <MobileNav/>
            <h1>Saved Recipes</h1>
            <div className="second-grid">
              <GridItem
              imgurl='https://images.unsplash.com/photo-1551790629-9d5c2d781d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNoZWVzZSUyMGZyZW5jaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
              liketext='Save recipe'
              title='Cheese french'
              />
              <GridItem
              imgurl='https://images.unsplash.com/photo-1593775059998-214cca5a08de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJlYWtmYXN0JTIwZWdnfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
              title='Breakfast Egg'
              liketext='Save recipe'
              />
              <GridItem
              imgurl='https://images.unsplash.com/photo-1525804017725-0ac671aea1fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJyZWFrZmFzdCUyMGVnZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
              title='Ham Cheddar Breakfast'
              liketext='Save recipe'
              />
              <GridItem
              imgurl='https://images.unsplash.com/photo-1563635977609-13426cd2b04e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9hY2hlZCUyMGVnZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
              title='Poached Egg'
              liketext='Save recipe'
              />
              <GridItem
              imgurl='https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnJlYWtmYXN0JTIwYnVycml0b3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
              title='Breakfast Burrito'
              liketext='Save recipe'
              />
              <GridItem
              imgurl='https://images.unsplash.com/photo-1600087155871-3d1f659b5534?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z2FybGljJTIwcm9hc3RlZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
              title='Best Garlic Roasted'
              liketext='Save recipe'
              />
              <GridItem
              imgurl='https://images.unsplash.com/photo-1600180786489-2e9a5b4041b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdhcmxpYyUyMHJvYXN0ZWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
              title='Sweet Beef Boats'
              liketext='Save recipe'
              />
              <GridItem
              imgurl='https://images.unsplash.com/photo-1509722747041-616f39b57569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhbmR3aWNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
              title='Healthy Sandwich'
              liketext='Save recipe'
              />
              <GridItem
              imgurl='https://images.unsplash.com/photo-1414450397866-85f90db48714?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGZydWl0JTIwbGVtb25hZGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
              title='Fruits Lemonade'
              liketext='Save recipe'
              />
              <GridItem
              imgurl='https://images.unsplash.com/photo-1601091581856-07d8bd49e47c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fG1pbnQlMjBiZXJyeSUyMHNtYXNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
              title='Mint Berry Smash'
              liketext='Save recipe'
              />
              <GridItem
              imgurl='https://images.unsplash.com/photo-1583577612013-4fecf7bf8f13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8T3JhbmdlJTIwbWFuZ28lMjBqdWljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
              title='Orange Mango Ginger Juice'
              liketext='Save recipe'
              />
              <GridItem
              imgurl='https://images.unsplash.com/photo-1579503739626-d1cfa5cba7fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2F0ZXJtZWxvbiUyMGp1aWNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
              title='Watermelon Coconut cool'
              liketext='Save recipe'
              />
              <GridItem
              imgurl='https://images.unsplash.com/photo-1635527726426-cc74da84703e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHNwcml0enxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
              title='Spritz'
              liketext='Save recipe'
              />
              <GridItem
              imgurl='https://images.unsplash.com/photo-1635970452476-5f28499fa67c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJlZXRyb290JTIwanVpY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
              title='Beetroot Juice'
              liketext='Save recipe'
              
              />
            </div>
        </section>
      <Footer/>
    </>
  )
}
