import '../index.css'
import { Navbar } from './partials/Navbar'
import { Footer } from './partials/Footer'
import { GridItem } from './partials/Griditem'
import React, { useState, useEffect } from 'react';

export const ProfilePage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<any>(null);

  const [photoUrl, setPhotoUrl] = useState<File | null>(null);
  const [photo, setPhoto] = useState('')

  useEffect(() => {
    
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/users/profile', 
        { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.data);
          console.log(userData);

          const fetchedUsername = data.data.username || '';
          const names = fetchedUsername.split(' ');
          setFirstName(names[0]);
          setLastName(names.slice(1).join(' '));

          setEmail(data.data.email || '');
          setUsername(data.data.username || '');
          setPhotoUrl(data.data.photoUrl || '')
          setPhoto(data.data.photo || '')
        } else {
          console.error('Error fetching profile data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/profile/update',  {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ 
          firstName, 
          lastName, 
          email, 
          username, 
          photoUrl, 
          photo
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setUserData(data.data);
        console.log(userData)
        alert('Profile updated successfully!');
        

      } else {
        const data = await response.json();
        console.error('Error updating profile:', data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };


  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedPhoto = e.target.files[0];
      setPhoto(URL.createObjectURL(uploadedPhoto)); 
      setPhotoUrl(uploadedPhoto);
    }
  };
  return (
    <>
        <Navbar/>
        <section className='profile-page'>
            <div className="mobile-nav">
            <i className='bx bx-left-arrow-alt' ></i>
                <div>
                <i className='bx bx-list-ul'></i>
                <i className='bx bx-heart'></i>
                </div>
            </div>
            <h1 className="">Personal Information</h1>
            <div className="profile-picture">
                
                  <img src={photo} alt="" />
                
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
                >Change Profile Picture</button>
            </div>
            <form onSubmit={handleSubmit} className='profile-page user-auth'>

                <label htmlFor="name">First Name</label>
                <input 
                type="text" 
                name="firstName" 
                title='firstName' 
                defaultValue={firstName}
                onChange={(e) => setFirstName(e.target.value)}/>

                <label htmlFor="name">Last Name</label>
                <input 
                type="text" 
                name="lastName" 
                title='lastName' 
                defaultValue={lastName}
                onChange={(e) => setLastName(e.target.value)}/>

                <label htmlFor="email">Email</label>
                <input 
                type="email" 
                name="email" 
                title='email'
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="username">Username</label>
                <input 
                type="text" 
                name="username" 
                title='username' 
                defaultValue={username}
                onChange={(e) => setUsername(e.target.value)}/>

                <button type='submit' >Submit</button>

            </form>
            <div className="second-grid">
              <GridItem 
                imgurl="https://images.unsplash.com/photo-1534889196564-a6799df68403?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhbGFkJTIwbXVzdGFyZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                title="Salad Mustard" 
                />
              <GridItem 
                imgurl="https://images.unsplash.com/photo-1606168159202-1f3fca458c18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9uZXklMjBsaW1lJTIwYXZvY2Fkb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                title="Honey Lime and Avocado" 
                />

              <GridItem 
                imgurl="https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                title="Chicken Dumplings" 
                />
            </div>
        </section>
        <Footer/>
    </>
  )
}
