import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import './Clinic.css';
import avt from '../../static/pictures/avt.jpg';
import Booking from '../Booking/Booking';
import { Context } from '../../context/Context';
import Login from '../../pages/Login/Login';
import { Link } from 'react-router-dom';
import Notice from '../Notice/Notice';

function Clinic({ clinic }) {
    const [openBooking, setOpenBooking] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openNotice, setOpenNotice] = useState(false);

    const { user } = useContext(Context);

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
            {openNotice && <Notice handleHideNotice={handleHideNotice} />}
            {openLogin && <Login handleHideLogin={handleHideLogin} />}
            {openBooking && <Booking clinic={clinic} user={user} handleHideBooking={handleHideBooking} />}
            <div className='clinic'>
                <div className="clinic-container">
                    <Link className='clinic-info link' to={`/clinics/${clinic.CLINIC_ID}`}>
                        <div className="clinic-info-avt">
                            <img src={avt} alt="avt" />
                        </div>
                        <div className="clinic-info-detail">
                            <div className='clinic-info-name'>
                                <p>{clinic.CLINIC_NAME}</p>
                            </div>
                            <div className='clinic-info-address'>
                                <FontAwesomeIcon icon={faLocationDot} />
                                <p>{clinic.CLINIC_ADDRESS}</p>

                            </div>
                            <div className="clinic-info-phone">
                                <FontAwesomeIcon icon={faPhone} />
                                <p>{clinic.CLINIC_PHONE}</p>
                            </div>
                        </div>
                    </Link>
                    <button className='clinic-booking-btn' onClick={handleOpenBooking}>
                        Đặt lịch
                        <p></p>
                        <FontAwesomeIcon icon={faCalendarPlus} />
                    </button>
                </div>
            </div>
        </React.Fragment>

    );
}

export default Clinic;