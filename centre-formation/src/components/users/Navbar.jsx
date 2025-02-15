import React from 'react';
import { FaHome, FaInfoCircle, FaServicestack, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';  // Import icons

import logo from '../../assets/logo11.png'
const Navbar = () => {
    return (
        <nav className="navbar bg-black p-4 text-white flex justify-between items-center">
            {/* Logo Section */}
            <div className="logo text-2xl font-bold flex items-center space-x-2">
                <img src={logo} alt="App Logo" className="w-8 h-8"/> {/* Use the imported logo */}
                <span>User Portal</span>
            </div>

            {/* Navigation Links */}
            <ul className="flex space-x-6">
                <li>
                    <a href="#home" className="flex items-center space-x-2 text-white hover:underline">
                        <FaHome />
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a href="#about" className="flex items-center space-x-2 text-white hover:underline">
                        <FaInfoCircle />
                        <span>About</span>
                    </a>
                </li>
                <li>
                    <a href="#services" className="flex items-center space-x-2 text-white hover:underline">
                        <FaServicestack />
                        <span>Services</span>
                    </a>
                </li>
                <li>
                    <a href="#profile" className="flex items-center space-x-2 text-white hover:underline">
                        <FaUserAlt />
                        <span>Profile</span>
                    </a>
                </li>
            </ul>

            {/* Logout Button */}
            <button
                onClick={() => alert("Logout functionality here")} // You can replace this with actual logout logic
                className="bg-yellow-500 px-4 py-2 rounded-md text-white flex items-center space-x-2 hover:bg-yellow-600">
                <FaSignOutAlt />
                <span>Logout</span>
            </button>
        </nav>
    );
};

export default Navbar;
