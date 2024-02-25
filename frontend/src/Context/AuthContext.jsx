// src/context/AuthContext.js
import React, {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [authToken, setAuthToken] = useState(null);

    const login = async (username, password) => {
        try {

            const response = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });
            const data = await response.json();
            if (data.token) {
                setAuthToken(data.token);
                localStorage.setItem('token', data.token);
            }
        } catch (error) {
            console.error("Erreur de connexion", error);
        }
    };

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem('token');
    };

    const value = {
        authToken,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
