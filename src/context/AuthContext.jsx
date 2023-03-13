import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    try {
      // Perform login logic here
      setIsLoggedIn(true);
      setUser({ username });
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    // Perform logout logic here
    setIsLoggedIn(false);
    setUser(null);
    setError(null);
  };

  const register = async (firstName, lastName, email, password, username) => {
    try {
      // Perform registration logic here
      setIsLoggedIn(true);
      setUser({ firstName, lastName, email, password,username });
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    isLoggedIn,
    user,
    error,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
