import React from 'react'
/*import { ReactComponent as ExampleSVG } from '';*/
import './partials.css'

export const Footer = () => {
  return (
    <>
      <section className="footer">
        <div className="logo">
          <img src="https://www.svgrepo.com/show/492596/food.svg" alt="" />
          <h1>Good <span>Taste</span></h1>
        </div>

        <div className="app-buttons">
          <img src="https://www.freepnglogos.com/uploads/play-store-logo-png/play-store-logo-nisi-filters-australia-11.png" alt="" className='playstore-btn'/>

          <img src="https://seeklogo.com/images/D/download-on-the-app-store-flat-badge-logo-4582694404-seeklogo.com.png" alt="" className='apple-btn'/>
        </div>
        <h3>Get the Good Taste Newsletter</h3>

        <form className='user-auth'>
          <label htmlFor="newsletter">Email address (required)</label>
          <input type="email" name='newsletter' title='newsletter' placeholder='Email Address' id='newsletter-input' />
          <button className='footer-btn'>Sign up</button>
          
          <p>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply. </p>

          <h1>FOLLOW US</h1>
          <div className="social-icons">
            
            <i className='bx bxl-facebook' ></i>
            <i className='bx bxl-instagram' ></i>
            <i className='bx bxl-pinterest' ></i>
            <i className='bx bxl-twitter' ></i>
          </div>
        </form>

        <div className="footer-links">
          <h4>Send feedback</h4>
          <h4>Recipes by Ingredient</h4>
          <h4>Community Recipes</h4>
        </div>
      </section>
    </>
  )
}
