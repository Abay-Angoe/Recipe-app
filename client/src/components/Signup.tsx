import '../index.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleBtn from './partials/GoogleBtn';

export const Signup: React.FC = () => {
  
const navigate = useNavigate();

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {

    const response = await fetch('http://localhost:8000/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: name,
        email: email,
        password: password
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('accessToken', data.access_token);
      alert('Sign up successful!');
      navigate('/homepage'); 
    } else {
      const data = await response.json();
      alert(data.error);
    }
  } catch (error) {
    console.log('Error while signing up:', error);
    alert('An error occurred while signing up');
  }
};

const handleGoogleSignup = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/v1/auth/google', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      // Redirect to Google sign-in page
       window.location.href = data.googleSignInUrl;
    } else {
      // Handle error response
      const errorData = await response.json();
      console.error('Error while signing up with Google:', errorData.message);
    }
  } catch (error) {
    console.error('Error while signing up with Google:', error);
  }
};

  return (
    <>
        <section className='signup'>

        <div className="hero-image">
        </div>
            
            <form onSubmit={handleSubmit} className='user-auth'>

              <div className="logo">
                <img src="https://www.svgrepo.com/show/492596/food.svg" alt="" />
                <h1>Good <span>Taste</span></h1>
              </div>

              <h1>Sign up</h1>

              <label htmlFor="name">Full Name</label>
              <input 
              type="text" 
              name="name" 
              title='name' 
              placeholder='Sandra Doe' 
              onChange={(e) => setName(e.target.value)} />

              <label htmlFor="email">Email</label>
              <input 
              type="email" 
              name="email" 
              title='email' 
              placeholder='sandra2@gmail.com' 
              onChange={(e) => setEmail(e.target.value)}/>

              <label htmlFor="password">Password</label>
              <input 
              type="password" 
              name="password" 
              title='password' 
              onChange={(e) => setPassword(e.target.value)}/>

              
              <p>By signing up, you agree to campsite's <span>Terms of Service</span> and <span>Privacy policy</span></p>

              <button type='submit' >Sign up</button>

              <p className='btn-txt'>OR</p>

              <button 
              type='button' 
              title='google'
              id='google'
              ><GoogleBtn /></button>
              


              <a href='/login' id='login-link'>Have an account? Login</a>

            </form>

            
        </section>    
    </>
  )
}
