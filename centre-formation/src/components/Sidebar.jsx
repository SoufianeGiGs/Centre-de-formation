import React, { useState } from 'react';
import logo from '../assets/logo11.png'; // Add the path to your logo
import { AiFillHome, AiOutlineLogin } from 'react-icons/ai'; // Home Icon
import { FaUsers, FaCogs, FaRegComments } from 'react-icons/fa'; // Users, Settings, Comments Icons
import { IoStatsChart } from 'react-icons/io5'; // Analytics Icon
import { MdContentCopy } from 'react-icons/md'; // Content Management Icon
import { FaChevronDown } from 'react-icons/fa'; // Dropdown arrow icon
import { FaBook, FaCertificate } from 'react-icons/fa'; // Icons for Formations and Certifications

const Sidebar = ({ userId }) => {
    const [isContentOpen, setIsContentOpen] = useState(false); // State to toggle the Content dropdown
    const [selectedContent, setSelectedContent] = useState('formations'); // State to track which content (Formations or Certifications) is selected

    // Toggles
    const toggleContentDropdown = () => setIsContentOpen(!isContentOpen);
    const selectContent = (content) => setSelectedContent(content); // Set selected content to 'formations' or 'certifications'

    return (
        <div className="fixed top-0 left-0 w-80 h-screen bg-gray-800 text-white flex flex-col items-center border-r-2 border-gray-600 shadow-xl">
            {/* Logo Section */}
            <div className="p-8 text-center mb-6">
                <img src={logo} alt="Logo" className="w-24 h-24 mx-auto mb-4" />
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex flex-col items-center space-y-6 w-full px-4">
                {/* Dashboard link with dynamic userId */}
                <a href={`/admin/dashboard/${userId}`}
                   className="flex items-center space-x-4 text-xl hover:text-yellow-400 py-3 px-6 rounded-md transition duration-300 hover:bg-gray-700 w-full justify-center">
                    <AiFillHome className="w-8 h-8"/>
                    <span>Dashboard</span>
                </a>

                {/* Manage Users link */}
                <a href={`/admin/users/${userId}`}
                   className="flex items-center space-x-4 text-xl hover:text-yellow-400 py-3 px-6 rounded-md transition duration-300 hover:bg-gray-700 w-full justify-center">
                    <FaUsers className="w-8 h-8"/>
                    <span>Manage Users</span>
                </a>

                {/* Analytics link */}
                <a href="#"
                   className="flex items-center space-x-4 text-xl hover:text-yellow-400 py-3 px-6 rounded-md transition duration-300 hover:bg-gray-700 w-full justify-center">
                    <IoStatsChart className="w-8 h-8"/>
                    <span>Analytics</span>
                </a>

                {/* Dropdown Menu for Content (Formations / Certifications) */}
                <div className="w-full">
                    <button
                        onClick={toggleContentDropdown}
                        className="flex items-center space-x-4 text-xl hover:text-yellow-400 py-3 px-6 rounded-md transition duration-300 hover:bg-gray-700 w-full justify-between"
                    >
                        <div className="flex items-center justify-center space-x-4 w-full">
                            <MdContentCopy className="w-8 h-8"/>
                            <span>Content</span>
                        </div>
                        <FaChevronDown className={`w-6 h-6 ${isContentOpen ? 'transform rotate-180' : ''}`}/>
                    </button>

                    {isContentOpen && (
                        <div className="ml-6 space-y-2 mt-2">
                            {/* Link to Formations page */}
                            <a href={`/admin/formations/${userId}`}
                               className="flex items-center space-x-4 text-lg text-white bg-yellow-400 hover:bg-gray-700 rounded-md w-full justify-center py-3 px-6">
                                <FaBook className="w-6 h-6"/>
                                <span>Formations</span>
                            </a>

                            {/* Link to Certifications page */}
                            <a href={`/admin/certifications/${userId}`}
                               className="flex items-center space-x-4 text-lg text-white bg-yellow-400 hover:bg-gray-700 rounded-md w-full justify-center py-3 px-6">
                                <FaCertificate className="w-6 h-6"/>
                                <span>Certifications</span>
                            </a>
                        </div>
                    )}
                </div>


                {/* Settings link */}
                <a href="#"
                   className="flex items-center space-x-4 text-xl hover:text-yellow-400 py-3 px-6 rounded-md transition duration-300 hover:bg-gray-700 w-full justify-center">
                    <FaCogs className="w-8 h-8"/>
                    <span>Settings</span>
                </a>

                {/* Feedback link */}
                <a href="#"
                   className="flex items-center space-x-4 text-xl hover:text-yellow-400 py-3 px-6 rounded-md transition duration-300 hover:bg-gray-700 w-full justify-center">
                    <FaRegComments className="w-8 h-8"/>
                    <span>Feedback</span>
                </a>
            </nav>

            {/* Logout Button */}
            <div className="mt-auto mb-8 flex justify-center w-full">
                <a href="/login"
                   className="flex items-center space-x-4 text-xl hover:text-yellow-400 bg-red-600 text-white px-6 py-3 rounded-full transition duration-300 shadow-lg">
                    <AiOutlineLogin className="w-8 h-8"/>
                    <span>Logout</span>
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
