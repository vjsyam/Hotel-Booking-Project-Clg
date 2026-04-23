import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('hs_user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(() => {
        return localStorage.getItem('hs_token') || null;
    });

    const login = (userData, authToken) => {
        setUser(userData);
        if (authToken) {
            setToken(authToken);
            localStorage.setItem('hs_token', authToken);
        }
        localStorage.setItem('hs_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('hs_user');
        localStorage.removeItem('hs_token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
