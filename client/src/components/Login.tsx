import '../index.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
const navigate = useNavigate();

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {

    const response = await fetch('http://localhost:8000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('accessToken', data.access_token);
      alert('Log in successful!');
      navigate('/profilepage'); 
    } else {
      const data = await response.json();
      alert(data.error);
    }
  } catch (error) {
    console.log('Error while logging in:', error);
    alert('An error occurred while logging in');
  }
};
  

  return (
    <>
        <section className='login'>

          <div className="hero-image"></div>
            
          <form className='user-auth' onSubmit={handleSubmit}>

            <div className="logo">

              <img src="https://www.svgrepo.com/show/492596/food.svg" alt="" />
              <h1>Good <span>Taste</span></h1>

            </div>
            <h1>Login</h1>

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

            <a href="/forgotpassword">Forgot your password?</a>

            <p>By signing up, you agree to campsite's <span>Terms of Service</span> and <span>Privacy policy</span></p>
            <button type='submit'>Log In</button>

            <a href='/signup' id='signup-link'>dont have an account? Sign up</a> 

          </form>

            
        </section>    
    </>
  )
}
