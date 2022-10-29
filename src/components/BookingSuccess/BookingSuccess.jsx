import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './BookingSuccess.css';

function BookingSuccess(props) {

    const handleHide = () => {
        props.handleHideBookingSuccess(false);
    }

    return (
        <div className='booking-success'>
            <div className="booking-success-container">
                <FontAwesomeIcon className="exit-icon" icon={faXmark} onClick={handleHide} ></FontAwesomeIcon>
                <div className="infoClinic">
                    <h3>{props.clinic.CLINIC_NAME}</h3>
                    <p>Địa chỉ: {props.clinic.CLINIC_ADDRESS}</p>
                </div>
                <FontAwesomeIcon className='booking-success-icon' icon={faCircleCheck} />
                <p className='booking-success-title'>Đặt lịch khám thành công!</p>
                <table className="infoBooking">
                    <tr>
                        <th className='infoBooking-th' >Khách hàng:</th>
                        <td className='infoBooking-td'>{props.customer}</td>
                    </tr>
                    <tr>
                        <th className='infoBooking-th'>Số điện thoại:</th>
                        <td className='infoBooking-td'>{props.phone}</td>
                    </tr>
                    <tr>
                        <th className='infoBooking-th'>Ngày đặt hẹn:</th>
                        <td className='infoBooking-td'>{props.date}</td>
                    </tr>
                    <tr>
                        <th className='infoBooking-th'>Giờ đặt hẹn:</th>
                        <td className='infoBooking-td'>{props.timeSlot}</td>
                    </tr>
                    <tr>
                        <th className='infoBooking-th'>Ghi chú:</th>
                        <td className='infoBooking-td'>{props.note}</td>
                    </tr>
                </table>
                <button className='exit-btn' onClick={handleHide}>THOÁT</button>
            </div>
        </div>
    );
}

export default BookingSuccess;