import React from 'react'
import { useState, useEffect } from 'react'
import api from '../../services/api'
import {
  FolderCheck,
  CircleCheck,
  Clock3,
  CircleX
} from 'lucide-react'

function ReviewerDashboard() {

  const [data, setData] = useState({});

  const reviewDashboard = async () => {
    try {
      const response = await api.get('/dashboardRoutes/reviewerDashboard');
      setData(response.data)
    } catch (error) {
      console.log(error.response.data);
    }
  }



  useEffect(() => {
    reviewDashboard()
  }, [])

  const cards = [

    {
      title: "Assigned Reviews",
      value: data.assignedProjects,
      icon: <FolderCheck />
    },

    {
      title: "Completed Reviews",
      value: data.completeProjects,
      icon: <CircleCheck />
    },

    {
      title: "Pending Reviews",
      value: data.pendingProjects,
      icon: <Clock3 />
    }
  ]

  return (

    <div className="dashboard">

      <h1>
        Reviewer Dashboard
      </h1>

      <div className="card-container">
        {
          cards.map((card, index) => (

            <div className="dash-card" key={index}>

              <div className="dash-icon">
                {card.icon}
              </div>

              <div>
                <h3>
                  {card.title}
                </h3>

                <p>
                  {card.value || 0}
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ReviewerDashboard