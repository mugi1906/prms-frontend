import React from 'react'
import { Eye, EyeOff } from "lucide-react";
import { useState } from 'react'
import api from "../services/api";
import AuthPage from './AuthPage'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Register({ switchLogin }) {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "developer"
  })

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.name) {
      return toast.warning(
        "Please fill all fields",
        {
          autoClose: 2000,
          theme: "colored"
        }
      )
    }
    try {
      const respone = await api.post('/auth/register', formData)
      console.log(respone);
      toast.success(
        "Register Successfully",
        {
          autoClose: 2000,
          theme: "colored"
        }
      );
      switchLogin();
      setFormData("");
    }
    catch (error) {
      console.log(error.respone?.data);
    }
  }

  return (
    <div>

      <h1>Register</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />

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

          <select
            name="role"
            onChange={handleChange}
          >

            <option value="developer">
              Developer
            </option>

            <option value="reviewer">
              Reviewer
            </option>


          </select>

          <button>
            Register
          </button>

        </form>
      </div>
    </div>
  )
}

export default Register