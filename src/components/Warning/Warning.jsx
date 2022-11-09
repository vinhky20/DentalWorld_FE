import { faCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Warning.css';

function Warning({ handleHideWarning }) {
    const handleHide = () => {
        handleHideWarning(false);

    }
    return (
        <div className='warning'>
            <div className="warning-container">
                <FontAwesomeIcon className="exit-icon" icon={faXmark} onClick={handleHide} ></FontAwesomeIcon>
                <FontAwesomeIcon className='warning-icon' icon={faCircleExclamation} />
                <h2 className='warning-title'>Chức năng đặt lịch chỉ dành cho khách hàng!</h2>
                <button className='exit-btn' onClick={handleHide}>THOÁT</button>
            </div>

        </div>
    );
}

export default Warning;