import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar'; // Import Sidebar
import { IoMdAdd } from 'react-icons/io'; // Add Icon
import { FaBell } from 'react-icons/fa'; // Notifications Icon
import { Line } from 'react-chartjs-2'; // Chart library (for progress analytics)
import { Chart } from 'chart.js';
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalFormations: 0,
        totalContactMessages: 0,
    });

    const [recentActivities, setRecentActivities] = useState([
        'New user "John Doe" registered.',
        'Training "React Basics" has been completed.',
        'New message received from "Jane Doe".',
    ]);

    const [upcomingEvents, setUpcomingEvents] = useState([
        { date: '2024-12-24', title: 'Introduction to Python - Session 1' },
        { date: '2024-12-26', title: 'Advanced JavaScript - Session 1' },
    ]);

    useEffect(() => {
        // Fetch stats data from the backend here
        // For now, we’ll use mock data
        setStats({
            totalUsers: 120,
            totalFormations: 5,
            totalContactMessages: 30,
        });
    }, []);

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
            {
                label: 'Course Completion (%)',
                data: [30, 50, 70, 85, 60, 75, 90, 100],
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="flex">
            {/* Sidebar Component */}
            <div className="w-80 bg-gray-800">
                <Sidebar />
            </div>

            {/* Main Content Section */}
            <div className="flex-1 p-8 bg-gray-900 text-white min-h-screen">
                {/* Top Card with Gradient */}
                <div
                    className="bg-gradient-to-r from-yellow-400 to-gray-700 p-6 rounded-lg shadow-lg mb-8 text-white min-h-29 flex items-center">
                    <h2 className="text-3xl font-semibold">Dashboard</h2>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    <div className="bg-gradient-to-r from-gray-900 to-pink-600 p-6 rounded-lg shadow-lg text-white text-center">
                        <h3 className="text-xl font-semibold">Total Users</h3>
                        <p className="text-2xl">{stats.totalUsers}</p>
                    </div>
                    <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 rounded-lg shadow-lg text-white text-center">
                        <h3 className="text-xl font-semibold">Total Formations</h3>
                        <p className="text-2xl">{stats.totalFormations}</p>
                    </div>
                    <div className="bg-gradient-to-r from-gray-700 to-purple-500 p-6 rounded-lg shadow-lg text-white text-center">
                        <h3 className="text-xl font-semibold">Total Contact Messages</h3>
                        <p className="text-2xl">{stats.totalContactMessages}</p>
                    </div>
                </div>

                {/* Course Completion Chart */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                    <h3 className="text-xl font-semibold mb-4">Course Completion Analytics</h3>
                    <div className="h-72"> {/* Set a fixed height for the chart */}
                        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                    <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
                    <ul className="list-disc pl-6">
                        {recentActivities.map((activity, index) => (
                            <li key={index} className="text-gray-300">{activity}</li>
                        ))}
                    </ul>
                </div>

                {/* Upcoming Events */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                    <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
                    <ul className="list-disc pl-6">
                        {upcomingEvents.map((event, index) => (
                            <li key={index} className="text-gray-300">
                                <strong>{event.date}</strong>: {event.title}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                    <div
                        className="bg-green-500 p-6 rounded-lg shadow-lg text-white text-center cursor-pointer hover:bg-green-600">
                        <IoMdAdd className="text-4xl mb-2" />
                        <p>Add New User</p>
                    </div>
                    <div
                        className="bg-blue-500 p-6 rounded-lg shadow-lg text-white text-center cursor-pointer hover:bg-blue-600">
                        <IoMdAdd className="text-4xl mb-2" />
                        <p>Add New Course</p>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <FaBell className="mr-2" />
                        Notifications
                    </h3>
                    <p className="text-gray-300">You have 5 unread messages</p>
                    <p className="text-gray-300">2 new student registrations</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
