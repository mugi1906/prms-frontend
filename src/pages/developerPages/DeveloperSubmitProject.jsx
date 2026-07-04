import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import "../../style/submitform.css"


function DeveloperSubmitProject() {

    const [formData, setFormData] = useState({
        projectName: "",
        projectdescription: "",
        githubUrl: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            if(!formData.projectName|| !formData.projectdescription || !formData.githubUrl){
                toast.warning(
                    "Please fill all fields",
                    {
                        autoClose : 2000,
                        theme : "colored"
                    }
                )
            }   

            const response = await api.post('/project/createProjecte', formData);

            toast.success(
                "Project Submitted",
                {
                    autoClose : 2000,
                    theme : 'colored'
                }
            );

            setFormData({
                projectName: "",
                projectdescription: "",
                githubUrl: ""
            })
            navigate('/developer/MyProjects')
        }
        catch (error) {
            console.log(
                error.response?.data || error.message
            )
        }
    }



    return (

        <div className="submit-page">

            <div className="submit-card">

                <h1>
                    Submit Project
                </h1>

                <p>
                    Submit your project details for admin review
                </p>

                <form onSubmit={handleSubmit}>

                    <label>
                        Project Name
                    </label>

                    <input
                        name="projectName"
                        placeholder="Enter project name"
                        value={formData.projectName}
                        onChange={handleChange}
                    />

                    <label>
                        Project Description
                    </label>

                    <textarea
                        name="projectdescription"
                        placeholder="Describe your project"
                        value={formData.projectdescription}
                        onChange={handleChange}
                    />

                    <label>
                        Github URL
                    </label>

                    <input
                        name="githubUrl"
                        placeholder="Enter Github repository URL"
                        value={formData.githubUrl}
                        onChange={handleChange}
                    />

                    <button>
                        Submit Project
                    </button>
                </form>
            </div>
        </div>
    )
}


export default DeveloperSubmitProject