import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import api from '../../services/api';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";



function UserManagement() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");
    const [sort, setSort] = useState("newest");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const isGuest = user?.guest === true;
    const guestSessionId = sessionStorage.getItem("guestSessionId");

    const getUsers = async (isSearch = false) => {
        if (isSearch) {
            setSearchLoading(true)
        } else {
            setLoading(true)
        }
        setError('')
        try {
            await new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );
            const response = isGuest
                ? await api.get(
                    `/guest/admin/users/${guestSessionId}?search=${search}&role=${role}&page=${page}&sort=${sort}`
                )
                : await api.get(
                    `/admin/allUser?search=${search}&role=${role}&page=${page}&sort=${sort}`
                );
            setUsers(
                response.data.users
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
                setLoading(false)
            }
        }
    }


    const userDelete = async (id) => {

        try {

            if (isGuest) {

                await api.delete(
                    `/guest/admin/users/${guestSessionId}/${id}`
                );

            } else {

                await api.delete(
                    `/admin/userDelete/${id}`
                );

            }

            await getUsers();

            alert(
                isGuest
                    ? "Demo user deleted"
                    : "Delete success"
            );

        } catch (error) {

            console.log(
                error.response?.data || error.message
            );

        }
    };

    useEffect(() => {
        getUsers(false);
    }, []);

    useEffect(() => {
        if (loading) return
        getUsers(true);
    }, [search, role, sort, page])

    if (loading) {
        return <div className="spinner"></div>;
    }
    if (error) {
        return (
            <div className="error-box">
                <h3>{error}</h3>
                <button onClick={getProjects}>Retry</button>
            </div>
        );
    }

    if (!loading && users.length === 0) {
        return <h2>No users Found</h2>;
    }

    return (

        <div className="table-page">


            <h1>
                User Management
            </h1>



            <div className="filter">
                <input
                    placeholder="Search User"
                    className="search-input"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />

                <select onChange={(e) => setRole(e.target.value)} className="sort-select">

                    <option value="">
                        All Roles
                    </option>

                    <option value="developer">
                        Developer
                    </option>

                    <option value="reviewer">
                        Reviewer
                    </option>

                </select>

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

                            <th>
                                Name
                            </th>

                            <th>
                                Email
                            </th>

                            <th>
                                Role
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody className='table-body' >
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
                                users.length > 0 ? (
                                    users.map((user, index) => (
                                        <tr key={user._id}>
                                            <td> {(page - 1) * 5 + index + 1} </td>

                                            <td>

                                                <div className="user-name">

                                                    <span className="user-icon">

                                                        <User size={20} />

                                                    </span>

                                                    {user.name}

                                                </div>

                                            </td>

                                            <td>
                                                {user.email}
                                            </td>

                                            <td>
                                                {user.role}
                                            </td>

                                            <td>

                                                {
                                                    user.isOnline
                                                        ?
                                                        "Active"
                                                        :
                                                        "Inactive"
                                                }

                                            </td>

                                            <td>
                                                <div >
                                                    <button className="delete-btn" onClick={() => userDelete(user._id)} >
                                                        delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))) : (
                                    <tr>
                                        <td>No any Data Found</td>
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
    )

}


export default UserManagement;