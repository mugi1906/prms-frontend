import React from 'react'
import {
    Users,
    Code2,
    UserCheck,
    FolderKanban,
    CircleCheck,
    Clock3,
    CircleX
} from 'lucide-react'
import { useState, useEffect } from 'react';
import api from '../../services/api';
import "../../style/dashboard.css"

function AdminDashboard() {

    const [data, setData] = useState({});

    const adminDashboard = async () => {
        try {
            const response = await api.get('/dashboardRoutes/adminDashboard');
            setData(response.data)
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        adminDashboard()
    }, [])

    const cards = [


        {
            title: "Total Users",
            value: data.totalUsers,
            icon: <Users />
        },


        {
            title: "Developers",
            value: data.totaldeveloper,
            icon: <Code2 />
        },


        {
            title: "Reviewers",
            value: data.totalRviewer,
            icon: <UserCheck />
        },


        {
            title: "Total Projects",
            value: data.totalProjects,
            icon: <FolderKanban />
        },


        {
            title: "Approved Projects",
            value: data.approvedProjects,
            icon: <CircleCheck />
        },


        {
            title: "Pending Projects",
            value: data.pendingProjects,
            icon: <Clock3 />
        },


        {
            title: "Rejected",
            value: data.rejectedProjects,
            icon: <CircleX />
        }
    ]

    return (
        <div className="dashboard">


            <h1>
                Admin Dashboard
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

export default AdminDashboard;