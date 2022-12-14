import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './ClinicDetail.css';
import avt from '../../static/pictures/avt.jpg';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Review from '../../components/Review/Review';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../context/Context';
import Login from '../Login/Login';
import Booking from '../../components/Booking/Booking';
import Warning from '../../components/Warning/Warning';
import AddReview from '../../components/AddReview/AddReview';
import Success from '../../components/Success/Success';

function ClinicDetail(props) {
    const location = useLocation();
    const idClinic = location.pathname.split("/")[2];
    const [clinic, setClinic] = useState({});
    const { user } = useContext(Context);
    const [openBooking, setOpenBooking] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [success, setSuccess] = useState(false);
    const PF = "http://localhost:5000/public/images/";

    const handleSuccessReview = () => {
        setSuccess(true);
    }

    const handleHideSuccess = () => {
        setSuccess(false);
        window.location.reload();

    }
    useEffect(() => {
        const getClinic = async () => {
            const res = await axios.get("/clinics/" + idClinic);
            setClinic(res.data);
        };
        const getReviews = async () => {
            const res2 = await axios.get("/reviews/" + idClinic);
            setReviews(res2.data)
        }
        getClinic();
        getReviews();
    }, []);

    const handleHideBooking = () => {
        setOpenBooking(false)
    }

    const handleHideLogin = () => {
        setOpenLogin(false)
    }

    const handleHideWarning = () => {
        setOpenWarning(false);
    }

    const handleOpenBooking = () => {
        if (user && user[0].C_role == 'customer') {
            setOpenBooking(true);
        } else if (user && user[0].C_role == 'clinic') {
            setOpenWarning(true);
        } else if (!user) {
            setOpenLogin(true);
        }
    }

    return (
        <React.Fragment>
            <Header />
            {success && <Success title={"????nh gi?? ph??ng kh??m th??nh c??ng!"} handleHideSuccess={handleHideSuccess} />}
            {openWarning && <Warning handleHideWarning={handleHideWarning} />}
            {openLogin && <Login handleHideLogin={handleHideLogin} />}
            {openBooking && <Booking clinic={clinic} user={user} handleHideBooking={handleHideBooking} />}
            <div className='clinicDetail'>
                <img src={clinic.CLINIC_AVT ? PF + clinic.CLINIC_AVT : avt} alt="" />
                <div className="clinicDetailContainer">
                    <div className="clinicDetailInfo">
                        <div className="clinicInfo">
                            <h3>Nha khoa {clinic.CLINIC_NAME} - {clinic.CLINIC_SLOGAN}</h3>
                            <p>?????a ch???: {clinic.CLINIC_ADDRESS}</p>
                            <p>S??? ??i???n tho???i: {clinic.CLINIC_PHONE}</p>
                            <p>Gi??? l??m vi???c: 8h00 - 17h00</p>
                        </div>
                        <button className="clinicBooking" onClick={handleOpenBooking} >
                            ?????t l???ch
                            <p></p>
                            <FontAwesomeIcon className='clinicBooking-icon' icon={faCalendarPlus} />
                        </button>
                    </div>
                    <div className="clinicReview">
                        <p>Ph???n h???i c???a kh??ch h??ng</p>
                        <AddReview clinic={clinic.CLINIC_ID} handleSuccessReview={handleSuccessReview} />
                        {reviews?.map((review) => (
                            <Review review={review} key={review.REVIEW_ID} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>

    );
}

export default ClinicDetail;