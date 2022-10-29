import React, { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useContext, useRef } from 'react';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';

function Login({ handleHideLogin }) {
    const userRef = useRef();
    const passwordRef = useRef();
    const [loginRole, setLoginRole] = useState('customer');

    console.log("LOGIN ROLE: ", loginRole)

    const handleHide = () => {
        handleHideLogin(false)
    }

    const { dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            if (loginRole === 'customer') {
                const res = await axios.post("/login/customer", {
                    CUSTOMER_URN: userRef.current.value,
                    CUSTOMER_PWD: passwordRef.current.value
                })
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                handleHide();
            } else if (loginRole === 'clinic') {
                const res = await axios.post("/login/clinic", {
                    CLINIC_URN: userRef.current.value,
                    CLINIC_PWD: passwordRef.current.value
                })
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                handleHide();
            }

        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });

        }
    };

    return (
        <div className='login'>
            <form className="login-container" onSubmit={handleSubmit}>
                <FontAwesomeIcon onClick={() => handleHide(false)} className='login-off' icon={faXmark} />
                <h2>
                    <p className={loginRole == "customer" ? "loginActive" : "loginNonActive"} onClick={() => setLoginRole('customer')}>KHÁCH HÀNG</p>
                    |
                    <p className={loginRole == "clinic" ? "loginActive" : "loginNonActive"} onClick={() => setLoginRole('clinic')}>PHÒNG KHÁM</p>
                </h2>
                <p className='loginMessage'>{loginRole == 'customer' ? "Bạn đang đăng nhập với tư cách khách hàng." : "Bạn đang đăng nhập với tư cách phòng khám."}</p>
                <div className="login-form">
                    <input ref={userRef} type="text" className="login-input-urn" />
                    <input ref={passwordRef} type="password" className="login-input-pwd" />
                </div>
                <button type='submit' className="login-btn">ĐĂNG NHẬP</button>
                <p>Chưa có tài khoản? <Link to={loginRole == 'customer' ? '/cusRegister' : '/cliRegister'}>Đăng ký</Link></p>
            </form>
        </div >
    );
}

export default Login;