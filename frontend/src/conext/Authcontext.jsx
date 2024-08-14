// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); 
    
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log('Token from localStorage:', token);
    setIsAuthenticated(!!token); // Convert token to boolean
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
