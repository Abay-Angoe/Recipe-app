// GridItem.tsx
import React, { useState } from 'react';
import './partials.css';

export const GridItem = (props: any) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  return (
    <>
      <div
        className="grid-item"
        
        onMouseEnter={() => setIsOverlayVisible(true)}
        onMouseLeave={() => setIsOverlayVisible(false)}
      >
        <img src={props.imgurl}  alt="" onClick={props.onClick}/>
        {isOverlayVisible && (
          <div className="overlay" style={{ display: '' }} >
            <i 
            className="bx bx-trash" 
            onClick={props.onDeleteClick}
            ></i>
            <span>Remove</span>
          </div>
        )}
        <div className='like-btn' onClick={props.handleLikeClick}>
          <span className='liked-check'>{props.liked ? 'Liked' : 'Like'}</span>
          <span>{props.liketext}</span>
          <i className={`bx ${props.liked ? 'bxs-heart' : 'bx-heart'}`}></i>
        </div>
        <span className='grid-title' >{props.title}</span>
        <div>{props.stars}</div>
      </div>
    </>
  );
};
