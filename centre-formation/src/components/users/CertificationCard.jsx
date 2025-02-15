import React from 'react';

const CertificationCard = ({ certification, onClick }) => {
    return (
        <div className="certification-card bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200" onClick={onClick}>
            <img src={`http://127.0.0.1:8000/${certification.image}`} alt={certification.title} className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold">{certification.title}</h3>
            <p className="text-gray-600">{certification.description}</p>
            <p className="text-yellow-500 mt-2">{certification.price}</p>
        </div>
    );
};

export default CertificationCard;
