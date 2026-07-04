import React from 'react'
import { Trash2, UserRound } from 'lucide-react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import "../../style/notification.css"


function Notification() {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [loadind, setLoading] = useState(true);
    const [error, setError] = useState('')
    const [search, setSearch] = useState('')
    const [searchLoading, setSearchLoading] = useState(false);

    const getUser = async (isSearch = false) => {
        if (isSearch) {
            setSearchLoading(true);
        }
        else {
            setLoading(true);
        }

        setError('')
        try {
            await new Promise((resolve) =>
                setTimeout(resolve, 1000)
            );
            const response = await api.get(`/notification/users?search=${search}`)
            setUsers(response.data)
        } catch (error) {
            console.log(error.response.data)
        }
        finally {
            if (isSearch) {
                setSearchLoading(false);
            }
            else {
                setLoading(false);
            }
        }
    }

    const deleteChat = async (senderId) => {
        try {
            await api.delete(`/notification/conversation/${senderId}`);
            getUser();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (loadind) return;
        getUser(true)
    }, [search]);

    if (loadind) {
        return <div className="spinner"></div>;
    }

    if (error) {
        return (
            <div className="error-box">
                <h3>{error}</h3>
                <button onClick={getUser}>Retry</button>
            </div>
        )
    }

    if (!loadind && users.length === 0) {
        return <h2>No users Found........</h2>;
    }

    return (
        <div className="notification-page">


            <h1 className="notification-title">
                Notifications
            </h1>

            <div className="filter">
                <input
                    placeholder="Search Comment"
                    className="search-input"
                    value={search}
                    onChange={(e) => {

                        setSearch(e.target.value);

                    }}
                /></div>

            <div className="chat-list">
                {
                    searchLoading ?
                        (
                            <div className="list-spinner">
                                <div className="spinner"></div>
                            </div>
                        ) :
                        users.length > 0 ?

                            users.map(user => (

                                <div
                                    className="chat-item"
                                    key={user._id}
                                    onClick={() => navigate(
                                        `/notification/${user._id}`
                                    )}
                                >

                                    <div className="chat-user">

                                        <div className="user-Icon">
                                            <UserRound />
                                        </div>

                                        <div>

                                            <h3>
                                                🔔 {user.sender.name}
                                            </h3>

                                            <p>
                                                {user.lastMessage}
                                            </p>

                                            <span className="chat-time">
                                                {
                                                    new Date(user.lastTime)
                                                        .toLocaleString()
                                                }

                                            </span>
                                        </div>
                                    </div>
                                    {
                                        user.unreadCount > 0 &&

                                        <span className="unread">

                                            {user.unreadCount}

                                        </span>

                                    }

                                    <button

                                        className="delete-chat"

                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteChat(user._id);
                                        }}
                                    >

                                        <Trash2 size={18} />

                                    </button>

                                </div>

                            ))
                            :
                            <h1>
                                No Any Notification Found
                            </h1>
                }
            </div>
        </div>
    )
}

export default Notification