import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'


function AssignedReviews() {
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState("newest");
    const navigate = useNavigate();
    const [loading, setloading] = useState(true);
    const [error, setError] = useState('')
    const [searchLoading, setSearchLoading] = useState(false)

    const getAssignedReviews = async (isSearch = false) => {
        if (isSearch) {
            setSearchLoading(true)
        } else {
            setloading(true);
        }

        setError('')
        try {
            await new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );
            const response = await api.get(`/reviwe/AssignedReviews?search=${search}&page=${page}&sort=${sort}`
            );
            setProjects(response.data.projects);
            setTotalPages(response.data.totalPages);
        }
        catch (error) {
            console.log(error.response.data);
        }
        finally {
            if (isSearch) {
                setSearchLoading(false)
            } else {
                setloading(false);
            }
        }
    }

    const handleReview = (project) => {

        if (
            project.status === "approved" ||
            project.status === "rejected" ||
            project.status === "request_changes"
        ) {
            toast.warning(
                "This project is already reviewed.",
                {
                    autoClose: 2000,
                    theme: "colored"
                }
            );
            return;
        }

        navigate(`/review/ReviewerProject/${project._id}`);
    };


    useEffect(() => {
        getAssignedReviews(false);
    }, []);

    useEffect(() => {
        if (loading) return
        getAssignedReviews(true);
    }, [search, page, sort]);

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
    if (!loading && projects.length === 0) {
        return <h2>No projects Found</h2>;
    }

    return (

        <div className="table-page">


            <h1>Assigned Reviews</h1>
            <div className="filter">
                <input
                    className="search-input"
                    placeholder="Search Project"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />

                <select className="sort-select" onChange={(e) => setSort(e.target.value)}>
                    <option value="newest">
                        Newest
                    </option>

                    <option value="oldest">
                        Oldest
                    </option>
                </select>
            </div>

            <div className="table-card">
                <table border="1" className="table">


                    <thead>

                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Project</th>
                            <th>Project Link</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='table-body'>
                        {
                            searchLoading ?
                                (
                                    <tr>
                                        <td colSpan={9}>
                                            <div className="list-spinner">
                                                <div className="spinner"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ) :
                                projects.length > 0 ? (
                                    projects.map((project, index) => (
                                        <tr key={project._id}>

                                            <td>{(page - 1) * 5 + index + 1}</td>

                                            <td>{project.developerId?.name}</td>

                                            <td> {project.developerId?.email} </td>

                                            <td>
                                                {project.projectName}
                                            </td>

                                            <td>
                                                <a href={
                                                    project.githubUrl.startsWith("http")
                                                        ? project.githubUrl
                                                        : `https://${project.githubUrl}`
                                                } target="_blank">Link</a>
                                            </td>

                                            <td>
                                                {project.status}
                                            </td>

                                            <td>
                                                <button className="activate-btn" onClick={() => handleReview(project)}>
                                                    Review
                                                </button>
                                            </td>
                                        </tr>
                                    ))) : (
                                    <tr>
                                        <td>No Any Data Found</td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>

                <span>
                    {page}/{totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>

        </div >
    )
}


export default AssignedReviews;