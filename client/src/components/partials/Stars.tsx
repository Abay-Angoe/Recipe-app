import React, { useState } from 'react';


interface StarRatingProps {
  recipeId: string;
  setRating: React.Dispatch<React.SetStateAction<number>>; 
}

const StarRating: React.FC<StarRatingProps> = ({ recipeId, setRating }) => {
  const [rating, setLocalRating] = useState(0);
  const [hover, setHover] = useState(0);


  return (
    <>
        {[ ...Array(5)].map((star, i) => {
            const ratingValue = i + 1
            return (
              <label>
                <input 
                  type="radio" 
                  className='rating' 
                  name="rating" 
                  title='rating' 
                  value={ratingValue} 
                  onClick={() => 
                  {setLocalRating(ratingValue);
                  setRating(ratingValue)}
                  }
                />
                            
                <i className='bx bxs-star star' 
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                  style=
                  {{ color: ratingValue <= (hover || rating) ? '#F28123' : 'grey' }}
                  ></i>
              </label>
            );   
          })}
    </>
  );
  
};

export default StarRating;