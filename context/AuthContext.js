import React, { createContext, useContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        {
          username: values.username,
          password: hashedPassword,
        }
      );
      const { token } = response.data;
      document.cookie = `token=${token}; Secure; HttpOnly; SameSite=Strict`;
      login(values.username, hashedPassword);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
      message.error("Login failed. Please check your username and password.");
    }    
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
