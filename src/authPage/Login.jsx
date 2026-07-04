import React from 'react'
import { Eye, EyeOff } from "lucide-react";
import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { toast } from "react-toastify";
import api from "../services/api"
import "../style/authPage.css"




function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
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
            const response = await api.post('/auth/login', formData)

            login(
                response.data.user,
                response.data.token
            )

            const role = response.data.user.role;

            toast.success(
                "login success",
                {
                    autoClose: 2000,
                    theme: "colored"
                }
            );

            if (role === "developer") {
                navigate('/developer/dashboard');
            }
            else if (role === "reviewer") {
                navigate('/review/dashboard')
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

            const message = error.response?.data?.message;

            if (message === "Account deactivated") {
                setshowDeactivate(true)
            }
            else if (message === "Invalid Password") {
                toast.error("Wrong password")
            }
            else {
                console.log("LOGIN ERROR:", error.response?.data);

            }
        }
    }

    return (
        <div>
            <div>
                <h1>Login</h1>
                <div className='login-form'>
                    <form onSubmit={handleSubmit}>

                        
                        <input
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                        />

                        <div className="password-input">
                            <input
                                name="password"
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                className="eye-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>



                        <button>
                            Login
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login