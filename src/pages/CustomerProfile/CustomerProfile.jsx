import React, { useContext, useState } from 'react';
import './CustomerProfile.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import avt1 from '../../static/pictures/avt1.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';

function CustomerProfile(props) {
    const { user } = useContext(Context);

    return (
        <React.Fragment>
            <Header />
            <div className='cusProfile'>
                <div className="cusProfileContainer">
                    <img src={avt1} alt="" />
                    <Link className='link' to="/updateCusProfile">
                        <FontAwesomeIcon className='cusProfileEditIcon' icon={faPenToSquare} />
                    </Link>
                    <h2>{user[0].CUSTOMER_NAME}</h2>
                    <div className="cusProfileInfo">
                        <p>Họ và tên: {user[0].CUSTOMER_NAME}</p>
                        <p>Giới tính: {user[0].CUSTOMER_MALE}</p>
                        <p>Số điện thoại: {user[0].CUSTOMER_PHONE}</p>
                        <p>Email: {user[0].CUSTOMER_EMAIL}</p>
                        <p>Địa chỉ: {user[0].CUSTOMER_ADDRESS}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default CustomerProfile;