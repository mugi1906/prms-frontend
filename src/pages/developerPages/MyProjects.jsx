import React from 'react'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import api from '../../services/api';


function MyProjects() {

    const [projects, setprojects] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState("newest");
    const [loadind, setLoading] = useState(true);
    const [error, setError] = useState('')
    const [searchLoading, setSearchLoading] = useState(false)

    const getProjects = async (isSearch = false) => {

        if (isSearch) {
            setSearchLoading(true)
        } else {
            setLoading(true);
        }

        setError('')

        try {

            await new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );

            const guest = sessionStorage.getItem("guest");
            const sessionId = sessionStorage.getItem("guestSessionId");

            if (guest === "true" && sessionId) {

                const response = await api.get(
                    `/guest/data/${sessionId}`
                );

                let guestProjects = response.data.data.projects || [];

                if (search) {
                    guestProjects = guestProjects.filter(project =>
                        project.projectName
                            ?.toLowerCase()
                            .includes(search.toLowerCase())
                    );
                }

                if (sort === "oldest") {
                    guestProjects = [...guestProjects].reverse();
                }

                const limit = 5;

                const pages = Math.max(
                    1,
                    Math.ceil(guestProjects.length / limit)
                );

                const start = (page - 1) * limit;

                setprojects(
                    guestProjects.slice(start, start + limit)
                );

                setTotalPages(pages);

                return;
            }

            const respone = await api.get(
                `/project/allProject?search=${search}&page=${page}&sort=${sort}`
            );

            setprojects(respone.data.project);
            setTotalPages(respone.data.totalPages);

        } catch (error) {

            console.log(error)

        }
        finally {

            if (isSearch) {
                setSearchLoading(false)
            } else {
                setLoading(false);
            }

        }
    }


    const deleteproject = async (id) => {

        try {

            const guest = sessionStorage.getItem("guest");
            const sessionId = sessionStorage.getItem("guestSessionId");

            if (guest === "true" && sessionId) {

                const response = await api.delete(
                    `/guest/developer/projects/${sessionId}/${id}`
                );

                setprojects(prev =>
                    prev.filter(project => project._id !== id)
                );

                toast.success(
                    "Delete Success",
                    {
                        autoClose: 2000,
                        theme: "colored"
                    }
                );

                return;
            }

            await api.delete(
                `/project/deleteProject/${id}`
            );

            getProjects();

            toast.success(
                "Delete Success",
                {
                    autoClose: 2000,
                    theme: "colored"
                }
            )

        } catch (error) {

            console.log(error.response?.data || error.message)

        }
    }


    useEffect(() => {
        getProjects();
    }, []);


    useEffect(() => {

        if (loadind) return

        getProjects(true);

    }, [search, page, sort]);


    if (loadind) {
        return <div className="spinner"></div>;
    }


    if (error) {
        return (
            <div className="error-box">

                <h3>{error}</h3>

                <button onClick={getProjects}>
                    Retry
                </button>

            </div>
        )
    }


    if (!loadind && projects.length === 0) {
        return <h2>No projects Found</h2>;
    }


    return (

        <div className="table-page">

            <h1>
                My Projects
            </h1>

            <div>

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

                    <select
                        className="sort-select"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >

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

                                <th>
                                    S.No
                                </th>

                                <th>
                                    Project Name
                                </th>

                                <th>
                                    Description
                                </th>

                                <th>
                                    Project Details
                                </th>

                                <th>
                                    Github
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Action
                                </th>

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
                                    )

                                    :

                                    projects.length > 0 ?

                                        (

                                            projects.map((project, index) => (

                                                <tr key={project._id}>

                                                    <td>
                                                        {(page - 1) * 5 + index + 1}
                                                    </td>


                                                    <td>
                                                        {project.projectName}
                                                    </td>


                                                    <td>
                                                        {project.projectdescription}
                                                    </td>


                                                    <td>

                                                        <Link
                                                            to={`/developer/ProjectDetails/${project._id}`}
                                                        >
                                                            view
                                                        </Link>

                                                    </td>


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
                                                            Project Link
                                                        </a>

                                                    </td>


                                                    <td>
                                                        {project.status}
                                                    </td>


                                                    <td>

                                                        <button
                                                            className="delete-btn"
                                                            onClick={() =>
                                                                deleteproject(project._id)
                                                            }
                                                        >
                                                            delete
                                                        </button>

                                                    </td>

                                                </tr>

                                            ))

                                        )

                                        :

                                        (

                                            <tr className='empty-project'>

                                                <td>
                                                    No Any Data Found
                                                </td>

                                            </tr>

                                        )

                            }

                        </tbody>

                    </table>

                </div>


                <br />


                <div className="pagination">

                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>


                    <span>
                        {page} / {totalPages}
                    </span>


                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>

                </div>

            </div>

        </div>

    )
}

export default MyProjects;