
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import './Rating.css';

function Rating({ star }) {
    // const [rating, setRating] = useState(null);
    // const [hover, setHover] = useState(null);

    return (
        <div className='rating'>
            {[...Array(star)].map((i) => {
                // const ratingValue = i + 1;
                return (
                    <label key={i} >
                        <input
                            type="radio"
                            name='rating'
                        // value={star}
                        // value={ratingValue}
                        // onClick={() => setRating(ratingValue)}
                        />
                        <FontAwesomeIcon
                            className='star'
                            // color={ratingValue <= (hover || rating) ? "#FFCE31" : "#e4e5e9"}
                            color='#FFCE31'
                            icon={faStar}
                        // onMouseEnter={() => setHover(ratingValue)}
                        // onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
            {/* <p>The rating value is {rating}.</p> */}

        </div>
    );
}

export default Rating;