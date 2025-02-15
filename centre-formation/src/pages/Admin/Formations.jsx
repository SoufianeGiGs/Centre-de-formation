import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar'; // Import Sidebar
import { IoMdAdd } from 'react-icons/io'; // Add Icon
import { FaBell } from 'react-icons/fa'; // Notifications Icon
import { Line } from 'react-chartjs-2'; // Import the Chart.js Line component
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,ArcElement, Title, Tooltip, Legend } from 'chart.js';
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title,ArcElement, Tooltip, Legend);

const Formations = () => {
    const [formations, setFormations] = useState([]);
    const [stats, setStats] = useState({
        totalFormations: 0,
        totalParticipants: 0,
        totalRevenue: 0,
    });

    const [newFormation, setNewFormation] = useState({
        title: '',
        description: '',
        category: '',
        instructor: '',
        duration: '',
        price: '',
        image: null,
    });

    const [selectedFormation, setSelectedFormation] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [formationDetails, setFormationDetails] = useState({
        modulesCount: 1,
        modules: [{ description: '', pdf: '', video: '' }],
        price: '',
        otherDetails: '',
    });

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Fetch formations from the API
    useEffect(() => {
        fetch('http://127.0.0.1:8000/formations')
            .then((response) => response.json())
            .then((data) => {
                setFormations(data); // Set fetched formations
                setStats({
                    totalFormations: data.length,
                    totalParticipants: 120,
                    totalRevenue: data.reduce((total, formation) => {
                        return total + (formation.price === 'Free' ? 0 : parseFloat(formation.price.replace('$', '')));
                    }, 0),
                });
            })
            .catch((error) => {
                console.error('Error fetching formations:', error);
            });
    }, []);

    // Handle Form Changes for Adding New Formation
    const handleFormationChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setNewFormation((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        } else {
            setNewFormation((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Handle Form Submission (Add Formation)
    const handleFormationSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', newFormation.title);
        formData.append('description', newFormation.description);
        formData.append('category', newFormation.category);
        formData.append('instructor', newFormation.instructor);
        formData.append('duration', newFormation.duration);
        formData.append('price', newFormation.price);
        if (newFormation.image) {
            formData.append('image', newFormation.image);
        }

        fetch('http://127.0.0.1:8000/formations', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setFormations((prev) => [...prev, data.formation]);
            })
            .catch((error) => {
                console.error('Error adding formation:', error);
            });
    };

    // Handle Manage Button Click
    const handleManageClick = (formation) => {
        setSelectedFormation(formation);
        setModalOpen(true);
    };

    // Handle Modal Input Changes (for Modules)
    const handleModalChange = (e, index) => {
        const { name, value } = e.target;
        const updatedModules = [...formationDetails.modules];
        updatedModules[index] = { ...updatedModules[index], [name]: value };
        setFormationDetails((prev) => ({
            ...prev,
            modules: updatedModules,
        }));
    };

    // Handle Change for Number of Modules
    const handleModulesCountChange = (e) => {
        const { value } = e.target;
        const newModulesCount = parseInt(value, 10) || 1;
        const newModules = Array.from({ length: newModulesCount }, () => ({ description: '', pdf: '', video: '' }));
        setFormationDetails((prev) => ({
            ...prev,
            modulesCount: newModulesCount,
            modules: newModules,
        }));
    };

    // Handle Modal Submit
    const handleModalSubmit = (e) => {
        e.preventDefault();
        console.log('Updated Formation Details:', formationDetails);
        setModalOpen(false);
    };

    // Chart Data for Categories
    const chartData = {
        labels: ['Frontend', 'Backend', 'Data Science', 'DevOps'],
        datasets: [
            {
                label: 'Number of Formations',
                data: [
                    formations.filter((formation) => formation.category === 'Frontend').length,
                    formations.filter((formation) => formation.category === 'Backend').length,
                    formations.filter((formation) => formation.category === 'Data Science').length,
                    formations.filter((formation) => formation.category === 'DevOps').length,
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const chartData2 = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Formations by Instructor',
                data: [5, 15, 25, 35, 45],
                borderColor: 'rgba(255,99,132,1)',
                backgroundColor: 'rgba(255,99,132,0.2)',
                fill: true,
            },
        ],
    };

    // Paginate the formations
    const indexOfLastFormation = currentPage * itemsPerPage;
    const indexOfFirstFormation = indexOfLastFormation - itemsPerPage;
    const currentFormations = formations.slice(indexOfFirstFormation, indexOfLastFormation);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex">
            {/* Sidebar Component */}
            <div className="w-80 bg-gray-800">
                <Sidebar />
            </div>

            {/* Main Content Section */}
            <div className="flex-1 p-8 bg-gray-900 min-h-screen">
                {/* Top Card with Gradient */}
                <div className="bg-gradient-to-r from-purple-500 to-indigo-800 p-6 rounded-lg shadow-lg mb-8 text-white flex items-center">
                    <h2 className="text-4xl font-extrabold">Formations</h2>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    <div className="bg-gradient-to-r from-gray-700 to-orange-500 p-6 rounded-lg shadow-lg text-white text-center">
                        <h3 className="text-xl font-semibold text-white">Total Formations</h3>
                        <p className="text-2xl">{stats.totalFormations}</p>
                    </div>
                    <div className="bg-gradient-to-r from-gray-700 to-yellow-500 p-6 rounded-lg shadow-lg text-white text-center">
                        <h3 className="text-xl font-semibold">Total Participants</h3>
                        <p className="text-2xl">{stats.totalParticipants}</p>
                    </div>
                    <div className="bg-gradient-to-r from-gray-700 to-pink-600 p-6 rounded-lg shadow-lg text-white text-center">
                        <h3 className="text-xl font-semibold">Total Revenue</h3>
                        <p className="text-2xl">${stats.totalRevenue}</p>
                    </div>
                </div>

                {/* Formations List */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                    <h1 className="text-3xl font-extrabold mb-4 text-white">Liste des Formations</h1>
                    <table className="min-w-full table-auto">
                        <thead>
                        <tr className="border-b">
                            <th className="py-2 px-4 text-left text-white">Titre</th>
                            <th className="py-2 px-4 text-left text-white">Description</th>
                            <th className="py-2 px-4 text-left text-white">Catégorie</th>
                            <th className="py-2 px-4 text-left text-white">Formateur</th>
                            <th className="py-2 px-4 text-left text-white">Durée</th>
                            <th className="py-2 px-4 text-left text-white">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentFormations.map((formation, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4 text-white">{formation.title}</td>
                                <td className="py-2 px-4 text-white">{formation.description}</td>
                                <td className="py-2 px-4 text-white">{formation.category}</td>
                                <td className="py-2 px-4 text-white">{formation.instructor}</td>
                                <td className="py-2 px-4 text-white">{formation.duration}</td>
                                <td className="py-2 px-4 text-white">
                                    <button
                                        onClick={() => handleManageClick(formation)}
                                        className="bg-yellow-600 text-white py-2 px-4 rounded"
                                    >
                                        Manage
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md"
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md ml-4"
                            disabled={currentPage === Math.ceil(formations.length / itemsPerPage)}
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* Form to Add New Formation */}
                <div className="flex justify-center items-start min-h-screen p-8">
                    <div className="flex space-x-8 w-full max-w-screen-xl">
                        {/* Chart Section (Left) */}
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mt-8">
                            <h3 className="text-xl font-semibold mb-4 text-white">Chart of Formations by Category</h3>
                            <Line data={chartData} />
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mt-8">
                            <h3 className="text-xl font-semibold mb-4 text-white">Chart of Formations by Instructor</h3>
                            <Line data={chartData2} />
                        </div>

                        {/* Form Section (Right) */}
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mt-8">
                            <h3 className="text-xl font-semibold mb-4 text-white">Ajouter une Formation</h3>
                            <form onSubmit={handleFormationSubmit} encType="multipart/form-data">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Titre</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={newFormation.title}
                                        onChange={handleFormationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Description</label>
                                    <textarea
                                        name="description"
                                        value={newFormation.description}
                                        onChange={handleFormationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Catégorie</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={newFormation.category}
                                        onChange={handleFormationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Formateur</label>
                                    <input
                                        type="text"
                                        name="instructor"
                                        value={newFormation.instructor}
                                        onChange={handleFormationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Durée</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={newFormation.duration}
                                        onChange={handleFormationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Prix</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={newFormation.price}
                                        onChange={handleFormationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleFormationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-500 text-white rounded-md"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                    >
                                        Ajouter Formation
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Formations;
