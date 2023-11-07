import React from 'react'

export const NewPassword = () => {
  return (
    <>
    <section className='signup'>

    <div className="hero-image">
    </div>
        
        <form action="submit" className='user-auth'>


          <div className="logo">
            <img src="https://www.svgrepo.com/show/492596/food.svg" alt="" />
            <h1>Good <span>Taste</span></h1>
          </div>
          <h1>Set new password</h1>
          <p>Your new password must be different to previously used passwords</p>


          <label htmlFor="password">Password</label>
          <input type="password" name="password" title='password' />

          <label htmlFor="password">Confirm password</label>
          <input type="password" name="password" title='password' />

          <button type='submit' >Reset Password</button>
        </form>

        
    </section>    
</>
  )
}
