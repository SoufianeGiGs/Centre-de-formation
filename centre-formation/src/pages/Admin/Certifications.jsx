import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making API requests
import { FaRegWindowClose } from 'react-icons/fa';
import { MdAddCircleOutline } from 'react-icons/md';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Registering the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Certifications = () => {
    const [certifications, setCertifications] = useState([]);
    const [newCertification, setNewCertification] = useState({
        title: '',
        description: '',
        category: '',
        instructor: '',
        duration: '',
        price: '0',
        image: null,
        chapters_count: 0,
        tests_count: 0,
        issued_date: '',
        validity_period: 0,
        certification_code: '',
        requirements: '',
        status: 'active',
    });

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);
    const [selectedCertification, setSelectedCertification] = useState(null);

    // Fetch certifications from the backend
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/certifications')
            .then(response => {
                setCertifications(response.data); // Update certifications state
            })
            .catch(error => {
                console.error("There was an error fetching the certifications!", error);
            });
    }, []);

    // Handle the changes in the input fields
    const handleCertificationChange = (e) => {
        const { name, value } = e.target;
        setNewCertification(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setNewCertification(prev => ({
            ...prev,
            image: e.target.files[0],
        }));
    };

    // Submit the new certification
    const handleAddCertification = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in newCertification) {
            formData.append(key, newCertification[key]);
        }

        axios.post('http://127.0.0.1:8000/certifications', formData)
            .then(response => {
                setCertifications(prev => [...prev, response.data.certification]); // Add the new certification
                setNewCertification({
                    title: '',
                    description: '',
                    category: '',
                    instructor: '',
                    duration: '',
                    price: '',
                    image: null,
                    chapters_count: 0,
                    tests_count: 0,
                    issued_date: '',
                    validity_period: 0,
                    certification_code: '',
                    requirements: '',
                    status: 'active',
                });
                setIsAddModalOpen(false); // Close the modal
            })
            .catch(error => {
                console.error("There was an error adding the certification!", error);
            });
    };

    // Handle opening the manage modal
    const handleManageClick = (cert) => {
        setSelectedCertification(cert);
        setIsManageModalOpen(true);
    };

    // Close the modal
    const handleModalClose = () => {
        setIsAddModalOpen(false);
        setIsManageModalOpen(false);
        setSelectedCertification(null);
    };

    // Static chart data
    const chartData = {
        labels: ['Certification 1', 'Certification 2', 'Certification 3'],
        datasets: [
            {
                label: 'Participants',
                data: [120, 150, 90],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const pieChartData = {
        labels: ['Active', 'Expired', 'Archived'],
        datasets: [
            {
                data: [60, 30, 10],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const pieChartOptions = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        let label = tooltipItem.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += tooltipItem.raw;
                        return label;
                    },
                },
            },
        },
    };


// In your JSX, update the Pie chart rendering:
    <Pie data={pieChartData} options={pieChartOptions} />

    return (
        <div className="bg-gray-800 text-white p-8 ml-80">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                <div
                    className="bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-lg shadow-lg text-white text-center">
                    <h3 className="text-xl font-semibold">Total Certifications</h3>
                    <p className="text-2xl">{certifications.length}</p>
                </div>
                <div
                    className="bg-gradient-to-r from-yellow-500 to-pink-600 p-6 rounded-lg shadow-lg text-white text-center">
                    <h3 className="text-xl font-semibold">Total Participants</h3>
                    <p className="text-2xl">{certifications.length * 10}</p>
                </div>
                <div
                    className="bg-gradient-to-r from-purple-500 to-indigo-700 p-6 rounded-lg shadow-lg text-white text-center">
                    <h3 className="text-xl font-semibold">Total Revenue</h3>
                    <p className="text-2xl">${certifications.reduce((total, cert) => {
                        const price = cert.price ? parseFloat(cert.price.replace('$', '')) : 0;
                        return total + price;
                    }, 0)}
                    </p>
                </div>
            </div>

            <h2 className="text-3xl font-extrabold text-yellow-500 mb-6">Manage Certifications</h2>

            {/* Certifications Table */}
            <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-4">All Certifications</h3>
                <table className="min-w-full bg-gray-800 rounded-lg shadow-md">
                    <thead>
                    <tr className="border-b">
                        <th className="py-2 px-4 text-left text-white">Title</th>
                        <th className="py-2 px-4 text-left text-white">Description</th>
                        <th className="py-2 px-4 text-left text-white">Category</th>
                        <th className="py-2 px-4 text-left text-white">Instructor</th>
                        <th className="py-2 px-4 text-left text-white">Duration</th>
                        <th className="py-2 px-4 text-left text-white">Price</th>
                        <th className="py-2 px-4 text-left text-white">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {certifications.map((cert, index) => (
                        <tr key={index} className="border-b">
                            <td className="py-2 px-4 text-white">{cert.title}</td>
                            <td className="py-2 px-4 text-white">{cert.description}</td>
                            <td className="py-2 px-4 text-white">{cert.category}</td>
                            <td className="py-2 px-4 text-white">{cert.instructor}</td>
                            <td className="py-2 px-4 text-white">{cert.duration}</td>
                            <td className="py-2 px-4 text-white">{cert.price}</td>

                            <td className="py-2 px-4 text-white">
                                <button
                                    onClick={() => handleManageClick(cert)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                                >
                                    Manage
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Button to open the modal */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-green-500 text-white px-6 py-3 rounded-md flex items-center space-x-2"
                >
                    <MdAddCircleOutline className="w-6 h-6"/>
                    <span>Add New Certification</span>
                </button>
            </div>

            {/* Add Certification Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-gray-800 p-8 rounded-lg w-1/2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-semibold text-white mb-4">Add New Certification</h3>
                            <FaRegWindowClose
                                className="text-white w-6 h-6 cursor-pointer"
                                onClick={handleModalClose}
                            />
                        </div>
                        <form onSubmit={handleAddCertification}>
                            {/* Certification Form */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                {/* Title */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={newCertification.title}
                                        onChange={handleCertificationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md text-gray-900"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Description</label>
                                    <textarea
                                        name="description"
                                        value={newCertification.description}
                                        onChange={handleCertificationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md text-gray-900"
                                        required
                                    />
                                </div>

                                {/* Category */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={newCertification.category}
                                        onChange={handleCertificationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md text-gray-900"
                                        required
                                    />
                                </div>

                                {/* Instructor */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Instructor</label>
                                    <input
                                        type="text"
                                        name="instructor"
                                        value={newCertification.instructor}
                                        onChange={handleCertificationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md text-gray-900"
                                        required
                                    />
                                </div>

                                {/* Duration */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Duration</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={newCertification.duration}
                                        onChange={handleCertificationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md text-gray-900"
                                        required
                                    />
                                </div>

                                {/* Price */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Price</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={newCertification.price}
                                        onChange={handleCertificationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md text-gray-900"
                                        required
                                    />
                                </div>

                                {/* Chapters Count */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Chapters Count</label>
                                    <input
                                        type="number"
                                        name="chapters_count"
                                        value={newCertification.chapters_count}
                                        onChange={handleCertificationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md text-gray-900"
                                        required
                                    />
                                </div>

                                {/* Tests Count */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Tests Count</label>
                                    <input
                                        type="number"
                                        name="tests_count"
                                        value={newCertification.tests_count}
                                        onChange={handleCertificationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md text-gray-900"
                                        required
                                    />
                                </div>

                                {/* Issued Date */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Issued Date</label>
                                    <input
                                        type="date"
                                        name="issued_date"
                                        value={newCertification.issued_date}
                                        onChange={handleCertificationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md text-gray-900"
                                        required
                                    />
                                </div>

                                {/* Validity Period */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Validity Period (in months)</label>
                                    <input
                                        type="number"
                                        name="validity_period"
                                        value={newCertification.validity_period}
                                        onChange={handleCertificationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md text-gray-900"
                                        required
                                    />
                                </div>

                                {/* Certification Code */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Certification Code</label>
                                    <input
                                        type="text"
                                        name="certification_code"
                                        value={newCertification.certification_code}
                                        onChange={handleCertificationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md text-gray-900"
                                        required
                                    />
                                </div>

                                {/* Requirements */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Requirements</label>
                                    <textarea
                                        name="requirements"
                                        value={newCertification.requirements}
                                        onChange={handleCertificationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md text-gray-900"
                                    />
                                </div>

                                {/* Status */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Status</label>
                                    <select
                                        name="status"
                                        value={newCertification.status}
                                        onChange={handleCertificationChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md text-gray-900"
                                    >
                                        <option value="active">Active</option>
                                        <option value="expired">Expired</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>

                                {/* Image */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Image</label>
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md text-gray-900"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                                    onClick={handleModalClose}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Add Certification
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Manage Modal */}
            {isManageModalOpen && selectedCertification && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-gray-800 p-8 rounded-lg w-1/2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-semibold text-white mb-4">Certification Details</h3>
                            <FaRegWindowClose
                                className="text-white w-6 h-6 cursor-pointer"
                                onClick={handleModalClose}
                            />
                        </div>
                        <div className="text-white mb-4">
                            <strong>Title:</strong> {selectedCertification.title}
                        </div>
                        <div className="text-white mb-4">
                            <strong>Description:</strong> {selectedCertification.description}
                        </div>
                        <div className="text-white mb-4">
                            <strong>Category:</strong> {selectedCertification.category}
                        </div>
                        <div className="text-white mb-4">
                            <strong>Instructor:</strong> {selectedCertification.instructor}
                        </div>
                        <div className="text-white mb-4">
                            <strong>Duration:</strong> {selectedCertification.duration}
                        </div>
                        <div className="text-white mb-4">
                            <strong>Price:</strong> {selectedCertification.price}
                        </div>
                        <div className="text-white mb-4">
                            <strong>Image:</strong>
                            {/* Ensure the correct path to the image is used */}
                            <img
                                src={`http://localhost:8000/${selectedCertification.image}`}
                                alt={selectedCertification.title}
                                className="w-20 h-20 rounded-md"
                            />
                        </div>


                    </div>
                </div>
            )}

            {/* Chart Section Below the Add Button */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                {/* For Bar Chart */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white" style={{height: '300px'}}>
                    <h3 className="text-xl font-semibold">Participants Chart</h3>
                    <Bar data={chartData} options={chartOptions}/>
                </div>

                {/* For Pie Chart */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white"
                     style={{height: '400px', width: '400px', margin: 'auto'}}>
                    <h3 className="text-xl font-semibold">Certification Status</h3>
                    <Pie data={pieChartData} options={pieChartOptions}/>
                </div>

            </div>

        </div>
    );
};

export default Certifications;
