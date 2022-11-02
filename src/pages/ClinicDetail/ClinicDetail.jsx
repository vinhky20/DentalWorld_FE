import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './ClinicDetail.css';
import avt1 from '../../static/pictures/avt1.jpg';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Review from '../../components/Review/Review';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../context/Context';
import Login from '../Login/Login';
import Booking from '../../components/Booking/Booking';
import Notice from '../../components/Notice/Notice';
import AddReview from '../../components/AddReview/AddReview';
import Success from '../../components/Success/Success';

function ClinicDetail(props) {
    const location = useLocation();
    const idClinic = location.pathname.split("/")[2];
    const [clinic, setClinic] = useState({});
    const { user } = useContext(Context);
    const [openBooking, setOpenBooking] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openNotice, setOpenNotice] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [success, setSuccess] = useState(false);

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

    const handleHideNotice = () => {
        setOpenNotice(false);
    }

    const handleOpenBooking = () => {
        if (user && user[0].C_role == 'customer') {
            setOpenBooking(true);
        } else if (user && user[0].C_role == 'clinic') {
            setOpenNotice(true);
        } else if (!user) {
            setOpenLogin(true);
        }
    }

    return (
        <React.Fragment>
            <Header />
            {success && <Success title={"Đánh giá phòng khám thành công!"} handleHideSuccess={handleHideSuccess} />}
            {openNotice && <Notice handleHideNotice={handleHideNotice} />}
            {openLogin && <Login handleHideLogin={handleHideLogin} />}
            {openBooking && <Booking clinic={clinic} user={user} handleHideBooking={handleHideBooking} />}
            <div className='clinicDetail'>
                <img src={avt1} alt="" />
                <div className="clinicDetailContainer">
                    <div className="clinicDetailInfo">
                        <div className="clinicInfo">
                            <h3>Nha khoa {clinic.CLINIC_NAME} - {clinic.CLINIC_SLOGAN}</h3>
                            <p>Địa chỉ: {clinic.CLINIC_ADDRESS}</p>
                            <p>Số điện thoại: {clinic.CLINIC_PHONE}</p>
                            <p>Giờ làm việc: 8h00 - 17h00</p>
                        </div>
                        <button className="clinicBooking" onClick={handleOpenBooking} >
                            Đặt lịch
                            <p></p>
                            <FontAwesomeIcon className='clinicBooking-icon' icon={faCalendarPlus} />
                        </button>
                    </div>
                    <div className="clinicReview">
                        <p>Phản hồi của khách hàng</p>
                        {user && (
                            <AddReview clinic={clinic.CLINIC_ID} handleSuccessReview={handleSuccessReview} />
                        )}
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