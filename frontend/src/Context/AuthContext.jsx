import React, {createContext, useContext, useState, useEffect} from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        // Mettre à jour authToken à partir du localStorage au chargement de l'app
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
        }
    }, []);

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
            if (data.access) {
                setAuthToken(data.access);
                localStorage.setItem('token', data.access);
            }
        } catch (error) {
            console.error("Erreur de connexion", error);
        }
    };

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem('token');
    };

    // Ajout d'une propriété isAuthenticated pour vérifier facilement l'état de connexion
    const isAuthenticated = authToken !== null;

    const value = {
        authToken,
        isAuthenticated,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
