import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import avt from "../../static/pictures/avt.jpg"
import Rating from '../Rating/Rating';
import "./Review.css";

function Review({ review }) {
    const PF = "http://localhost:5000/public/images/";

    return (
        <div className='review'>
            <img src={review.CUSTOMER_AVT ? PF + review.CUSTOMER_AVT : avt} alt="" />
            <div className="review-info">
                <b>{review.CUSTOMER_NAME}</b>
                <Rating star={review.REVIEW_RATING} />
                <p>{review.REVIEW_COMMENT}</p>
            </div>
        </div>
    );
}

export default Review;