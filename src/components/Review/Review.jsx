import React from 'react';
import avt from "../../static/pictures/avt.jpg"
import Rating from '../Rating/Rating';
import "./Review.css";

function Review({ review }) {
    return (
        <div className='review'>
            <img src={avt} alt="" />
            <div className="review-info">
                <Rating star={review.REVIEW_RATING} />
                <p>{review.REVIEW_COMMENT}</p>
            </div>
        </div>
    );
}

export default Review;