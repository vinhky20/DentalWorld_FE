import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Success.css';

function Success({ handleHideSuccess, title }) {
    const handleHide = () => {
        handleHideSuccess(false);
    }
    return (
        <div className='success'>
            <div className="success-container">
                <FontAwesomeIcon className="exit-icon" icon={faXmark} onClick={handleHide} ></FontAwesomeIcon>
                <FontAwesomeIcon className='success-icon' icon={faCircleCheck} />
                <h2 className='success-title'>{title}</h2>
                <button className='exit-btn' onClick={handleHide}>THOÁT</button>
            </div>
        </div>
    );
}

export default Success;