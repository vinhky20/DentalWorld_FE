import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { Context } from '../../context/Context';
import './BookingInfo.css';

function BookingInfo(props) {
    const { user } = useContext(Context);
    const [bookingInfo, setBookingInfo] = useState([])
    const [updateStatus, setUpdateStatus] = useState(false);
    const [bookingStatus, setBookingStatus] = useState(null);
    const [bookingId, setBookingId] = useState(null);

    useEffect(() => {
        const getBookingInfo = async () => {
            const res = await axios.get("/bookings/clinic/" + user[0].CLINIC_ID);
            setBookingInfo(res.data);
        };
        getBookingInfo();
    }, [])

    const handleUpdateStatus = async (e) => {
        e.preventDefault();
        var bookingId = document.getElementById("bookingId");
        var bookingStatus = document.etElementById("bookingStatus");
        var updateStatus;

        if (bookingStatus == 0) {
            updateStatus = 1;
        } else if (bookingStatus == 1) {
            updateStatus = 0
        }

        try {
            // await axios.put("/bookings/" + bookingId, {
            //     BOOKING_STATUS: updateStatus
            // });
            console.log("ĐÂY NÈ VĨNH: ", bookingId, updateStatus)
        } catch (error) {

        }
    }

    return (
        <React.Fragment>
            <Header />
            <div className='bookingInfo'>
                <table className='bookingInfoTable'>
                    <tr className='tableHead'>
                        <th>STT</th>
                        <th>Tên khách hàng</th>
                        <th>Điện thoại</th>
                        <th>Ngày đặt</th>
                        <th>Khung giờ</th>
                        <th>Dịch vụ</th>
                        <th>Trạng thái</th>
                        <th>Cập nhật trạng thái</th>
                    </tr>
                    {bookingInfo?.map((b) => (
                        <tr>
                            <td>{b.BOOKING_ID}</td>
                            <td>{b.CUSTOMER_NAME}</td>
                            <td>{b.BOOKING_CONTACT_PHONE}</td>
                            <td>{b.BOOKING_DATE}</td>
                            <td>{b.TIMESLOT_NAME}</td>
                            <td>{b.BOOKING_SERVICE}</td>
                            <td>{b.BOOKING_STATUS == 0 ? "Chưa khám" : "Đã khám"}</td>
                            <td>{
                                updateStatus ? (
                                    <form className="updateStatus" onSubmit={handleUpdateStatus}>
                                        <input type="text" id='bookingId' value={b.BOOKING_ID} hidden />
                                        <input type="text" id='bookingStatus' value={b.BOOKING_STATUS} hidden />
                                        <button className='updateStatus-btn' type='submit'>{b.BOOKING_STATUS == 0 ? "Đã khám" : "Chưa khám"}</button>
                                    </form>
                                ) : <FontAwesomeIcon onClick={() => setUpdateStatus(true)} className='iconUpdate' icon={faPenToSquare}></FontAwesomeIcon>
                            }
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
            <div className="BookingInfoSpace"></div>
            <Footer />
        </React.Fragment >

    );
}

export default BookingInfo;