import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import api from "../../services/api"
import { useNavigate } from 'react-router-dom';


function ActivityLogs() {

    const [logs, setLogs] = useState([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [sort, setSort] = useState("newest");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchLoading, setSearchLoading] = useState(false)


    const activityLog = async (isSearch = false) => {
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
            const response = await api.get(`/ActivityLog/allLogs?search=${search}&type=${type}&page=${page}&sort=${sort}`);

            setLogs(
                response.data.logs
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
        activityLog(false);
    }, []);

    useEffect(() => {
        if (loading) return;
        activityLog(true);
    }, [search, type, sort, page]);

    if (loading) {
        return <div className="spinner"></div>;
    }

    if (error) {
        return (
            <div className="error-box">
                <h3>{error}</h3>
                <button onClick={activityLog}>Retry</button>
            </div>
        )
    }
    if (!loading && logs.length === 0) {
        return <h2>No Activvity Found</h2>;
    }
    return (

        <div className="table-page">
            <h1>
                Activity Logs
            </h1>

            <div className="filter">
                <input
                    className="search-input"
                    placeholder="Search Activity"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />

                <select
                    className="sort-select"
                    onChange={(e) =>
                        setType(e.target.value)}
                >

                    <option value="">
                        All Type
                    </option>

                    <option value="Project">
                        Project
                    </option>

                    <option value="Review">
                        Review
                    </option>

                    <option value="User">
                        User
                    </option>

                    <option value="Auth">Loin/LogOut</option>
                </select>

                <select
                    className="sort-select"
                    onChange={(e) =>
                        setSort(e.target.value)}
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
                            <th>S.No</th>
                            <th>
                                User
                            </th>
                            <th>
                                Type
                            </th>
                            <th>
                                Action
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Login Time
                            </th>
                            <th>
                                Logout Time
                            </th>
                            <th>
                                Duration
                            </th>

                            <th>
                                Date
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
                                ) :
                                logs.length > 0 ?
                                    (
                                        logs.map((log, index) => (
                                            <tr key={log._id}>
                                                <td> {(page - 1) * 5 + index + 1} </td>
                                                <td>
                                                    {
                                                        log.userId?.name
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        log.type
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        log.action
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        log.description
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        log.loginTime
                                                            ?
                                                            new Date(log.loginTime).toLocaleString()
                                                            :
                                                            "-"
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        log.logoutTime
                                                            ?
                                                            new Date(log.logoutTime).toLocaleString()
                                                            :
                                                            "-"
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        log.duration
                                                            ?
                                                            log.duration
                                                            :
                                                            "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        new Date(log.createdAt).toLocaleDateString()
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    )
                                    : <tr>
                                        <td colSpan={9}>
                                            No Activity Found
                                        </td>
                                    </tr>
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
        </div>
    )
}

export default ActivityLogs