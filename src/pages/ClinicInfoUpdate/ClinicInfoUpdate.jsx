import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './ClinicInfoUpdate.css';
import avt from '../../static/pictures/avt.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import Input from '../../components/Input/Input';
import { Context } from '../../context/Context';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';

function ClinicInfoUpdate(props) {
    const { user } = useContext(Context);
    const [name, setName] = useState("");
    const [slogan, setSlogan] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [info, setInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const PF = "http://localhost:5000/public/images/";

    useEffect(() => {
        const getInfo = async () => {
            const res = await axios.get("/clinics/" + user[0].CLINIC_ID);
            setInfo(res.data);
        };
        getInfo();
    }, []);

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            await axios.put("/clinics/" + user[0].CLINIC_ID, {
                CLINIC_NAME: name,
                CLINIC_ADDRESS: address,
                CLINIC_PHONE: phone,
                CLINIC_EMAIL: email,
                CLINIC_SLOGAN: slogan
            });
            // window.location.reload();
            console.log("CẬP NHẬT THÀNH CÔNG HỒ SƠ");
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <React.Fragment>
            {isLoading && <Loading />}
            <Header />
            <div className='cliUpdateInfo'>
                <div className="cliUpdateInfoContainer">
                    <img src={user[0].CLINIC_AVT ? PF + user[0].CLINIC_AVT : avt} alt="" />
                    <FontAwesomeIcon className='cliUpdateInfoEditIcon' icon={faPenToSquare} />
                    <h2>{info.CLINIC_NAME}  - {info.CLINIC_SLOGAN}</h2>
                    <form className="cliUpdateInfoField" onSubmit={handleUpdate}>
                        <div className='input'>
                            <p className='input-name'>Tên phòng khám</p>
                            <input onChange={(e) => setName(e.target.value)} defaultValue={info.CLINIC_NAME} type="text" className='input-field' placeholder={info.CLINIC_NAME} />
                        </div>
                        <div className='input'>
                            <p className='input-name'>Số điện thoại</p>
                            <input onChange={(e) => setPhone(e.target.value)} type="text" className='input-field' defaultValue={info.CLINIC_PHONE} placeholder={info.CLINIC_PHONE} />
                        </div>
                        <div className='input'>
                            <p className='input-name'>Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} type="text" className='input-field' defaultValue={info.CLINIC_EMAIL} placeholder={info.CLINIC_EMAIL} />
                        </div>
                        <div className='input'>
                            <p className='input-name'>Địa chỉ</p>
                            <input onChange={(e) => setAddress(e.target.value)} type="text" className='input-field' defaultValue={info.CLINIC_ADDRESS} placeholder={info.CLINIC_ADDRESS} />
                        </div>
                        <div className='input'>
                            <p className='input-name'>Slogan phòng khám khám</p>
                            <input onChange={(e) => setSlogan(e.target.value)} type="text" className='input-field' defaultValue={info.CLINIC_SLOGAN} placeholder={info.CLINIC_SLOGAN} />
                        </div>
                        <button type='submit'>CẬP NHẬT</button>
                    </form>
                </div>
            </div>
            <div className="cliUpdateInfoSpace"></div>
            <Footer />
        </React.Fragment>
    );
}

export default ClinicInfoUpdate;