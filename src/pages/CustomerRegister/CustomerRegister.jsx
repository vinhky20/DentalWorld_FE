import React, { useState } from 'react';
import './CustomerRegister.css';
import Header from '../../components/Header/Header';
import SearchFrame from '../../components/SearchFrame/SearchFrame';
import Footer from '../../components/Footer/Footer';
import Login from '../Login/Login';
import axios from 'axios';
import Success from '../../components/Success/Success';


function CustomerRegister(props) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [male, setMale] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [urn, setUrn] = useState("");
    const [pwd, setPwd] = useState("");
    const [success, setSuccess] = useState(false);


    const handleShowLogin = () => {
        setOpen(!open)
    }

    const handleHideLogin = () => {
        setOpen(false)
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/customers", {
                CUSTOMER_NAME: name,
                CUSTOMER_MALE: male,
                CUSTOMER_ADDRESS: address,
                CUSTOMER_PHONE: phone,
                CUSTOMER_EMAIL: email,
                CUSTOMER_URN: urn,
                CUSTOMER_PWD: pwd,
                C_role: "customer"
            })
            setSuccess(true);
        } catch (err) {
            console.log(err)
        }
    }

    const handleHideSuccess = () => {
        setSuccess(false);
    }

    return (
        <React.Fragment>
            {open && <Login handleHideLogin={handleHideLogin} />}
            {success && <Success title={"Đăng ký thông tin thành công!"} handleHideSuccess={handleHideSuccess} />}
            <div>
                <Header handleShowLogin={handleShowLogin} />
                <SearchFrame />
                <div className='cusRegister'>
                    <form className="cusRegisterContainer" onSubmit={handleRegister}>
                        <h2>ĐĂNG KÝ THÔNG TIN KHÁCH HÀNG</h2>
                        <div className='input'>
                            <p className='input-name'>Họ và tên</p>
                            <input onChange={(e) => setName(e.target.value)} type="text" className='input-field' />
                        </div>
                        <div className='input'>
                            <p className='input-name'>Giới tính</p>
                            <input onChange={(e) => setMale(e.target.value)} type="text" className='input-field' />
                        </div>
                        <div className='input'>
                            <p className='input-name'>Số điện thoại</p>
                            <input onChange={(e) => setPhone(e.target.value)} type="text" className='input-field' />
                        </div>
                        <div className='input'>
                            <p className='input-name'>Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} type="text" className='input-field' />
                        </div>
                        <div className='input'>
                            <p className='input-name'>Địa chỉ</p>
                            <input onChange={(e) => setAddress(e.target.value)} type="text" className='input-field' />
                        </div>
                        <div className='input'>
                            <p className='input-name'>Tên đăng nhập</p>
                            <input onChange={(e) => setUrn(e.target.value)} type="text" className='input-field' />
                        </div>
                        <div className='input'>
                            <p className='input-name'>Mật khẩu</p>
                            <input type='password' onChange={(e) => setPwd(e.target.value)} className='input-field' />
                        </div>
                        <button type='submit'>ĐĂNG KÝ</button>
                    </form>
                </div>
                <Footer />
            </div>
        </React.Fragment>
    );
}

export default CustomerRegister;