import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
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

    const handleUpdateStatus = async (id) => {

        try {
            await axios.put("/bookings/" + id, {
                BOOKING_STATUS: 1
            });
            window.location.reload();
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <React.Fragment>
            <Header />
            <div className='bookingInfo'>
                <table className='bookingInfoTable'>
                    <tr className='tableHead'>
                        <th className='bookingInfoTable-th'>Tên khách hàng/Mã khách hàng</th>
                        <th className='bookingInfoTable-th'>Điện thoại</th>
                        <th className='bookingInfoTable-th'>Ngày đặt</th>
                        <th className='bookingInfoTable-th'>Khung giờ</th>
                        <th className='bookingInfoTable-th'>Dịch vụ</th>
                        <th className='bookingInfoTable-th'>Trạng thái</th>
                        <th className='bookingInfoTable-th'>Cập nhật trạng thái</th>
                    </tr>
                    {bookingInfo?.map((b) => (
                        <tr>
                            <td className='bookingInfoTable-td'>{b.BOOKING_CUSTOMER_NAME || "Vĩnh Kỳ"}</td>
                            <td className='bookingInfoTable-td'>{b.BOOKING_CONTACT_PHONE}</td>
                            <td className='bookingInfoTable-td'>{b.BOOKING_DATE}</td>
                            <td className='bookingInfoTable-td'>{b.BOOKING_TIMESLOT}</td>
                            <td className='bookingInfoTable-td'>{b.BOOKING_SERVICE}</td>
                            <td className='bookingInfoTable-td'>{b.BOOKING_STATUS == 0 ? "Chưa khám" : "Đã khám"}</td>
                            <td className='bookingInfoTable-td'>
                                <button className='btnUpdate' onClick={() => handleUpdateStatus(b.BOOKING_ID)}>
                                    <FontAwesomeIcon className='iconUpdate' icon={faPenToSquare}></FontAwesomeIcon>
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
            <div className="BookingInfoSpace"></div>
        </React.Fragment >

    );
}

export default BookingInfo;