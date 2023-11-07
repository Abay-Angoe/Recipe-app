import './partials.css'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export const Navbar = (props: any) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = () => {
    // Navigate to homepage with search query parameter
    navigate(`/homepage?search=${encodeURIComponent(searchQuery.toLowerCase())}`);
  };


  return (
  <>
    <section className='navbar'>
      <div className="logo">
        <img src="https://www.svgrepo.com/show/492596/food.svg" alt="" />
        <h1>Good <span>Taste</span></h1>
      </div>


      <div className="nav-links">
        <a href="/homepage">Home</a>
        <a href="/recipepage">Recipes</a>
        <a href="/favorites">Favorites</a>
      </div>

      <form className='search-bar' onSubmit={handleSearchSubmit}>
        <i className='bx bx-search'></i>
        <input
          type='search'
          name='search'
          title='search'
          placeholder='Search'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      <div className="user-icons">
        <i className='bx bxs-heart hidden-heart'></i>
        <i className='bx bx-bell'></i>

        <div className="profile">
          <a href="/profilepage"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="" /></a>
        </div>
      </div>
    </section>
  </>
  )
}
