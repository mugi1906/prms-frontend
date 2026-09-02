import React from 'react'
import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import api from '../../services/api';
import "../../style/Project.css"

function ProjectDetails() {

    const { id } = useParams();
    const [project, setProject] = useState(null);
    const navigate = useNavigate();

    const getProject = async () => {

        try {

            const guest = sessionStorage.getItem("guest");
            const sessionId = sessionStorage.getItem("guestSessionId");

            if (guest === "true" && sessionId) {

                const response = await api.get(
                    `/guest/data/${sessionId}`
                );

                const guestProject = response.data.data.projects.find(
                    project => project._id === id
                );

                if (guestProject) {
                    setProject(guestProject);
                }

                return;
            }

            const response = await api.get(
                `/project/singleProject/${id}`
            );

            setProject(response.data);

        } catch (error) {

            console.log(error);

        }
    }


    useEffect(() => {
        getProject();
    }, [id]);


    return (

        <div className="project-details-page">

            <div className="project-details-card">

                <div className="project-header">

                    <div className='project-header-child'>

                        <button
                            className='back-btn'
                            onClick={() => navigate(-1)}
                        >
                            <ChevronLeft />
                        </button>

                        <h1>
                            Project Details
                        </h1>

                    </div>


                    <span>
                        {project?.status}
                    </span>

                </div>


                <div className="project-content">

                    <div className="project-item">

                        <h3>
                            Project Name
                        </h3>

                        <p>
                            {project?.projectName}
                        </p>

                    </div>


                    <div className="project-item">

                        <h3>
                            Description
                        </h3>

                        <p>
                            {project?.projectdescription}
                        </p>

                    </div>


                    <div className="project-item">

                        <h3>
                            Github Repository
                        </h3>

                        <a
                            href={
                                project?.githubUrl?.startsWith("http")
                                    ? project.githubUrl
                                    : `https://${project?.githubUrl}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Project Link
                        </a>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default ProjectDetails;