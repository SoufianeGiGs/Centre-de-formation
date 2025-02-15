// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import Users from './pages/Admin/Users';
import Formations from './pages/Admin/Formations';
import Contact from './pages/Admin/Contact';
import Certifications from './pages/Admin/Certifications';
import LandingPageUSers from './pages/Users/LandingPage'// Import Certifications component


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/users/:userId" element={<LandingPageUSers />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard/:userId" element={<Dashboard />} />
                    <Route path="users/:userId" element={<Users />} />
                    <Route path="formations/:userId" element={<Formations />} />
                    <Route path="contact/:userId" element={<Contact />} />
                    <Route path="certifications/:userId" element={<Certifications />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
