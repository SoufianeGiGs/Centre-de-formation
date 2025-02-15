// src/pages/Admin/AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar'; // Assuming Sidebar is in the components folder

const AdminLayout = () => {
    return (
        <div className="flex">
            <Sidebar /> {/* Sidebar is displayed for all admin pages */}
            <div className="flex-1">
                <Outlet /> {/* This will render the child routes like Dashboard, Users, etc. */}
            </div>
        </div>
    );
};

export default AdminLayout;
