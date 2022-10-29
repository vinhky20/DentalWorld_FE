import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Clinic from '../../components/Clinic/Clinic';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import SearchFrame from '../../components/SearchFrame/SearchFrame';
import { Context } from '../../context/Context';
import nhakhoa from "../../static/pictures/nhakhoa.jpg";
import Login from '../Login/Login';
import "./Home.css"

function Home(props) {
    const { user } = useContext(Context);
    const [clinics, setClinics] = useState([])

    useEffect(() => {
        const getClinics = async () => {
            const res = await axios.get("/clinics");
            setClinics(res.data);
        };
        getClinics();
    }, []);

    // console.log("CLINIC NÈ: ", clinics)

    return (
        <React.Fragment>
            <div>
                <Header />
                <SearchFrame />
                <div className='home'>
                    <img className='home-banner' src={nhakhoa} alt="NHA KHOA" />
                    <div className='home-clinic'>
                        <h2>DANH SÁCH PHÒNG KHÁM</h2>
                        <div className='home-clinicList'>
                            {clinics?.map((p) => (
                                <Clinic clinic={p} key={p.CLINIC_ID} />
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </React.Fragment>
    );
}

export default Home;