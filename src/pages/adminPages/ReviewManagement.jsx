import React, { useState, useEffect } from 'react'
import api from "../../services/api";


function ReviewManagement() {

    const [reviews, setReviews] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState("newest");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchLoading, setSearchLoading] = useState(false)

    const allReviews = async (isSearch = false) => {
        if (isSearch) {
            setSearchLoading(true)
        }
        else {
            setLoading(true);
        }
        setError('')
        try {
            await new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );
            const response = await api.get(`/reviwe/allReview?search=${search}&page=${page}&sort=${sort}`);
            setReviews(
                response.data.allReview
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
            }
            else {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        allReviews(false);
    }, []);

    useEffect(() => {
        if (loading) return;
        allReviews(true);
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

    if (!loading && reviews.length === 0) {
        return <h2>No reviews Found</h2>;
    }

    return (
        <div className="table-page">
            <h1>
                Review Management
            </h1>

            <div className="filter">
                <input
                    placeholder="Search Comment"
                    className="search-input"
                    value={search}
                    onChange={(e) => {

                        setSearch(e.target.value);

                        setPage(1);

                    }}
                />
                <select onChange={(e) => setSort(e.target.value)} className="sort-select">

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
                                Developer
                            </th>

                            <th>
                                Project
                            </th>

                            <th>
                                Reviewer
                            </th>

                            <th>
                                Comment
                            </th>

                            <th>
                                Status
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
                                reviews.length > 0 ? (
                                    reviews.map((review, index) => (

                                        <tr key={review._id}>

                                            <td> {(page - 1) * 5 + index + 1} </td>

                                            <td>
                                                {
                                                    review.projectId?.developerId?.name
                                                        ?
                                                        review.projectId.developerId.name
                                                        :
                                                        "No Developer"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    review.projectId?.projectName
                                                }
                                            </td>

                                            <td>
                                                {
                                                    review.reviewerId?.name
                                                        ?
                                                        review.reviewerId.name
                                                        :
                                                        "No Reviewer"
                                                }
                                            </td>

                                            <td>
                                                {review.comments || "No Comments"}
                                            </td>

                                            <td >

                                                <b>
                                                    {review.status.toUpperCase()}
                                                </b>

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

        </div>
    )
}


export default ReviewManagement;