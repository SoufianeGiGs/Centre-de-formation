import React from 'react';

const FormationCard = ({ formation, registrationStatus, handleCourseClick, handleRegister }) => {
    return (
        <div className="formation-card bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200">
            <img
                src={`http://127.0.0.1:8000/${formation.image}`}
                alt={formation.title}
                className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{formation.title}</h3>
            <p className="text-gray-600">{formation.description}</p>
            <p className="text-yellow-500 mt-2">{formation.price}</p>

            {/* Register Button */}
            <button
                className={`w-full py-2 mt-4 text-white font-semibold rounded-md ${registrationStatus === 'approved' ? 'bg-green-500' : registrationStatus === 'pending' ? 'bg-purple-600' : 'bg-gray-500'} transition duration-300 flex items-center justify-center`}
                onClick={() => handleRegister(formation.id)} // Call the function passed from parent
                disabled={registrationStatus === 'approved' || registrationStatus === 'pending'} // Disable if already registered or pending
            >
                {registrationStatus === 'approved' ? (
                    <>
                        <i className="fas fa-check-circle mr-2"></i> Registered
                    </>
                ) : registrationStatus === 'pending' ? (
                    <>
                        <i className="fas fa-clock mr-2"></i> Pending
                    </>
                ) : (
                    <>
                        <i className="fas fa-plus-circle mr-2"></i> Register
                    </>
                )}
            </button>

            {/* View Details Button */}
            <button
                className="w-full py-2 mt-2 text-white font-semibold rounded-md bg-yellow-500 hover:bg-black transition-all duration-300 flex items-center justify-center"
                onClick={() => handleCourseClick(formation.id)} // Call the function to view course details
            >
                <i className="fas fa-info-circle mr-2"></i> View Details
            </button>
        </div>
    );
};

export default FormationCard;
