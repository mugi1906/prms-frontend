import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import api from '../../services/api'

function ReviewHistory() {


    const [reviews, setReviews] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState("newest");
    const [loading, setloading] = useState(true);
    const [error, setError] = useState('');
    const [searchLoading, setSearchLoading] = useState(false)


    const getReviewHistory = async (isSearch = false) => {
        if (isSearch) {
            setSearchLoading(true)
        }
        else {
            setloading(true);
        }

        setError('')
        try {
            await new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );
            const response = await api.get(`/reviwe/reviewHistory?search=${search}&page=${page}&sort=${sort}`);
            setReviews(response.data.reviews);
            setTotalPages(response.data.totalPages);
        }
        catch (error) {
            console.log(error.response.data);
        }
        finally {
            if (isSearch) {
                setSearchLoading(false)
            }
            else {
                setloading(false);
            }
        }
    }

    const historyDelete = async (id) => {

        const guestSession = localStorage.getItem("guestSession");

        if (guestSession) {
            toast.warning(
                "Please login to delete a review",
                {
                    autoClose: 2000,
                    theme: "colored"
                }
            );
            return;
        }

        try {
            const response = await api.delete(`/reviwe/deleteReview/${id}`);

            getReviewHistory();

            toast.success(
                "Delete Success",
                {
                    autoClose: 2000,
                    theme: "colored"
                }
            );

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    useEffect(() => {
        getReviewHistory(false);
    }, []);

    useEffect(() => {
        if (loading) return
        getReviewHistory(true);
    }, [search, page, sort]);

    if (loading) {
        return <div className="spinner"></div>;
    }

    if (error) {
        return (
            <div className="error-box">
                <h3>{error}</h3>
                <button onClick={getReviewHistory}>Retry</button>
            </div>
        )
    }

    if (!loading && reviews.length === 0) {
        return <h2>No reviews Found</h2>;
    }



    return (

        <div className="table-page">
            <h1>Review History</h1>
            <div className="filter">
                <input
                    className="search-input"
                    placeholder="Search Developer Name"
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

                            <th>Developer Name</th>

                            <th>Developer Email</th>

                            <th>
                                Project
                            </th>

                            <th>
                                Comment
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Date
                            </th>

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
                                reviews.length > 0 ? (

                                    reviews.map((review, index) => (

                                        <tr key={review._id}>

                                            <td>{(page - 1) * 5 + index + 1}</td>

                                            <td>
                                                {review.projectId?.developerId?.name}
                                            </td>

                                            <td>
                                                {review.projectId?.developerId?.email}
                                            </td>

                                            <td>
                                                {review.projectId?.projectName}
                                            </td>

                                            <td>
                                                {review.comments}
                                            </td>

                                            <td>
                                                {review.status}
                                            </td>

                                            <td>
                                                {
                                                    new Date(review.createdAt)
                                                        .toLocaleDateString()
                                                }
                                            </td>

                                            <td>
                                                <button className="delete-btn" onClick={() => historyDelete(review._id)}>
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>

                                    ))) : (
                                    <tr>
                                        <td colSpan={8}>
                                            No Any Data Found
                                        </td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                    Previous
                </button>

                <span>
                    {page}/{totalPages}
                </span>

                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                    Next
                </button>
            </div>
        </div>
    )
}


export default ReviewHistory;