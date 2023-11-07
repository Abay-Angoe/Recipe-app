import '../index.css'
import { Navbar } from './partials/Navbar'
import { MobileNav } from './partials/MobileNav'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';


export const AddRecipe = () => {
  const navigate = useNavigate();  


  const [name, setName] = useState('');
  const [numberOfServing, setNumberOfServing] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [directions, setDirections] = useState('');
  const [photoUrl, setPhotoUrl] = useState<File | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedPhoto = e.target.files[0];
      setPhotoUrl(uploadedPhoto);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('numberOfServing', numberOfServing);
    formData.append('ingredients', ingredients);
    formData.append('directions', directions);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('photo', photoUrl as Blob);


    try {
      const response = await fetch('http://localhost:8000/api/v1/recipes/save', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('Recipe added successfully!');
        navigate('/homepage'); 
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
      alert('An error occurred while adding the recipe');
    }
  };
  
  return (
    <>
        <Navbar/>
        <MobileNav/>
        <section className='add-recipe'>
            
            <div className='banner'>
                <h2>Submit your recipe to Tasty!</h2>
                <p>Tasty is lokking for new recpes and wants to feature yours on the Good Taste website! Got a recipe that's been passed down in the family? Or a new recipe you came up with?</p>
                <img src="https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80" alt="" />
                <a href="">View Recipe</a>
            </div>
            <form  className='user-auth'>
                <h2>Recipe Details</h2>
                <label htmlFor="title">Recipe Title <span>*</span></label>
                <input 
                type="text" 
                id="title"
                required
                onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="servings">Number of Servings<span>*</span></label>
                <input 
                type="number" 
                id='servings' 
                title='servings'
                required 
                onChange={(e) => setNumberOfServing(e.target.value)}
                />

                <label htmlFor="ingredients">Ingredients <span>*</span></label>
                <textarea  
                title='ingredients' 
                cols={15} 
                rows={4}
                required
                onChange={(e) => setIngredients(e.target.value)}
                ></textarea>
                <p>Please put each ingredient and its measurement on its own line.</p>

                <label htmlFor="directions">Directions <span>*</span></label>
                <textarea  
                title='directions' 
                cols={15} 
                rows={4}
                required
                onChange={(e) => setDirections(e.target.value)}
                ></textarea>
                <p>Please put each step on its own line</p>

                <label htmlFor="">Upload the photo you took of the dish <span>*</span></label>
                <input
                  type="file"
                  title='photo-input'
                  accept=".png, .jpg, .jpeg"
                  id="photo-input"
                  style={{ display: 'none' }} 
                  onChange={handlePhotoUpload}
                  
                />
                <button
                  type='button'
                  id="upload-btn"
                  onClick={() => document.getElementById('photo-input')?.click()}
                >
                  Upload Photo
                </button>
                <p>PNG or JPEG, max 10MB</p>
            
                <div className="photo-guide">
                    <h2>Photo Guideliness</h2>
                    <p>Please follow these guidelines when uploading a photo.</p>
                    <div className='top'>
                    <h3>Do's</h3>
                    <div>
                        <img src="https://media.istockphoto.com/id/1348405825/photo/wrapping-stuff-into-homemade-burrito.webp?b=1&s=170667a&w=0&k=20&c=3a8AIn1WH_74Z_UsHfQ9YZP6MYj0rVSYxmkp3PPIRz4=" alt="" />
                        <img src="https://media.istockphoto.com/id/1348405825/photo/wrapping-stuff-into-homemade-burrito.webp?b=1&s=170667a&w=0&k=20&c=3a8AIn1WH_74Z_UsHfQ9YZP6MYj0rVSYxmkp3PPIRz4=" alt="" id='mobile-hidden' />
                    </div>
                    <p>Landing (horizontal) <br /> Photo including your dish</p>
                    </div>
                    <h4>Dont's</h4>
                    <p>No people or pets in photo <br /> No personal information</p>
                </div>

            
                <h2>Recipe Credit</h2>

                <label htmlFor="first-name">First Name<span>*</span></label>
                <input 
                type="text" 
                id="first-name"
                required
                onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor="last-name">Last Name <span>*</span></label>
                <input 
                type="text" 
                id="last-name"
                required
                onChange={(e) => setLastName(e.target.value)}
                />

                <label htmlFor="email">Email <span>*</span></label>
                <input 
                type="text" 
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                />   
                <p>This information will be displayed with the recipe</p>

                <button type='submit' onClick={handleSubmit}>Submit your recipe</button>  
          </form>      
        </section>
     
    </>
  )
}
