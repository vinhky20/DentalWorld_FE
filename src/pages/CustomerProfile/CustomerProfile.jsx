import React, { useContext, useState } from 'react';
import './CustomerProfile.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';
import CustomerAvt from '../../components/CustomerAvt/CustomerAvt';
import avt from '../../static/pictures/avt.jpg';


function CustomerProfile(props) {
    const { user } = useContext(Context);
    const [openAvt, setOpenAvt] = useState(false);
    const PF = "http://localhost:5000/public/images/";

    const handleHideAvt = () => {
        setOpenAvt(false)
    }

    return (
        <React.Fragment>
            {openAvt && <CustomerAvt handleHideAvt={handleHideAvt} />}
            <Header />
            <div className='cusProfile'>
                <div className="cusProfileContainer">
                    <img src={user[0].CUSTOMER_AVT ? PF + user[0].CUSTOMER_AVT : avt} alt="" onClick={() => setOpenAvt(true)} />
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