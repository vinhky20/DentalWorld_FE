import { faCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Error.css';
function Error({ handleHideError, title }) {
    const handleHide = () => {
        handleHideError(false);
    }
    return (
        <div className='error'>
            <div className="error-container">
                <FontAwesomeIcon className="exit-icon" icon={faXmark} onClick={handleHide} ></FontAwesomeIcon>
                <FontAwesomeIcon className='error-icon' icon={faCircleExclamation} />
                <h3 className='error-title'>{title}</h3>
                <button className='exit-btn' onClick={handleHide}>THOÁT</button>
            </div>
        </div>
    );
}

export default Error;