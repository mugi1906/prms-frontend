import React from 'react'
import { Trash, ArrowLeft, UserRound } from 'lucide-react';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../services/api'
import "../../style/notification.css"

function NotificationDetails() {
    const { senderId } = useParams();
    const [messages, setmessages] = useState([]);
    const navigate = useNavigate();
    const [loadind, setLoading] = useState(false)
    const [error, setError] = useState('')

    const getMessages = async () => {
        setLoading(true);
        setError('')
        try {

            await new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );
            const response = await api.get(`/notification/conversation/${senderId}`)
            setmessages(response.data)
        } catch (error) {
            console.log(error.response.data)
        }
        finally {
            setLoading(false)
        }
    }
    const deleteNotification = async (id) => {
        try {
            const response = await api.delete(`/notification/deletenotification/${id}`);
            getMessages();
        } catch (error) {
            console.log(error.response.Date)
        }
    }

    useEffect(() => {
        getMessages();
    }, [])

    if (loadind) {
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

    if (!loadind && messages.length === 0) {
        return <h2>No messages Found</h2>;
    }

    return (
        <div className="chat-page">

            <div className="chat-header">

                <button
                    className="back-Icon"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft />
                </button>

                <div className="user-Icon">
                    <UserRound />
                </div>

                <h2>
                    {
                        messages.length > 0
                            ? messages[0]?.senderId?.name
                            : "Notification"
                    }
                </h2>

            </div>

            <div className="messages">

                {
                    messages.map((msg) => (

                        <div
                            className="message-box"
                            key={msg._id}
                        >

                            <div className="message">

                                <div className="message-header">

                                    <h3 className="message-title">
                                        Notification
                                    </h3>

                                    <button
                                        className="delete-message"
                                        onClick={() => deleteNotification(msg._id)}
                                    >
                                        <Trash size={18} />
                                    </button>

                                </div>

                                <p className="message-text">
                                    {msg.message}
                                </p>

                                {msg.comment && (
                                    <div className="comment-box">
                                        <span className="comment-label">
                                            Reviewer Comment
                                        </span>

                                        <p className="comment-text">
                                            {msg.comment}
                                        </p>
                                    </div>
                                )}

                                <span className="message-time">
                                    {new Date(msg.createdAt).toLocaleString()}
                                </span>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>
    );
}

export default NotificationDetails