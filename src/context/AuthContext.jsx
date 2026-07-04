import { createContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user") || "null"));

    const login = (userData, token) => {

        sessionStorage.setItem("user", JSON.stringify(userData));

        sessionStorage.setItem('token', token);

        setUser(userData);
    }

    const logOut = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.log(
                error.response?.data || error.message
            );
        } finally {
            sessionStorage.removeItem("user");
            sessionStorage.removeItem('token');
            setUser(null);
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}