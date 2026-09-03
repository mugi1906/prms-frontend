import React from 'react'
import { Eye, EyeOff, X } from "lucide-react";
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { toast } from "react-toastify";
import api from "../services/api"
import "../style/authPage.css"

function Login() {

    const { login, guestLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showDemo, setShowDemo] = useState(false);
    const [showDemoMessage, setShowDemoMessage] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })


    useEffect(() => {

        const demoMessageShown =
            localStorage.getItem("demoMessageShown");

        if (!demoMessageShown) {

            setShowDemoMessage(true);

            localStorage.setItem(
                "demoMessageShown",
                "true"
            );
        }

    }, []);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.email || !formData.password) {

            return toast.warning(
                "Please fill all fields",
                {
                    autoClose: 2000,
                    theme: "colored"
                }
            )

        }

        try {

            const response =
                await api.post('/auth/login', formData)

            login(
                response.data.user,
                response.data.token
            )

            const role =
                response.data.user.role;

            toast.success(
                "Login success",
                {
                    autoClose: 2000,
                    theme: "colored"
                }
            );


            if (role === "developer") {

                navigate('/developer/dashboard');

            }
            else if (role === "reviewer") {

                navigate('/review/dashboard');

            }
            else if (role === "admin") {

                navigate('/admin/dashboard');

            }


            setFormData({
                email: "",
                password: ""
            });

        }

        catch (error) {

            const message =
                error.response?.data?.message;

            if (message === "Account deactivated") {

                toast.error(
                    "Account deactivated"
                );

            }
            else if (message === "Invalid Password") {

                toast.error(
                    "Wrong password"
                );

            }
            else {

                console.log(
                    "LOGIN ERROR:",
                    error.response?.data
                );

            }

        }

    }


    const handleDemoToggle = () => {

        setShowDemo(!showDemo);

    }


    const handleGuestLogin = async (role = "admin") => {

        try {

            const guestData = await guestLogin(role);

            toast.success(
                `Guest ${role} demo started`,
                {
                    autoClose: 1500,
                    theme: "colored"
                }
            );

            if (role === "admin") {

                navigate("/admin/dashboard");

            }
            else if (role === "developer") {

                navigate("/developer/dashboard");

            }
            else if (role === "reviewer") {

                navigate("/review/dashboard");

            }

        }
        catch (error) {

            console.log(
                "GUEST LOGIN ERROR:",
                error.response?.data || error.message
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to start guest demo"
            );

        }

    };


    return (

        <div>

            <div className="login-heading">

                <h1>
                    {
                        showDemo
                            ? "Demo Login"
                            : "Login"
                    }
                </h1>


                <button
                    type="button"
                    className={`demo-toggle ${showDemo ? "active" : ""}`}
                    onClick={handleDemoToggle}
                >

                    <span className="toggle-circle"></span>

                    <span>
                        Demo
                    </span>

                </button>

            </div>


            {
                !showDemo ? (

                    <div className="login-form">

                        <form onSubmit={handleSubmit}>

                            <input
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />


                            <div className="password-input">

                                <input
                                    name="password"
                                    placeholder="Password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={formData.password}
                                    onChange={handleChange}
                                />


                                <button
                                    type="button"
                                    className="eye-btn"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >

                                    {
                                        showPassword
                                            ? <EyeOff size={20} />
                                            : <Eye size={20} />
                                    }

                                </button>

                            </div>


                            <button type="submit">
                                Login
                            </button>

                        </form>

                    </div>

                ) : (

                    <div className="login-form demo-login">

                        <p className="demo-description">
                            Choose a demo role to explore
                            the PRMS platform.
                        </p>


                        <div className="guest-role-box">

                            <button
                                type="button"
                                onClick={() => handleGuestLogin("admin")}
                            >
                                Admin Demo
                            </button>

                            <button
                                type="button"
                                onClick={() => handleGuestLogin("developer")}
                            >
                                Developer Demo
                            </button>

                            <button
                                type="button"
                                onClick={() => handleGuestLogin("reviewer")}
                            >
                                Reviewer Demo
                            </button>

                        </div>

                    </div>

                )
            }


            {
                showDemoMessage && (

                    <div className="demo-info-popup">

                        <div className="demo-info-box">

                            <div className="demo-info-header">

                                <h3>
                                    Demo Account
                                </h3>

                                <button
                                    type="button"
                                    className="demo-close"
                                    onClick={() =>
                                        setShowDemoMessage(false)
                                    }
                                >
                                    <X size={18} />
                                </button>

                            </div>


                            <div className="demo-info-body">

                                <p>
                                    Use demo account temporarily
                                    without login credentials.
                                </p>

                            </div>


                            <div className="demo-info-footer">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowDemoMessage(false)
                                    }
                                >
                                    Got it
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>

    )
}

export default Login