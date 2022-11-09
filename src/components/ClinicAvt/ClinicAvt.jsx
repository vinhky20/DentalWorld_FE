import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { useState } from 'react';
import { Context } from '../../context/Context';
import './ClinicAvt.css';
import avt from '../../static/pictures/avt.jpg';
import axios from 'axios';
import Loading from '../Loading/Loading';
import Success from '../Success/Success';


function ClinicAvt({ handleHideAvt }) {
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
        const updatedClinic = {};

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedClinic.CLINIC_AVT = filename;

            try {
                await axios.post("clinics/upload", data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            await axios.put("/clinics/" + user[0].CLINIC_ID, updatedClinic);
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
            <div className='clinicAvt'>
                <form className="clinicAvtContainer" onSubmit={handleUpdate}>
                    <FontAwesomeIcon className='clinic-off-icon' icon={faXmark} onClick={handleHide} />
                    <img src={file ? URL.createObjectURL(file) : PF + user[0].CLINIC_AVT} alt="" className="clinicImg" />
                    <label className='chooseFile' htmlFor="fileInput">
                        Chọn file
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button type='submit' className="clinicUpdateBtn">Cập nhật</button>
                </form>
            </div>
        </React.Fragment>
    );
}

export default ClinicAvt;