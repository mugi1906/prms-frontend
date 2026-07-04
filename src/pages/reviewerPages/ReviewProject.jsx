import React from 'react'
import { ChevronLeft } from 'lucide-react';
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../services/api'
import "../../style/Project.css"

function ReviewProject() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState('');

  const getProject = async () => {

    try {
      const response = await api.get(`/project/singleProject/${id}`);
      setProject(response.data)
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const updateReview = async (status) => {

    try {
      const response = await api.post(`/reviwe/createReview`,
        {
          projectId: id,
          comments: comments,
          status: status
        }
      )

      console.log(response.data);

      toast.success("Review Successfully Submited",
        {
          autoClose: 2000,
          theme: "colored"
        }
      )
      navigate(-1)


    } catch (error) {
      console.log(error.response?.data);
    }
  }

  useEffect(() => {
    getProject();
  }, [])

  return (
    <div className="review-page">

      <div className="review-card">

        <div className="review-header">
          <div className='project-header-child'>
            <button className='back-btn' onClick={() => navigate(-1)}>
              <ChevronLeft />
            </button>

            <h1>
              Review Project
            </h1>

          </div>

          <span>
            {project?.status}
          </span>

        </div>

        <div className="review-body">

          <div className="info-box">

            <label>
              Project Name
            </label>

            <h2>
              {project?.projectName}
            </h2>

          </div>

          <div className="info-box">

            <label>
              Description
            </label>

            <p>
              {project?.projectdescription}
            </p>
          </div>

          <div className="comment-box">
            <label>
              Review Comment
            </label>

            <textarea
              placeholder="Enter your review comment"
              value={comments}
              onChange={(e) =>
                setComments(e.target.value)
              }
            />
          </div>

          <div className="review-buttons">
            <button
              className="approve-btn"
              onClick={() =>
                updateReview("approved")}
            >
              Approve
            </button>

            <button
              className="reject-btn"
              onClick={() =>
                updateReview("rejected")}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewProject