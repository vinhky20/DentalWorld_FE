import { faCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Notice.css';

function Notice({ handleHideNotice }) {
    const handleHide = () => {
        handleHideNotice(false);

    }
    return (
        <div className='notice'>
            <div className="notice-container">
                <FontAwesomeIcon className="exit-icon" icon={faXmark} onClick={handleHide} ></FontAwesomeIcon>
                <FontAwesomeIcon className='notice-icon' icon={faCircleExclamation} />
                <h2 className='notice-title'>Chức năng đặt lịch chỉ dành cho khách hàng!</h2>
                <button className='exit-btn' onClick={handleHide}>THOÁT</button>
            </div>

        </div>
    );
}

export default Notice;