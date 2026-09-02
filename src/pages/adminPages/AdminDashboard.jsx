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
import { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import "../../style/dashboard.css"

function AdminDashboard() {

    const { user } = useContext(AuthContext);

    const [data, setData] = useState({});

    const adminDashboard = async () => {

        const isGuest =
            sessionStorage.getItem("isGuest") === "true";

        if (isGuest) {

            const sessionId =
                sessionStorage.getItem("guestSessionId");

            try {

                const response = await api.get(
                    `/guest/data/${sessionId}`
                );

                const guestData = response.data.data;

                const users = guestData.users || [];
                const projects = guestData.projects || [];

                setData({
                    totalUsers: users.length,

                    totaldeveloper: users.filter(
                        user => user.role === "developer"
                    ).length,

                    totalRviewer: users.filter(
                        user => user.role === "reviewer"
                    ).length,

                    totalProjects: projects.length,

                    approvedProjects: projects.filter(
                        project => project.status === "Completed"
                    ).length,

                    pendingProjects: projects.filter(
                        project => project.status === "Pending"
                    ).length,

                    rejectedProjects: projects.filter(
                        project => project.status === "Rejected"
                    ).length
                });

            } catch (error) {

                console.log(
                    error.response?.data || error.message
                );
            }

            return;
        }

        try {

            const response = await api.get(
                '/dashboardRoutes/adminDashboard'
            );

            setData(response.data);

        } catch (error) {

            console.log(
                error.response?.data || error.message
            );
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

                        <div
                            className="dash-card"
                            key={index}
                        >

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