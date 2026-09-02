import React, { useEffect, useState } from "react";
import { ArrowLeft } from 'lucide-react';
import api from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../../style/Project.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


function AssingedReviewer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [reviewers, setReviewers] = useState([]);
    const [reviewerId, setReviewerId] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const isGuest = user?.guest === true;
    const guestSessionId = sessionStorage.getItem("guestSessionId");


    const getProject = async () => {
        setLoading(true);
        setError("");
        try {
            await new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );
            const response = isGuest
                ? await api.get(`/guest/admin/projects/${guestSessionId}?search=&page=1&sort=newest`)
                : await api.get(`/project/singleProject/${id}`);

            if (isGuest) {
                const guestProject = response.data.project.find(
                    project => project._id === id
                );

                setProject(guestProject);
            } else {
                setProject(response.data);
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
        finally {
            setLoading(false);
        }
    }

    const getReviewers = async () => {
        try {
            const response = isGuest
                ? await api.get(`/guest/admin/users/${guestSessionId}`)
                : await api.get("/admin/allUser");

            const reviewerList = response.data.users.filter(
                user => user.role === "reviewer"
            );

            setReviewers(reviewerList);
        }
        catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    const assignReviewer = async () => {

        if (!reviewerId) {
            toast.warning(
                "Please select reviewer",
                {
                    autoClose: 2000,
                    theme: "colored"
                }
            );
            return
        }

        try {
            const response = isGuest
                ? await api.put(
                    `/guest/admin/projects/${guestSessionId}/${id}/assignReviewer`,
                    {
                        reviewerId
                    }
                )
                : await api.put(
                    `/project/assignReviewer/${id}`,
                    {
                        reviewerId
                    }
                );

            toast.success(
                "Reviewer Assigned Successfully",
                {
                    autoClose: 2000,
                    theme: "colored"
                }
            );

            navigate("/admin/ProjectMangment");
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        getProject();
        getReviewers();
    }, [])

    if (loading) {
        return <div className="spinner"></div>;
    }

    if (error) {
        return (
            <div className="error-box">
                <h3>{error}</h3>
                <button onClick={getProjects}>Retry</button>
            </div>
        )
    }

    if (!loading && project.length === 0) {
        return <h2>No project Found</h2>;
    }




    return (


        <div className="assign-reviewer-page">

            <div className="assign-header">

                <button
                    className="assign-back-btn"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft />
                </button>

                <h1 className="assign-title">
                    Assign Reviewer
                </h1>

            </div>

            <div className="project-table-card assign-card">

                {project && (
                    <>
                        <h3 className="project-name">
                            Project: {project.projectName}
                        </h3>

                        <p className="project-desc">
                            {project.projectdescription}
                        </p>
                    </>
                )}

                <div className="assign-form">

                    <label className="assign-label">
                        Select a Reviewer
                    </label>

                    <select
                        className="assign-select"
                        onChange={(e) => setReviewerId(e.target.value)}
                    >
                        <option value="">-- Choose a Reviewer --</option>

                        {reviewers.map((reviewer) => (
                            <option
                                key={reviewer._id}
                                value={reviewer._id}
                            >
                                {reviewer.name} ({reviewer.email})
                            </option>
                        ))}

                    </select>

                    <button
                        className="assign-btn"
                        onClick={assignReviewer}
                    >
                        Confirm Assignment
                    </button>

                </div>

            </div>

        </div>

    )


}



export default AssingedReviewer;