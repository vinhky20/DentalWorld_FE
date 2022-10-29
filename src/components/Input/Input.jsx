import React from 'react';
import "./Input.css";


function Input({ nameInput, value }) {
    return (
        <div className='input'>
            <p className='input-name'>{nameInput}</p>
            <input type="text" className='input-field' placeholder={value} />
        </div>
    );
}

export default Input;