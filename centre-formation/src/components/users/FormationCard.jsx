import React from 'react';

const FormationCard = ({ formation, onClick }) => {
    return (
        <div
            className="formation-card bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => onClick(formation.id)}
        >
            <img src={`http://127.0.0.1:8000/${formation.image}`} alt={formation.title} className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold">{formation.title}</h3>
            <p className="text-gray-600">{formation.description}</p>
            <p className="text-yellow-500 mt-2">{formation.price}</p>
        </div>
    );
};

export default FormationCard;
