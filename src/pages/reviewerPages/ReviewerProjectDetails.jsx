import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import api from '../../services/api';

function ReviewerProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const getProject = async (e) => {
    try {
      const response = await api.get(`/project/singleProject/${id}`);
      setProject(response.data);

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProject();
  }, []);
  return (
    <div>

      <h1>
        Project Details
      </h1>

      <h2>
        {project?.projectName}
      </h2>

      <p>
        {project?.projectdescription}
      </p>

      <p>
        Project Link:
        {project?.githubUrl}
      </p>

      <p>
        Status:
        {project?.status}
      </p>

    </div>

  )
}

export default ReviewerProjectDetails



