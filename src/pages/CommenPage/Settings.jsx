import React from 'react'
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/themeSlice';
import api from '../../services/api';
import '../../index.css'
import "../../style/settings.css"

function Settings() {
    const user = JSON.parse(sessionStorage.getItem("user"))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    const logout = () => {
        logOut();
        toast.success("logout seccuss",
            {
                autoClose: 2000,
                theme: "colored"
            }
        );
        navigate('/')
    }



    return (
        <div className="settings-page">


            <h1>
                Settings
            </h1>


            <p className="settings-desc">

                Manage your account preferences, security and application settings

            </p>





            <div className="settings-container">





                <div className="settings-card">


                    <div className="card-title">

                        <h2>
                            Account
                        </h2>

                        <p>
                            Manage your personal information and account details
                        </p>

                    </div>




                    <button onClick={() => navigate("/profile")}>

                        <span>
                            Profile
                        </span>

                        <small>
                            View your profile information
                        </small>

                    </button>




                    <button onClick={() => navigate("/updateProfile", { state: user })}>

                        <span>
                            Update Profile
                        </span>

                        <small>
                            Edit your name and personal details
                        </small>

                    </button>





                    <button onClick={() => navigate("/changePassword")}>

                        <span>
                            Change Password
                        </span>

                        <small>
                            Keep your account secure
                        </small>

                    </button>


                </div>







                <div className="settings-card">



                    <div className="card-title">

                        <h2>
                            Appearance
                        </h2>


                        <p>
                            Customize your application experience
                        </p>


                    </div>



                    <button onClick={() => dispatch(toggleTheme())}>


                        <span>
                            Change Theme
                        </span>


                        <small>
                            Switch between light and dark mode
                        </small>


                    </button>



                </div>








                <div className="settings-card">



                    <div className="card-title">


                        <h2>
                            Security
                        </h2>


                        <p>
                            Manage your login session
                        </p>


                    </div>




                    <button
                        className="logout-btn"
                        onClick={logout}
                    >


                        <span>
                            Logout
                        </span>


                        <small>
                            Sign out from this device
                        </small>


                    </button>



                </div>




            </div>



        </div>
    )
}

export default Settings