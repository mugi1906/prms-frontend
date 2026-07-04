import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {
    FolderKanban,
    CircleCheck,
    Clock3,
    CircleX
} from 'lucide-react';

import "../../style/dashboard.css"


function DeveloperDashboard() {


    const [data, setData] = useState({});


    const developerDashboard = async () => {

        try {

            const response = await api.get(
                '/dashboardRoutes/developerDashboard'
            );

            setData(response.data);

        }

        catch(error){

            console.log(error.response?.data);

        }

    }



    useEffect(() => {

        developerDashboard();

    },[])



    const cards = [

        {
            title:"Total Projects",
            value:data.myProjects,
            icon:<FolderKanban/>
        },


        {
            title:"Approved Projects",
            value:data.approvedProjects,
            icon:<CircleCheck/>
        },


        {
            title:"Pending Projects",
            value:data.pendingProjects,
            icon:<Clock3/>
        },


        {
            title:"Rejected Projects",
            value:data.rejectedProjects,
            icon:<CircleX/>
        }


    ]

    return (

        <div className="dashboard">

            <h1>
                Developer Dashboard
            </h1>

            <div className="card-container">

                {
                    cards.map((card,index)=>(


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


export default DeveloperDashboard;