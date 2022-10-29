import React from 'react';
import { useState } from 'react';
import './AddRating.css';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AddRating({ handleSetRating }) {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const handleRating = (value) => {
        setRating(value);
        handleSetRating(value);
    }

    return (
        <div className='addRating'>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label key={star}>
                        <input
                            type="radio"
                            name='rating'
                            value={ratingValue}
                            onClick={() => handleRating(ratingValue)}
                        />
                        <FontAwesomeIcon
                            className='addRating-star'
                            color={ratingValue <= (hover || rating) ? "#FFCE31" : "#BFBABA"}
                            icon={faStar}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
            {/* <p>The rating value is {rating}.</p> */}
        </div>
    );
}

export default AddRating;