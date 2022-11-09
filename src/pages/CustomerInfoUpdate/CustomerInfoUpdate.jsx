import React, { useContext, useEffect, useState } from 'react';
import './CustomerInfoUpdate.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import avt from '../../static/pictures/avt.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import Input from '../../components/Input/Input';
import { Context } from '../../context/Context';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';


function CustomerInfoUpdate(props) {
    const { user } = useContext(Context);
    const [name, setName] = useState("");
    const [male, setMale] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [info, setInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const PF = "http://localhost:5000/public/images/";


    useEffect(() => {
        const getInfo = async () => {
            const res = await axios.get("/customers/" + user[0].CUSTOMER_ID);
            setInfo(res.data);
        };
        getInfo();
    }, []);


    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            await axios.put("/customers/" + user[0].CUSTOMER_ID, {
                CUSTOMER_NAME: name,
                CUSTOMER_MALE: male,
                CUSTOMER_ADDRESS: address,
                CUSTOMER_PHONE: phone,
                CUSTOMER_EMAIL: email
            });
            // window.location.reload();
            console.log("CẬP NHẬT THÀNH CÔNG HỒ SƠ");
            setIsLoading(false);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <React.Fragment>
            {isLoading && <Loading />}
            <Header />
            <div className='cusUpdateInfo'>
                <div className="cusUpdateInfoContainer">
                    <img src={info.CUSTOMER_AVT ? PF + info.CUSTOMER_AVT : avt} alt="" />
                    <FontAwesomeIcon className='cusUpdateInfoEditIcon' icon={faPenToSquare} />
                    <h2>VĨNH KỲ</h2>
                    <form className="cusUpdateInfoField" onSubmit={handleUpdate}>
                        <div className='input'>
                            <p className='input-name'>Họ và tên</p>
                            <input onChange={(e) => setName(e.target.value)} defaultValue={info.CUSTOMER_NAME} type="text" className='input-field' placeholder={info.CUSTOMER_NAME} />
                        </div>
                        <div className='input'>
                            <p className='input-name'>Giới tính</p>
                            <input onChange={(e) => setMale(e.target.value)} type="text" className='input-field' defaultValue={info.CUSTOMER_MALE} placeholder={info.CUSTOMER_MALE} />
                        </div>
                        <div className='input'>
                            <p className='input-name'>Số điện thoại</p>
                            <input onChange={(e) => setPhone(e.target.value)} type="text" className='input-field' defaultValue={info.CUSTOMER_PHONE} placeholder={info.CUSTOMER_PHONE} />
                        </div>
                        <div className='input'>
                            <p className='input-name'>Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} type="text" className='input-field' defaultValue={info.CUSTOMER_EMAIL} placeholder={info.CUSTOMER_EMAIL} />
                        </div>
                        <div className='input'>
                            <p className='input-name'>Địa chỉ</p>
                            <input onChange={(e) => setAddress(e.target.value)} type="text" className='input-field' defaultValue={info.CUSTOMER_ADDRESS} placeholder={info.CUSTOMER_ADDRESS} />
                        </div>
                        <button type='submit'>CẬP NHẬT</button>
                    </form>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default CustomerInfoUpdate;