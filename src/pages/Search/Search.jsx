import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import SearchFrame from '../../components/SearchFrame/SearchFrame';
import "./Search.css";
import Login from '../Login/Login';
import Clinic from '../../components/Clinic/Clinic';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Search(props) {
    const location = useLocation();
    const keyword = location.pathname.split("/")[2];
    const [clinics, setClinics] = useState([]);

    const [open, setOpen] = useState(false);

    const handleShowLogin = () => {
        setOpen(!open)
    }

    const handleHideLogin = () => {
        setOpen(false)
    }

    useEffect(() => {
        const getClinicsSearch = async () => {
            const res = await axios.get("/clinics/search/" + keyword);
            setClinics(res.data);
        };
        getClinicsSearch();
    }, []);


    return (
        <React.Fragment>
            {open && <Login handleHideLogin={handleHideLogin} />}
            <div>
                <Header handleShowLogin={handleShowLogin} />
                <SearchFrame />
                <div className='search'>
                    <div className="searchContainer">
                        <h3>KẾT QUẢ TÌM KIẾM</h3>
                        {clinics?.map((p) => (
                            <Clinic clinic={p} key={p.CLINIC_ID} />
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        </React.Fragment>

    );
}


export default Search;