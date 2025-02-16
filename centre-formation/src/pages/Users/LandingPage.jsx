import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/users/Navbar';
import Sidebar from '../../components/users/SidebarUsers'; // Sidebar to show online users
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

    // Track registration status for each formation per user
    const [registrationStatus, setRegistrationStatus] = useState({});

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
                console.log('Fetched formations:', response.data);

                // Fetch registration status for each formation and user
                const status = {};
                for (let formation of response.data) {
                    console.log(`Checking registration status for user ${userId} and formation ${formation.id}`);

                    const registrationResponse = await axios.get(
                        `http://127.0.0.1:8000/formations/${formation.id}/status`, {
                            params: { user_id: userId }
                        });

                    if (registrationResponse.data.status) {
                        status[formation.id] = registrationResponse.data.status; // Store the status from the backend
                    } else {
                        status[formation.id] = 'pending'; // Default to 'pending' if no status
                    }
                }
                setRegistrationStatus(status);
                localStorage.setItem('registrationStatus', JSON.stringify(status));
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

        // Fetch online users
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/users"); // Adjust this URL as needed
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchFormations();
        fetchCertifications();
        fetchUsers(); // Get the online users
    }, [userId]); // Runs every time userId is changed

    // Handle Register button click
    const handleRegister = async (formationId) => {
        try {
            if (registrationStatus[formationId] === 'approved') {
                console.log("You are already registered for this formation.");
                return;
            }

            const response = await axios.post(`http://127.0.0.1:8000/formations/${formationId}/register`, {
                user_id: userId, // Send the user ID as well
            });

            if (response.status === 200) {
                setRegistrationStatus(prevState => {
                    const updatedStatus = { ...prevState, [formationId]: 'pending' };
                    localStorage.setItem('registrationStatus', JSON.stringify(updatedStatus));
                    return updatedStatus;
                });
                console.log('Registration successful!');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error('Error registering for the course: You are already registered!');
                setRegistrationStatus(prevState => ({
                    ...prevState,
                    [formationId]: 'approved'
                }));
            } else {
                console.error('Error registering for the course:', error);
            }
        }
    };

    // Handle course details modal
    const handleCourseClick = async (courseId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/formations/${courseId}`);
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
                <Sidebar users={users} /> {/* Display online users in Sidebar */}

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
                                        <FormationCard
                                            key={formation.id}
                                            formation={formation}
                                            registrationStatus={registrationStatus[formation.id]} // Pass status
                                            handleCourseClick={handleCourseClick}
                                            handleRegister={handleRegister} // Pass handleRegister function
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="certifications-section mb-8">
                                <h2 className="text-xl font-bold mb-4">Featured Certifications</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {certifications.map((certification) => (
                                        <CertificationCard
                                            key={certification.id}
                                            certification={certification}
                                            registrationStatus={registrationStatus[certification.id]} // Pass status
                                            handleCourseClick={handleCourseClick}
                                            handleRegister={handleRegister}
                                        />
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
        </div>
    );
};

export default LandingPage;
