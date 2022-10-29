import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Header from '../../components/Header/Header';
import { Context } from '../../context/Context';
import './History.css';

function History(props) {
    const { user } = useContext(Context);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const getHistory = async () => {
            const res = await axios.get("/bookings/customer/" + user[0].CUSTOMER_ID);
            setHistory(res.data);
        };
        getHistory();
    }, [])

    return (
        <React.Fragment>
            <Header />
            <div className='history'>
                <table className='historyTable'>
                    <tr className='tableHead'>
                        <th>Nha khoa</th>
                        <th>Điện thoại liên hệ</th>
                        <th>Ngày đặt</th>
                        <th>Khung giờ</th>
                        <th>Dịch vụ</th>
                        <th>Ghi chú</th>

                    </tr>
                    {history?.map((b) => (
                        <tr>
                            <td>{b.CLINIC_NAME}</td>
                            <td>{b.BOOKING_CONTACT_PHONE}</td>
                            <td>{b.BOOKING_DATE}</td>
                            <td>{b.TIMESLOT_NAME}</td>
                            <td>{b.BOOKING_SERVICE}</td>
                            <td>{b.BOOKING_NOTE}</td>

                        </tr>
                    ))}
                </table>
            </div>
            <div className="historySpace"></div>
        </React.Fragment>
    );
}

export default History;