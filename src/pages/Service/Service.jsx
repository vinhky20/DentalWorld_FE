import React, { useContext, useEffect } from 'react';
import './Service.css';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Context } from '../../context/Context';
import axios from 'axios';

function Service(props) {
    const { user } = useContext(Context);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const getServices = async () => {
            const res = await axios.get("/services");
            setServices(res.data);
        };
        getServices();
    }, []);


    return (
        <React.Fragment>
            <Header />
            <div className='service'>
                <div className="serviceContainer">
                    <h2>THÔNG TIN CÁC DỊCH VỤ</h2>
                    {services?.map((service) => (
                        <div className="serviceInfo">
                            <h3>{service.SERVICE_NAME}</h3>
                            <p className='serviceDesc'>{service.SERVICE_DESCRIPTION}</p>
                            <p className='serviceTime'>{service.SERVICE_TIMETODO}</p>
                            <p className='servicePrice'>{service.SERVICE_PRICE}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='serviceSpace'></div>
            <Footer />
        </React.Fragment>
    );
}

export default Service;