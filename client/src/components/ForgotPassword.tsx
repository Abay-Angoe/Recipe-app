import '../index.css';
import React, { useState } from 'react';

export const ForgotPassword = () => {

  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/forget-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('Password reset link sent to your email!');
      } else {
        const data = await response.json();
        alert(data.error);
      }
    } catch (error) {
      console.error('Error while sending reset link:', error);
      alert('An error occurred while sending reset link');
    }
  };


  return (
    <>
        <section className='forgot-password'>
            <div className="hero-image"></div>

            <form onSubmit={handleSubmit} className='user-auth'>

              <div className="logo">
                <img src="https://www.svgrepo.com/show/492596/food.svg" alt="" />
                <h1>Good <span>Taste</span></h1>
              </div>
              <h1>Forgot Password?</h1>
              <p>No worries, we will send you reset instructions</p>

                
              <label htmlFor="email">Email</label>
              <input 
              type="email" 
              name="email" 
              title='email' 
              placeholder='sandra2@gmail.com'
              onChange={(e) => setEmail(e.target.value)}/>

              <button type='submit' >Send link</button>

              <a href='/login' id='signup-link'>Back to log in</a> 

            </form>
        </section>
    </>
  )
}
