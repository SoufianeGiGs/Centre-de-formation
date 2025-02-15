import React from 'react';
import { FaUserCircle } from 'react-icons/fa';  // Importing user icon from react-icons

const SidebarUsers = ({ users }) => {
    return (
        <div className="sidebar bg-gray-800 text-white p-6 w-64  shadow-lg">
            <h3 className="text-lg font-semibold text-yellow-500 mb-4">Online Users</h3>
            <ul className="space-y-3">
                {users.map((user, index) => (
                    <li key={index} className="flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-200 ease-in-out">
                        <FaUserCircle className="text-yellow-500 w-8 h-8" />
                        <span>{user.nom} </span> {/* Access 'nom' and 'prenom' to show the name */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SidebarUsers;
