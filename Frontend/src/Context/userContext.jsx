import React, { createContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication status
  const [loading, setLoading] = useState(false); // For loading state

  // Sign up user
  const signUp = async (userData) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4000/auth/signup', userData);
      if (response.status === 200) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sign in user
  const signIn = async (credentials) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4000/auth/signIn', credentials);
      if (response.status === 200) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error during sign in:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sign out user
  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, signUp, signIn, signOut, loading }}>
      {children}
    </UserContext.Provider>
  );
};
