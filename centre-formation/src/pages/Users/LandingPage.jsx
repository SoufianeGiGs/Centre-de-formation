import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/users/Navbar';
import Sidebar from '../../components/users/SidebarUsers';
import FormationCard from '../../components/users/FormationCard';
import CertificationCard from '../../components/users/CertificationCard';
import Notification from '../../components/users/Notification';
import axios from 'axios';

const LandingPage = () => {
    const { userId } = useParams(); // Get userId from URL
    const [activeTab, setActiveTab] = useState('formations');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [username, setUsername] = useState("");
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);
    const [formations, setFormations] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [users, setUsers] = useState([]); // New state for users

    // Fetch user data when component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/users/${userId}`);
                setUsername(response.data.user.nom);
                setShowWelcomeModal(true);

                setTimeout(() => {
                    setShowWelcomeModal(false);
                }, 2000); // Auto-hide after 2 seconds
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    // Fetch formations and certifications
    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/formations");
                setFormations(response.data);
            } catch (error) {
                console.error("Error fetching formations:", error);
            }
        };

        const fetchCertifications = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/certifications");
                setCertifications(response.data);
            } catch (error) {
                console.error("Error fetching certifications:", error);
            }
        };

        fetchFormations();
        fetchCertifications();
    }, []); // Runs only once when component mounts

    // Fetch users for the sidebar
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/users");
                setUsers(response.data); // Set the users list
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleCourseClick = async (courseId) => {
        try {
            // Fetch full details of the course (formation or certification)
            const response = await axios.get(`http://127.0.0.1:8000/formations/${courseId}`); // Change this URL if it is certification
            setSelectedCourse(response.data);
        } catch (error) {
            console.error("Error fetching course details:", error);
        }
    };

    const handleCloseModal = () => {
        setSelectedCourse(null);
    };

    return (
        <div className="user-landing-page">
            <Navbar />
            <div className="flex">
                {/* Pass users to Sidebar */}
                <Sidebar users={users} />

                <main className="main-content p-8 w-full">
                    <Notification />

                    {/* Welcome Modal (Pop-up) */}
                    {showWelcomeModal && (
                        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="modal bg-white p-6 rounded-lg max-w-lg w-full">
                                <h2 className="text-2xl font-semibold">Welcome, {username}!</h2>
                                <p className="text-lg mt-2">We're glad to have you here. Enjoy exploring!</p>
                            </div>
                        </div>
                    )}

                    {/* Tabs to toggle between Formations and Certifications */}
                    <div className="tabs mb-4 flex space-x-6">
                        <button
                            className={`tab-button px-4 py-2 ${activeTab === 'formations' ? 'bg-black text-white' : 'bg-gray-300'} transition duration-300 ease-in-out transform hover:scale-105`}
                            onClick={() => setActiveTab('formations')}
                        >
                            Formations
                        </button>
                        <button
                            className={`tab-button px-4 py-2 ${activeTab === 'certifications' ? 'bg-black text-white' : 'bg-gray-300'} transition duration-300 ease-in-out transform hover:scale-105`}
                            onClick={() => setActiveTab('certifications')}
                        >
                            Certifications
                        </button>
                    </div>

                    {/* Content Based on Active Tab */}
                    <div className="content">
                        {activeTab === 'formations' ? (
                            <div className="formations-section mb-8">
                                <h2 className="text-xl font-bold mb-4">Featured Formations</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {formations.map((formation) => (
                                        <FormationCard key={formation.id} formation={formation} onClick={() => handleCourseClick(formation.id)} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="certifications-section mb-8">
                                <h2 className="text-xl font-bold mb-4">Featured Certifications</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {certifications.map((certification) => (
                                        <CertificationCard key={certification.id} certification={certification} onClick={() => handleCourseClick(certification.id)} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Modal for showing course details */}
                    {selectedCourse && (
                        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="modal bg-white p-6 rounded-lg max-w-lg w-full">
                                <h2 className="text-2xl font-semibold">{selectedCourse.title}</h2>
                                <img src={`http://127.0.0.1:8000/${selectedCourse.image}`} alt={selectedCourse.title} className="w-full h-40 object-cover rounded-md mt-4 mb-4" />
                                <p className="text-lg">{selectedCourse.description}</p>
                                <p className="text-md mt-4">{selectedCourse.price}</p>
                                <div className="flex justify-end mt-6">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                                        onClick={handleCloseModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            <footer className="footer bg-yellow-400 p-4 text-white text-center">
                <p>&copy; 2025 User Portal. All Rights Reserved.</p>
                <div className="links">
                    <a href="#terms" className="mr-4">Terms</a>
                    <a href="#privacy">Privacy</a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
