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

        sessionStorage.removeItem("guestSessionId");
        sessionStorage.removeItem("guestRole");
        sessionStorage.removeItem("isGuest");

        setUser(userData);
    };


    const guestLogin = async (role = "admin") => {

        const response = await api.post(
            "/guest/start",
            {
                role: role
            }
        );

        const guestData = response.data;

        sessionStorage.setItem(
            "user",
            JSON.stringify(guestData.user)
        );

        sessionStorage.setItem(
            "guestSessionId",
            guestData.sessionId
        );

        sessionStorage.setItem(
            "guestRole",
            guestData.role
        );

        sessionStorage.setItem(
            "isGuest",
            "true"
        );

        sessionStorage.removeItem("token");

        setUser(guestData.user);

        return guestData;
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