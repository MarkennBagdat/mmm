import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage"; // Убедитесь, что путь правильный
import MainLayout from "./layouts/MainLayout/MainLayout"; // Убедитесь, что путь правильный
import { AuthProvider, useAuth  } from "./context/AuthContext"; // Adjust path as necessary
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute"; // Убедитесь, что путь правильный
import "./assets/styles/main.scss";
import "./assets/styles/index.css";
import "./assets/styles/Login.module.css";
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <MainLayout>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            {/* <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          /> */}
          
            <Route exact path="/" element={<Dashboard />} />
          </Routes>
        </AuthProvider>
      </MainLayout>
    </Router>
  );
};

export default App;
