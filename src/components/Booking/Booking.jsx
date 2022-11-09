import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookingSuccess from '../BookingSuccess/BookingSuccess';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import './Booking.css';

function Booking({ clinic, user, handleHideBooking }) {
    const [openBookingStatus, setOpenBookingStatus] = useState(false);
    const [bookedTimeSlots, setBookedTimeSlots] = useState([]);
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [customer, setCustomer] = useState("");
    const [phone, setPhone] = useState("");
    const [note, setNote] = useState("");
    const [service, setService] = useState("");

    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false);


    const handleHide = () => {
        handleHideBooking(false);
    }

    const handleHideBookingSuccess = () => {
        setOpenBookingStatus(false);
        handleHideBooking();
    }

    // const handleCheck = () => {
    //     var checkbox = document.getElementsByName('service');
    //     var result = [];

    //     // Lặp qua từng checkbox để lấy giá trị
    //     for (var i = 0; i < checkbox.length; i++) {
    //         if (checkbox[i].checked) {
    //             result.push(checkbox[i].value);
    //         }

    //     }
    //     console.log("CÁC DỊCH VỤ ĐÃ CHECK: ", result);
    //     console.log("MẢNG NÈ: ", array)
    // }


    // console.log("DANH SÁCH CÁC KHUNG GIỜ ĐÃ ĐƯỢC ĐẶT: ", bookedTimeSlots[0].booking_timeslot)

    const handleChangeDate = async (value) => {
        setDate(value);
        try {
            const res = await axios.get("/clinicSchedule/bookedTimeSlot/" + clinic.CLINIC_ID + "/" + value);
            setBookedTimeSlots(res.data);
        } catch (err) {
            console.log(err)
            setIsError(true);
        }

        // console.log("CLINIC", clinic.CLINIC_ID + " VÀ DATE: " + date)
    }

    const handleHideError = () => {
        setIsError(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        var checkbox = document.getElementsByName('service');
        var result = "";
        var kkkk = ""

        // Lặp qua từng checkbox để lấy giá trị
        for (var i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                result += checkbox[i].value + ', ';
                kkkk = result.substring(0, result.length - 2);
            }

        }


        var bookedTimeSlot = ""

        if (timeSlot == "Khung giờ đã được đặt trước.") {
            setIsError(true)
        } else if (timeSlot == "8h00") {
            bookedTimeSlot = "T1";
        }
        else if (timeSlot == "8h30") {
            bookedTimeSlot = "T2";
        }
        else if (timeSlot == "9h00") {
            bookedTimeSlot = "T3";
        } else if (timeSlot == "9h30") {
            bookedTimeSlot = "T4";
        } else if (timeSlot == "10h00") {
            bookedTimeSlot = "T5";
        } else if (timeSlot == "10h30") {
            bookedTimeSlot = "T6";
        } else if (timeSlot == "11h00") {
            bookedTimeSlot = "T7";
        } else if (timeSlot == "13h00") {
            bookedTimeSlot = "T8";
        } else if (timeSlot == "13h30") {
            bookedTimeSlot = "T9";
        } else if (timeSlot == "14h00") {
            bookedTimeSlot = "T10";
        } else if (timeSlot == "14h30") {
            bookedTimeSlot = "T11";
        } else if (timeSlot == "15h00") {
            bookedTimeSlot = "T12";
        } else if (timeSlot == "15h30") {
            bookedTimeSlot = "T13";
        } else if (timeSlot == "16h00") {
            bookedTimeSlot = "T14";
        } else if (timeSlot == "16h30") {
            bookedTimeSlot = "T15";
        } else if (timeSlot == "17h00") {
            bookedTimeSlot = "T16";
        }


        // console.log("Dữ liệu đặt lịch: ");
        // console.log("Nha khoa: ", clinic.CLINIC_ID);
        // console.log("Khách hàng: ", user[0].CUSTOMER_ID);
        // console.log("Dịch vụ: ", kkkk);
        // console.log("Ngày khám: ", date);
        // console.log("Giờ khám: ", bookedTimeSlot);
        // console.log("Sđt: ", phone);
        // console.log("ghi chú: ", note);

        try {
            const res = await axios.post("/bookings/", {
                BOOKING_NOTE: note,
                BOOKING_CONTACT_PHONE: phone,
                BOOKING_TIMESLOT: bookedTimeSlot,
                BOOKING_DATE: date,
                BOOKING_SERVICE: result,
                BOOKING_CUSTOMER: user[0].CUSTOMER_ID,
                BOOKING_STATUS: 0,
                BOOKING_CLINIC: clinic.CLINIC_ID,
                BOOKING_EMAIL: user[0].CUSTOMER_EMAIL
            });
            const res2 = await axios.post("/bookings/sendMail", {
                BOOKING_DATE: date,
                BOOKING_NOTE: note,
                BOOKING_EMAIL: user[0].CUSTOMER_EMAIL,
                BOOKING_CUSTOMER_NAME: user[0].CUSTOMER_NAME,
                BOOKING_CLINIC_NAME: clinic.CLINIC_NAME,
                BOOKING_TIMESLOT_NAME: timeSlot,
                BOOKING_CLINIC_ADDRESS: clinic.CLINIC_ADDRESS,
                BOOKING_CUSTOMER_MALE: user[0].CUSTOMER_MALE,
                BOOKING_SERVICE: result
            })
            setIsLoading(false)
            setOpenBookingStatus(true);
        } catch (err) {
            console.log(err);
            setIsError(true);

        }


    }

    return (
        <React.Fragment>
            {isLoading && <Loading />}
            {isError && <Error handleHideError={handleHideError} title={"Có thể bạn đã bỏ trống thông tin cần thiết hoặc chọn nhầm khung giờ đã được đặt trước, vui lòng nhập lại nhé!"} />}
            {openBookingStatus && <BookingSuccess clinic={clinic} date={date} timeSlot={timeSlot} phone={phone} note={note} customer={user[0].CUSTOMER_NAME} title={"Đặt lịch khám thành công"} handleHideBookingSuccess={handleHideBookingSuccess} />}
            <div className='booking'>
                <div className="booking-container">
                    <FontAwesomeIcon className='booking-off-icon' icon={faXmark} onClick={handleHide} />
                    <h2>ĐẶT LỊCH KHÁM</h2>
                    <form className="booking-form" onSubmit={handleSubmit}>
                        <div className="booking-form-all">
                            <div className="booking-form-left">
                                <div className="booking-form-group">
                                    <label className='booking-form-label' htmlFor="clinic-name">Nha khoa</label>
                                    <input className='booking-form-input' type="text" value={`Nha khoa ${clinic.CLINIC_NAME}`} />
                                </div>
                                <div className="booking-form-group">
                                    <label className='booking-form-label' htmlFor="">Khách hàng</label>
                                    <input className='booking-form-input' type="text" value={user ? (user[0].CUSTOMER_NAME) : "Vui lòng đăng nhập trước khi đặt lịch."} onChange={(e) => setCustomer(e.target.value)} />
                                </div>
                                <div className="booking-form-group">
                                    <label className='booking-form-label' htmlFor="">Dịch vụ khám</label>
                                    <div className="booking-form-service">
                                        <div className="booking-form-service-left">
                                            <div className="booking-form-checkbox">
                                                <input className='checkbox' type="checkbox" name='service' value="Nhổ răng" id="" />
                                                <label htmlFor="Nhổ răng">Nhổ răng</label>
                                            </div>
                                            <div className="booking-form-checkbox">
                                                <input className='checkbox' type="checkbox" name='service' value="Niềng răng" id="" />
                                                <label htmlFor="Niềng răng">Niềng răng</label>
                                            </div>
                                            <div className="booking-form-checkbox">
                                                <input className='checkbox' type="checkbox" name='service' value="Trám răng" id="" />
                                                <label htmlFor="Trám răng">Trám răng</label>
                                            </div>
                                        </div>
                                        <div className="booking-form-service-right">
                                            <div className="booking-form-checkbox">
                                                <input className='checkbox' type="checkbox" name='service' value="Chữa tuỷ răng" id="" />
                                                <label htmlFor="Chữa tuỷ răng">Chữa tuỷ răng</label>
                                            </div>
                                            <div className="booking-form-checkbox">
                                                <input className='checkbox' type="checkbox" name='service' value="Rạch áp xe răng" id="" />
                                                <label htmlFor="Rạch áp xe răng">Rạch áp xe răng</label>
                                            </div>
                                            <div className="booking-form-checkbox">
                                                <input className='checkbox' type="checkbox" name='service' value="Tẩy trắng răng" id="" />
                                                <label htmlFor="Tẩy trắng răng">Tẩy trắng răng</label>
                                            </div>
                                        </div>
                                        <div className="booking-form-service-right">
                                            <div className="booking-form-checkbox">
                                                <input className='checkbox' type="checkbox" name='service' value="Cạo vôi răng" id="" />
                                                <label htmlFor="Cạo vôi răng">Cạo vôi răng</label>
                                            </div>
                                            <div className="booking-form-checkbox">
                                                <input className='checkbox' type="checkbox" name='service' value="Nhổ răng sữa" id="" />
                                                <label htmlFor="Nhổ răng sữa">Nhổ răng sữa</label>
                                            </div>
                                            <div className="booking-form-checkbox">
                                                <input className='checkbox' type="checkbox" name='service' value="Trồng răng sứ" id="" />
                                                <label htmlFor="Trồng răng sứ">Trồng răng sứ</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="booking-form-group">
                                    <label className='booking-form-label' htmlFor="">Ngày khám</label>
                                    <input required className='booking-form-input' type="date" name="" id="" onChange={e => handleChangeDate(e.target.value)} />
                                </div>
                            </div>
                            <div className="booking-form-right">
                                <div className="booking-form-group">
                                    <label className='booking-form-label' htmlFor="">Giờ khám (Lưu ý: khung giờ được tô màu không còn trống)</label>
                                    <input required className='booking-form-input' type="text" name="" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} />
                                </div>
                                <div className="booking-form-group-btn">
                                    <input
                                        className={(bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T1") != -1) ? "booking-form-input-btn timeslot-active" : "booking-form-input-btn"}
                                        type="button"
                                        onClick={(e) => (bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T1") != -1) ? setTimeSlot("Khung giờ đã được đặt trước.") : setTimeSlot(e.target.value)}
                                        value="8h00" />
                                    <input
                                        className={(bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T2") != -1) ? "booking-form-input-btn timeslot-active" : "booking-form-input-btn"}
                                        type="button"
                                        onClick={(e) => (bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T2") != -1) ? setTimeSlot("Khung giờ đã được đặt trước.") : setTimeSlot(e.target.value)}
                                        value="8h30" />
                                    <input
                                        className={(bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T3") != -1) ? "booking-form-input-btn timeslot-active" : "booking-form-input-btn"}
                                        type="button"
                                        onClick={(e) => (bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T3") != -1) ? setTimeSlot("Khung giờ đã được đặt trước.") : setTimeSlot(e.target.value)}
                                        value="9h00" />
                                    <input
                                        className={(bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T4") != -1) ? "booking-form-input-btn timeslot-active" : "booking-form-input-btn"}
                                        type="button"
                                        onClick={(e) => (bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T4") != -1) ? setTimeSlot("Khung giờ đã được đặt trước.") : setTimeSlot(e.target.value)}
                                        value="9h30" />
                                    <input
                                        className={(bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T5") != -1) ? "booking-form-input-btn timeslot-active" : "booking-form-input-btn"}
                                        type="button"
                                        onClick={(e) => (bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T5") != -1) ? setTimeSlot("Khung giờ đã được đặt trước.") : setTimeSlot(e.target.value)}

                                        value="10h00" />
                                    <input
                                        className={(bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T6") != -1) ? "booking-form-input-btn timeslot-active" : "booking-form-input-btn"}
                                        type="button"
                                        onClick={(e) => (bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T6") != -1) ? setTimeSlot("Khung giờ đã được đặt trước.") : setTimeSlot(e.target.value)}

                                        value="10h30" />
                                    <input
                                        className={(bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T7") != -1) ? "booking-form-input-btn timeslot-active" : "booking-form-input-btn"}
                                        type="button"
                                        onClick={(e) => (bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T7") != -1) ? setTimeSlot("Khung giờ đã được đặt trước.") : setTimeSlot(e.target.value)}

                                        value="11h00" />
                                    <input
                                        className={(bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T8") != -1) ? "booking-form-input-btn timeslot-active" : "booking-form-input-btn"}
                                        type="button"
                                        onClick={(e) => (bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T8") != -1) ? setTimeSlot("Khung giờ đã được đặt trước.") : setTimeSlot(e.target.value)}

                                        value="13h00" />
                                    <input
                                        className={(bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T9") != -1) ? "booking-form-input-btn timeslot-active" : "booking-form-input-btn"}
                                        type="button"
                                        onClick={(e) => (bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T9") != -1) ? setTimeSlot("Khung giờ đã được đặt trước.") : setTimeSlot(e.target.value)}

                                        value="13h30" />
                                    <input
                                        className={(bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T10") != -1) ? "booking-form-input-btn timeslot-active" : "booking-form-input-btn"}
                                        type="button"
                                        onClick={(e) => (bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T10") != -1) ? setTimeSlot("Khung giờ đã được đặt trước.") : setTimeSlot(e.target.value)}

                                        value="14h00" />
                                    <input
                                        className={(bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T11") != -1) ? "booking-form-input-btn timeslot-active" : "booking-form-input-btn"}
                                        type="button"
                                        onClick={(e) => (bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T11") != -1) ? setTimeSlot("Khung giờ đã được đặt trước.") : setTimeSlot(e.target.value)}

                                        value="14h30" />
                                    <input
                                        className={(bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T12") != -1) ? "booking-form-input-btn timeslot-active" : "booking-form-input-btn"}
                                        type="button"
                                        onClick={(e) => (bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T12") != -1) ? setTimeSlot("Khung giờ đã được đặt trước.") : setTimeSlot(e.target.value)}

                                        value="15h00" />
                                    <input
                                        className={(bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T13") != -1) ? "booking-form-input-btn timeslot-active" : "booking-form-input-btn"}
                                        type="button"
                                        onClick={(e) => (bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T13") != -1) ? setTimeSlot("Khung giờ đã được đặt trước.") : setTimeSlot(e.target.value)}

                                        value="15h30" />
                                    <input
                                        className={(bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T14") != -1) ? "booking-form-input-btn timeslot-active" : "booking-form-input-btn"}
                                        type="button"
                                        onClick={(e) => (bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T14") != -1) ? setTimeSlot("Khung giờ đã được đặt trước.") : setTimeSlot(e.target.value)}

                                        value="16h00" />
                                    <input
                                        className={(bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T15") != -1) ? "booking-form-input-btn timeslot-active" : "booking-form-input-btn"}
                                        type="button"
                                        onClick={(e) => (bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T15") != -1) ? setTimeSlot("Khung giờ đã được đặt trước.") : setTimeSlot(e.target.value)}
                                        value="16h30" />
                                    <input
                                        className={(bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T16") != -1) ? "booking-form-input-btn timeslot-active" : "booking-form-input-btn"}
                                        type="button"
                                        onClick={(e) => (bookedTimeSlots.findIndex(timeslot => timeslot.booking_timeslot == "T16") != -1) ? setTimeSlot("Khung giờ đã được đặt trước.") : setTimeSlot(e.target.value)}

                                        value="17h00" />
                                </div>
                                <div className="booking-form-group">
                                    <label className='booking-form-label' htmlFor="">Số điện thoại liên hệ</label>
                                    <input className='booking-form-input' type="text" required onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="booking-form-group">
                                    <label className='booking-form-label' htmlFor="">Ghi chú</label>
                                    <input className='booking-form-input' type="text" onChange={(e) => setNote(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <button type='submit' className="booking-form-btn">
                            Đặt lịch
                        </button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Booking;