import React, { useCallback, useContext, useState } from 'react';
// import AddRating from '../AddRating/AddRating';
import './AddReview.css';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Context } from '../../context/Context';
import dateFormat from 'dateformat';
import axios from 'axios';

function AddReview({ clinic, handleSuccessReview }) {
    const { user } = useContext(Context);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    let today = dateFormat(new Date(), "yyyy-mm-dd");
    const [date, setDate] = useState(today);

    const handleSuccess = () => {
        handleSuccessReview(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/reviews", {
                REVIEW_CLINIC: clinic,
                REVIEW_CUSTOMER: user[0].CUSTOMER_ID,
                REVIEW_COMMENT: comment,
                REVIEW_RATING: rating,
                REVIEW_DATE: date
            })
            handleSuccess(true);
        } catch (err) {
            console.log(err);
        }
        console.log("DỮ LIỆU SUBMIT REVIEW: ", clinic, user[0].CUSTOMER_ID, comment, rating, date)
    }

    return (
        <div className='addReview'>
            <p>Bình luận và đánh giá: </p>
            <form className="addReview-info" onSubmit={handleSubmit}>
                <div className='addRating'>
                    {/* {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;

                        return (
                            <label key={star}>
                                <input
                                    type="radio"
                                    name='rating'
                                    value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
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
                    })} */}
                    {/* <p>The rating value is {rating}.</p> */}
                    <FontAwesomeIcon
                        onClick={() => setRating(1)}
                        className='addRating-star'
                        color={(rating >= 1) ? "#FFCE31" : "#BFBABA"}
                        icon={faStar}
                    />
                    <FontAwesomeIcon
                        onClick={() => setRating(2)}
                        className='addRating-star'
                        color={(rating >= 2) ? "#FFCE31" : "#BFBABA"}
                        icon={faStar}
                    />
                    <FontAwesomeIcon
                        onClick={() => setRating(3)}
                        className='addRating-star'
                        color={(rating >= 3) ? "#FFCE31" : "#BFBABA"}
                        icon={faStar}
                    />
                    <FontAwesomeIcon
                        onClick={() => setRating(4)}
                        className='addRating-star'
                        color={(rating >= 4) ? "#FFCE31" : "#BFBABA"}
                        icon={faStar}
                    />
                    <FontAwesomeIcon
                        onClick={() => setRating(5)}
                        className='addRating-star'
                        color={(rating >= 5) ? "#FFCE31" : "#BFBABA"}
                        icon={faStar}
                    />
                </div>
                <input className='addRating-input' onChange={(e) => setComment(e.target.value)} type="text"></input>
                <button type='submit' className='addReview-btn'>Đăng tải</button>
            </form >
        </div >
    );
}

export default AddReview;