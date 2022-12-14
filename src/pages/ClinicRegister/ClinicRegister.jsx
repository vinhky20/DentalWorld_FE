import React, { useContext, useState } from 'react';
import './ClinicRegister.css';
import Header from '../../components/Header/Header';
import SearchFrame from '../../components/SearchFrame/SearchFrame';
import Footer from '../../components/Footer/Footer';
import Login from '../Login/Login';
import Success from '../../components/Success/Success';
import axios from 'axios';
import { Context } from '../../context/Context';

function ClinicRegister(props) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [slogan, setSlogan] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [urn, setUrn] = useState("");
    const [pwd, setPwd] = useState("");
    const [success, setSuccess] = useState(false);
    const [file, setFile] = useState(null);
    const { dispatch, isFetching } = useContext(Context);


    const handleShowLogin = () => {
        setOpen(!open)
    }

    const handleHideLogin = () => {
        setOpen(false)
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        const newClinic = {
            CLINIC_NAME: name,
            CLINIC_SLOGAN: slogan,
            CLINIC_ADDRESS: address,
            CLINIC_PHONE: phone,
            CLINIC_EMAIL: email,
            CLINIC_URN: urn,
            CLINIC_PWD: pwd,
            C_role: "clinic"
        }

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newClinic.CLINIC_PHOTO = filename;

            try {
                await axios.post("/clinics/upload", data)
            } catch (err) {
                console.log(err);
            }
        }

        try {
            const res = await axios.post("/clinics", newClinic)
            setSuccess(true);
            dispatch({ type: "LOGIN_START" });
            try {

                const res = await axios.post("/login/clinic", {
                    CLINIC_URN: urn,
                    CLINIC_PWD: pwd
                })
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            } catch (error) {
                dispatch({ type: "LOGIN_FAILURE" });
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleHideSuccess = () => {
        setSuccess(false);
        window.location.reload();
    }

    return (
        <React.Fragment>
            {open && <Login handleHideLogin={handleHideLogin} />}
            {success && <Success title={"Đăng ký thông tin thành công!"} handleHideSuccess={handleHideSuccess} />}
            <div>
                <Header handleShowLogin={handleShowLogin} />
                <SearchFrame />
                <div className='cliRegister'>
                    <form className="cliRegisterContainer" onSubmit={handleRegister}>
                        <h2>ĐĂNG KÝ THÔNG TIN PHÒNG KHÁM</h2>
                        <div className='input'>
                            <p className='input-name'>Tên phòng khám</p>
                            <input onChange={(e) => setName(e.target.value)} type="text" className='input-field' />
                        </div>
                        <div className='input'>
                            <p className='input-name'>Địa chỉ</p>
                            <input onChange={(e) => setAddress(e.target.value)} type="text" className='input-field' />
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
                            <p className='input-name'>Slogan phòng khám</p>
                            <input onChange={(e) => setSlogan(e.target.value)} type="text" className='input-field' />
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

export default ClinicRegister;