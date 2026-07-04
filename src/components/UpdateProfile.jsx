import React from 'react'
import { toast } from 'react-toastify';
import { ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'
import "../style/profile.css"

function UpdateProfile() {

    const location = useLocation();
    const user = location.state;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user])

    const updateProfile = async (e) => {
        e.preventDefault();
        if (!name || !email) {
            return toast.warning(
                "Please fill all fields",
                {
                    autoClose: 2000,
                    theme: "colored"
                }
            )
        }

        try {
            const response = await api.put(`/auth/updateProfile/${user.id}`,
                {
                    name,
                    email
                }
            );

            sessionStorage.setItem("user", JSON.stringify({ ...user, name, email }))

            toast.success("Profile Updated",
                {
                    autoClose: 2000,
                    theme: "colored"
                }
            );

            navigate(-1);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="update-page">

            <div className="update-card">

                <div className='project-header-child'>
                    <button className='backTo-btn' onClick={() => navigate(-1)}>
                        <ChevronLeft />
                    </button>

                    <h1>
                        Update Profile
                    </h1>

                </div>


                <p>
                    Update your personal information
                </p>

                <form onSubmit={updateProfile}>

                    <label>
                        Name
                    </label>

                    <input
                        placeholder='Enter a Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>
                        Email
                    </label>

                    <input
                        placeholder='Enter a Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button type="submit">

                        Update Profile

                    </button>

                </form>

            </div>

        </div>
    )
}

export default UpdateProfile;