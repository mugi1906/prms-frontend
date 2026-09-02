import { createContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem("user") || "null")
    );

    const login = (userData, token) => {

        sessionStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        sessionStorage.setItem(
            "token",
            token
        );

        setUser(userData);
    };

    const guestLogin = (userData, sessionId, role) => {

        sessionStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        sessionStorage.setItem(
            "guestSessionId",
            sessionId
        );

        sessionStorage.setItem(
            "guestRole",
            role
        );

        sessionStorage.setItem(
            "isGuest",
            "true"
        );

        setUser(userData);
    };

    const logOut = async () => {

        const isGuest =
            sessionStorage.getItem("isGuest") === "true";

        try {

            if (isGuest) {

                const sessionId =
                    sessionStorage.getItem("guestSessionId");

                if (sessionId) {
                    await api.delete(
                        `/guest/end/${sessionId}`
                    );
                }

            } else {

                await api.post("/auth/logout");

            }

        } catch (error) {

            console.log(
                error.response?.data || error.message
            );

        } finally {

            sessionStorage.removeItem("user");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("guestSessionId");
            sessionStorage.removeItem("guestRole");
            sessionStorage.removeItem("isGuest");

            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                guestLogin,
                logOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};