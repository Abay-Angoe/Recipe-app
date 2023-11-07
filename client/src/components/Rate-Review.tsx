import React, {useState, useEffect} from 'react'
import '../index.css'
import { Navbar } from './partials/Navbar'
import { MobileNav } from './partials/MobileNav'
import { GridItem } from './partials/Griditem'
import StarRating from './partials/Stars'
import { Footer } from './partials/Footer'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export const RateAndReview = () => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [thought, setThought] = useState('');
  const [title, setTitle] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [country, setCountry] = useState('');
  const [check, setCheck] = useState<boolean>(false);

  const navigate = useNavigate();
  

  const { recipeId } = useParams();

  

   
  


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked);
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
/*
    const formData = new FormData();
    formData.append('rating', rating as any);
    formData.append('comment', comment);
    formData.append('review', thought);
    formData.append('title', title);
    formData.append('display name', displayName);
    formData.append('location', country);
    formData.append('email', check as any);
    console.log(formData)
*/   


console.log(comment, rating, thought, title, displayName,country)
    try {
      const response = await fetch(`http://localhost:8000/api/v1/recipes/reviews/${recipeId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          rating,
          comment,
          thought,
          title,
          displayName,
          country,
        }),
        
        
      });

      if (response.ok) {
        // Rating and review submitted successfully
        alert('Rating and review submitted successfully!');
        // navigate to a different page
        navigate(`/review/submitted`);
      } else {
        const errorData = await response.json();
        console.error('Error while submitting rating and review:', errorData.error);
      }
    } catch (error) {
      console.error('Error while submitting rating and review:', error);
    }
  };
  return (
    <>
        <Navbar/>
        <section className='review'>
            <MobileNav/>
            
            <div className="left">
            <h1>Tell us what you think?</h1>
                <GridItem
                imgurl="https://images.unsplash.com/photo-1563635977609-13426cd2b04e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cG9hY2hlZCUyMGVnZ3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                title="Quick and Easy fry" 
                stars={recipeId ? <StarRating recipeId={recipeId} setRating={setRating}/> : null}
                />
            </div>
            <form action=""onSubmit={handleSubmit} className='user-auth review-form'>
                <label htmlFor="comment">How would you rate your experience?</label>
                <div><StarRating recipeId='' setRating={setRating}/></div>

                <label htmlFor="comment">Tell us what you think</label>
                <textarea 
                title='comment' 
                className="comment" 
                id="" 
                cols={10} 
                rows={8}
                onChange={(e) => setComment(e.target.value)}
                ></textarea>

                <label htmlFor="review">Write your review</label>
                <textarea 
                title='review' 
                className="comment" 
                id="" 
                cols={10} 
                rows={8}
                onChange={(e) => setThought(e.target.value)}
                ></textarea>

                <label htmlFor="title">Title your review</label>
                <input 
                title='title' 
                className="title"
                onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="">Display name</label>
                <input 
                type="text" 
                title='name'
                onChange={(e) => setDisplayName(e.target.value)}
                />

                <input 
                type="checkbox" 
                title='check' 
                name="" 
                id="check" 
                checked={check}
                onChange={handleCheckboxChange}
                />

                
                <label htmlFor="">Where are you from <span>Optional</span></label>
                <input 
                type="text" 
                title='name' 
                placeholder='Ghana'
                onChange={(e) => setCountry(e.target.value)}
                />       

                <button>Submit</button>         
            </form>
        </section>
        <Footer/>
    </>
  )
}
