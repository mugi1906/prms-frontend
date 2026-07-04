import React from 'react'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Navigation, CircleUserRound } from 'lucide-react';
import "../style/nav.css"
import { useEffect } from 'react';
import api from '../services/api';

function Navbar({ sidebarOpen, setSidebarOpen }) {

  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [count, setCount] = useState(0)

  const getUnreadCount = async () => {
    try {
      const response = await api.get(
        '/notification/getUnreadCount'
      );

      setCount(response.data.count)
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {

    getUnreadCount();


    const updateCount = () => {
      getUnreadCount();
    }


    window.addEventListener(
      "notificationRead",
      updateCount
    );


    return () => {

      window.removeEventListener(
        "notificationRead",
        updateCount
      )

    }


  }, [])

  return (
    <div className='nav'>
      <div className='leftsaid'>
        <div className={
          `menuBar ${sidebarOpen ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(!sidebarOpen)
          }} >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className='users'>
          <h1>{user?.name.toLocaleUpperCase()}</h1>
          <p>{user?.role}</p>
        </div>
      </div>
      <div className='rightSaid'>
        <div>
          <CircleUserRound size={25} onClick={() => navigate("/profile")} className='icon' />
        </div>
        <div className="notificationBox">
          <Navigation size={25} onClick={() => {
            navigate("/notification");
            window.dispatchEvent(new Event("notificationRead"));
          }} className='icon' />
          {
            count > 0 &&
            <span className="badge">
              {count}
            </span>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar