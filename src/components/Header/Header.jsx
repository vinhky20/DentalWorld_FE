import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faBook, faBookMedical, faCalendarCheck, faContactBook, faHouse, faInfo, faTeeth, faTooth, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import Login from '../../pages/Login/Login';
import "./Header.css";
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../context/Context';


function Header() {
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const [openLogin, setOpenLogin] = useState(false);
    const { user, dispatch } = useContext(Context);

    const handleHideLogin = () => {
        setOpenLogin(false)
    }

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    }

    // console.log("LOCATION nè: ", path)
    return (
        <React.Fragment>
            {openLogin && <Login handleHideLogin={handleHideLogin} />}
            <div className='header'>
                <div className="headerContainer">
                    <div className='header-title'>
                        <p>
                            <Link className='link' to='/'>
                                thegioinhakhoa
                            </Link>
                        </p>
                        <div className='header-btn'>
                            {
                                user ? (<div>
                                    <Link className='link user-name' to={user && (user[0].C_role == 'customer' ? '/profileCus' : '/profileCli')}>
                                        {user[0].C_role == "customer" ? user[0].CUSTOMER_NAME : user[0].CLINIC_NAME}
                                    </Link>
                                    <button onClick={() => handleLogout()}>
                                        Đăng xuất
                                    </button>
                                </div>

                                ) : (
                                    <div>
                                        <button onClick={() => setOpenLogin(true)}>Đăng nhập</button>
                                        <button onClick={() => setOpenLogin(true)}>Đăng ký</button>
                                        {/* <button>
                                            <Link className='link' to='/register'>Đăng ký</Link>
                                        </button> */}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className='header-navbar'>
                        <Link to='/' className={path == "" ? "active headerLink" : "headerLink"}>
                            <FontAwesomeIcon className='headerLinkIcon' icon={faHouse} />
                            <p>
                                Trang chủ
                            </p>
                        </Link>
                        <Link to='/service' className={path == "service" ? "active headerLink" : "headerLink"}>
                            <FontAwesomeIcon className='headerLinkIcon' icon={faTooth} />
                            <p>
                                Dịch vụ
                            </p>
                        </Link>
                        {user &&
                            (
                                <Link to={user[0].C_role == 'customer' ? '/profileCus' : '/profileCli'} className={(path == "profileCus" || path == "profileCli") ? "active headerLink" : "headerLink"}>
                                    <FontAwesomeIcon className='headerLinkIcon' icon={faUser} />
                                    <p>
                                        Hồ sơ
                                    </p>
                                </Link>
                            )
                        }
                        {(user && user[0].C_role == "customer") && (
                            <Link to='/bookingHistory' className={path == "bookingHistory" ? "active headerLink" : "headerLink"}>
                                <FontAwesomeIcon className='headerLinkIcon' icon={faBookMedical} />
                                <p>
                                    Lịch sử khám bệnh
                                </p>
                            </Link>
                        )}
                        {(user && user[0].C_role == "clinic") && (
                            <Link to={`/bookings/clinic/${user[0].CLINIC_ID}`} className={path == "bookingInformation" ? "active headerLink" : "headerLink"}>
                                <FontAwesomeIcon className='headerLinkIcon' icon={faCalendar} />
                                <p>
                                    Thông tin đặt lịch
                                </p>
                            </Link>
                        )}
                        <Link to='/' className={path == "contact" ? "active headerLink" : "headerLink"}>
                            <FontAwesomeIcon className='headerLinkIcon' icon={faInfo} />
                            <p>
                                Liên hệ
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}

export default Header;