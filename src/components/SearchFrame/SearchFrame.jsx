import React from 'react';
import "./SearchFrame.css";
import { faHouseChimneyMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { useState } from 'react';

function SearchFrame(props) {
    const [keyword, setKeyword] = useState("");

    return (
        <div className='searchFrame'>
            <form className="headerSearch">
                <div className="headerSearchItem">
                    <FontAwesomeIcon className='headerIcon' icon={faHouseChimneyMedical} />
                    <input
                        type="text"
                        placeholder="Bạn muốn tìm phòng khám nào?"
                        className="headerSearchInput"
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
                <div className="headerSearchItem">
                    <button className="headerBtn">
                        <Link className='link' to={'/search/' + keyword}>Tìm kiếm</Link>
                    </button>
                </div>
            </form >
        </div >
    );
}

export default SearchFrame;