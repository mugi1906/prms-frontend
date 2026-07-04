import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'


function ProjectManagement() {

    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("newest");
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchLoading, setSearchLoading] = useState(false)

    const getProjects = async (isSearch = false) => {
        if (isSearch) {
            setSearchLoading(true)
        } else {
            setLoading(true);
        }
        setError("");
        try {
            await new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );
            const response = await api.get(`/project/allProject?search=${search}&page=${page} &sort=${sort}`);

            setProjects(
                response.data.project
            );

            setTotalPages(
                response.data.totalPages
            );
        }

        catch (error) {
            console.log(
                error.response.data
            );
        }
        finally {
            if (isSearch) {
                setSearchLoading(false)
            } else {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        getProjects(false);
    }, []);

    useEffect(() => {
        if (loading) return;
        getProjects(true);
    }, [search, page, sort]);

    // 🔥 LOADING UI
    if (loading) {
        return <div className="spinner"></div>;
    }

    // 🔥 ERROR UI (optional but useful)
    if (error) {
        return (
            <div className="error-box">
                <h3>{error}</h3>
                <button onClick={getProjects}>Retry</button>
            </div>
        );
    }

    // 🔥 EMPTY STATE
    if (!loading && projects.length === 0) {
        return <h2>No Projects Found</h2>;
    }





    return (
        <div className="table-page">
            <h1>Project Management</h1>

            <div className="filter">
                <input
                    className="search-input"
                    placeholder="Search projects by name or developer..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />

                <select
                    className="sort-select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="newest" className='option'>Newest First</option>
                    <option value="oldest" className='option'>Oldest First</option>
                </select>
            </div>

            <div className="table-card">

                <table className="table" border="1">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Developer</th>
                            <th>Email</th>
                            <th>Project Name</th>
                            <th>Description</th>
                            <th>Comment</th>
                            <th>Project Link</th>
                            <th>Status</th>
                            <th>Reviewer</th>
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
                                            <td> {(page - 1) * 5 + index + 1} </td>
                                            <td>{project.developerId?.name || "N/A"}</td>
                                            <td>{project.developerId?.email || "N/A"}</td>
                                            <td>{project.projectName}</td>
                                            <td>{project.projectdescription}</td>
                                            <td>{project.comment || "No Comment"}</td>
                                            <td>
                                                <a
                                                    href={
                                                        project.githubUrl.startsWith("http")
                                                            ? project.githubUrl
                                                            : `https://${project.githubUrl}`
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Link
                                                </a>
                                            </td>
                                            <td>
                                                <span className={`status ${project.status?.toLowerCase()}`}>
                                                    {project.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td>
                                                {project.reviewerId
                                                    ? `Assigned: ${project.reviewerId.name}`
                                                    : "Not Assigned"}
                                            </td>
                                            <td>
                                                <button
                                                    className="assign-btn"
                                                    onClick={() => navigate(`/admin/AssignedReviewer/${project._id}`)}
                                                >
                                                    Assign
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

                <span>{page} / {totalPages}</span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );


}


export default ProjectManagement