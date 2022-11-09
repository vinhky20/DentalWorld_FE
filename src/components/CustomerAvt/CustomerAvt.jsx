import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import Loading from '../Loading/Loading';
import Success from '../Success/Success';
import './CustomerAvt.css';

function CustomerAvt({ handleHideAvt }) {
    const [file, setFile] = useState(null);
    const PF = "http://localhost:5000/public/images/";
    const { user } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleHide = () => {
        handleHideAvt(false)
    }

    const handleHideSuccess = () => {
        setSuccess(false);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const updatedCustomer = {};

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedCustomer.CUSTOMER_AVT = filename;

            try {
                await axios.post("customers/upload", data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            await axios.put("/customers/" + user[0].CUSTOMER_ID, updatedCustomer);
            setIsLoading(false);
            setSuccess(true);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <React.Fragment>
            {isLoading && <Loading />}
            {success && <Success title={"Cập nhật ảnh đại diện thành công!"} handleHideSuccess={handleHideSuccess} />}
            <div className='customerAvt'>
                <form className="customerAvtContainer" onSubmit={handleUpdate}>
                    <FontAwesomeIcon className='customer-off-icon' icon={faXmark} onClick={handleHide} />
                    <img src={file ? URL.createObjectURL(file) : PF + user[0].CUSTOMER_AVT} alt="" className="customerImg" />
                    <label className='chooseFile' htmlFor="fileInput">
                        Chọn file
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button type='submit' className="customerUpdateBtn">Cập nhật</button>
                </form>
            </div>
        </React.Fragment>
    );
}

export default CustomerAvt;