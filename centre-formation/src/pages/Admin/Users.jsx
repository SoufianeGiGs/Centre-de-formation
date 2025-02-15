import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        nom: '',
        prenom: '',
        email: '',
        age: '',
        telephone: '',
        adresse: '',
        date_inscription: '',
        actif: true,
        password: '',
        password_confirmation: ''
    });

    // Fetch users from backend
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    // Add new user
    const handleAddUser = () => {
        axios.post('http://127.0.0.1:8000/register', newUser)
            .then(response => {
                setUsers([...users, response.data.user]);
                setNewUser({
                    nom: '',
                    prenom: '',
                    email: '',
                    age: '',
                    telephone: '',
                    adresse: '',
                    date_inscription: '',
                    actif: true,
                    password: '',
                    password_confirmation: ''
                });
                setIsModalOpen(false);
            })
            .catch(error => console.error('Error adding user:', error.response?.data?.errors || error.message));
    };

    // Statistics
    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.actif).length;
    const inactiveUsers = totalUsers - activeUsers;

    return (
        <div className="flex min-h-screen">
            <div className="w-80 bg-gray-800">
                <Sidebar />
            </div>
            <div className="flex-1 p-8 bg-gray-900 min-h-screen">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-800 p-6 rounded-lg shadow-lg mb-8 text-white flex items-center">
                    <h2 className="text-4xl font-extrabold">Users Page</h2>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-gray-700 to-orange-500 text-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Total Users</h3>
                        <p className="text-3xl font-bold">{totalUsers}</p>
                    </div>
                    <div className="bg-gradient-to-r from-gray-700 to-teal-600 text-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Active Users</h3>
                        <p className="text-3xl font-bold">{activeUsers}</p>
                    </div>
                    <div className="bg-gradient-to-r from-gray-700 to-pink-600 text-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Inactive Users</h3>
                        <p className="text-3xl font-bold">{inactiveUsers}</p>
                    </div>
                </div>

                <button
                    className="bg-yellow-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-yellow-600 transition-colors mb-4"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add User
                </button>

                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Address</th>
                        <th className="px-6 py-3 text-left">Date Inscription</th>
                        <th className="px-6 py-3 text-left">Active</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-b hover:bg-gray-100">
                            <td className="px-6 py-4">{user.nom} {user.prenom}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.adresse}</td>
                            <td className="px-6 py-4">{user.date_inscription}</td>
                            <td className="px-6 py-4">{user.actif ? 'Active' : 'Inactive'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 md:w-1/2">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add User</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                {['nom', 'prenom', 'email', 'age', 'telephone', 'adresse', 'date_inscription', 'password', 'password_confirmation'].map((field, index) => (
                                    <div key={index}>
                                        <label className="block text-sm font-medium text-gray-700">{field.replace('_', ' ').toUpperCase()}</label>
                                        <input
                                            type={field.includes('password') ? 'password' : 'text'}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newUser[field]}
                                            onChange={(e) => setNewUser({ ...newUser, [field]: e.target.value })}
                                        />
                                    </div>
                                ))}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Active</label>
                                    <input
                                        type="checkbox"
                                        checked={newUser.actif}
                                        onChange={() => setNewUser({ ...newUser, actif: !newUser.actif })}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                                    onClick={handleAddUser}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
