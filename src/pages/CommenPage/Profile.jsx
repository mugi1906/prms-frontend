import React from 'react'
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../../services/api'
import "../../style/profile.css"

function Profile() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    const getProfile = async () => {
        try {
            const response = await api.get('/auth/profile');
            setUser(response.data)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="profile-page">

            <div className="profile-card">

                <div className="profile-cover">

                    <div className="profile-avatar">

                        {
                            user?.name?.charAt(0)
                        }

                    </div>

                </div>

                <div className="profile-content">

                    <div className="info-card">

                        <h3>
                            User ID
                        </h3>

                        <p>
                            {user?._id}
                        </p>

                    </div>

                    <div className="info-card">

                        <h3>
                            Full Name
                        </h3>


                        <p>
                            {user?.name}
                        </p>

                    </div>

                    <div className="info-card">

                        <h3>
                            Email Address
                        </h3>


                        <p>
                            {user?.email}
                        </p>

                    </div>

                    <div className="info-card">

                        <h3>
                            Account Type
                        </h3>

                        <p>
                            {user?.role.toUpperCase()}
                        </p>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default Profile