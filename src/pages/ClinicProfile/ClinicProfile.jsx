import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import './ClinicProfile.css';
import avt1 from '../../static/pictures/avt1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import Review from '../../components/Review/Review';
import { Context } from '../../context/Context';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ClinicProfile(props) {
    const { user } = useContext(Context);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const getReviews = async () => {
            const res = await axios.get("/reviews/" + user[0].CLINIC_ID);
            setReviews(res.data)
        }
        getReviews();
    }, []);

    return (
        <React.Fragment>
            <Header />
            <div className='cliProfile'>
                <img src={avt1} alt="" />
                <div className="cliProfileContainer">
                    <Link className='link' to="/updateCliProfile">
                        <FontAwesomeIcon className='cliProfileEditIcon' icon={faPenToSquare} />
                    </Link>
                    <h2>{user[0].CLINIC_NAME} - {user[0].CLINIC_SLOGAN}</h2>
                    <div className="cliProfileInfo">
                        <p>{user[0].CLINIC_ADDRESS}</p>
                        <p>{user[0].CLINIC_PHONE}</p>
                        <p>{user[0].CLINIC_EMAIL}</p>
                        <p>Giờ làm việc: 8h00 - 17h00</p>
                    </div>
                    <div className="cliReview">
                        <p className='cliReviewTitle'>Phản hồi của khách hàng</p>
                        {reviews?.map((review) => (
                            <Review review={review} key={review.REVIEW_ID} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment >
    );
}

export default ClinicProfile;