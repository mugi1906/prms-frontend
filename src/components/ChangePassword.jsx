import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { Eye, EyeOff } from "lucide-react";
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../services/api';
import "../style/profile.css"

function ChangePassword() {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [conformPassword, setConfirmPassword] = useState('');
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    const changePassword = async () => {

        try {

            if (newPassword !== conformPassword) {
                toast.error("New password and confirm password not match",
                    {
                        autoClose: 2000,
                        theme: "colored"
                    }
                );
                return;
            }

            const response = await api.put('/auth/changePassword',
                {
                    oldPassword,
                    newPassword
                }
            )

            console.log(response.data);
            toast.success("password change",
                {
                    autoClose: 2000,
                    theme: "colored"
                }
            );

            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');

            navigate('/setting')

        } catch (error) {

            console.log(
                error.response?.data || error.message
            )
            toast.error(
                error.response?.data?.message || "Something went wrong",
                {
                    autoClose: 2000,
                    theme: "colored"
                }
            );
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

        }
    }

    return (
        <div className="password-page">

            <div className="password-card">

                <div className='project-header-child'>
                    <button className='backTo-btn' onClick={() => navigate(-1)}>
                        <ChevronLeft />
                    </button>

                    <h1>
                        Change Password
                    </h1>

                </div>



                <p>
                    Update your password to keep your account secure
                </p>

                <label>
                    Old Password
                </label>

                <div className="password-input">

                    <input
                        type={showOld ? "text" : "password"}
                        placeholder="Enter old password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />

                    <button
                        type="button"
                        className="eye-btn"
                        onClick={() => setShowOld(!showOld)}
                    >
                        {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>

                </div>

                <label>
                    New Password
                </label>

                <div className="password-input">

                    <input
                        type={showNew ? "text" : "password"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <button
                        type="button"
                        className="eye-btn"
                        onClick={() => setShowNew(!showNew)}
                    >
                        {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>

                </div>

                <label>
                    Confirm Password
                </label>

                <div className="password-input">

                    <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={conformPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        type="button"
                        className="eye-btn"
                        onClick={() => setShowConfirm(!showConfirm)}
                    >
                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>

                </div>

                <button onClick={changePassword} className='update-password-btn'>
                    Update Password
                </button>
            </div>
        </div>

    )
}

export default ChangePassword