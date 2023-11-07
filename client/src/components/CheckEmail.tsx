import React from 'react'
import '../index.css';

export const CheckEmail = () => {
  return (
<>
  <section className='check-email'>
    <div className="hero-image"></div>

    <form className='user-auth'>
      <div className="logo">
        <img src="https://www.svgrepo.com/show/492596/food.svg" alt="" />
        <h1>Good <span>Taste</span></h1>
      </div>


      <h1>Check your email</h1>
      <p>We sent a password reset link</p>
      <p>sandra2@gmail.com</p>

      <button type='submit' >Open email app</button>

      <a id='signup-link'>Didnt recieve the email? click to resend</a> 
    </form>
  </section>
</>
  )
}
