import React from 'react';

const FormationCard = ({ title, description }) => {
    return (
        <div className="bg-white text-black p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-xl font-semibold text-yellow-500">{title}</h3>
            <p className="mt-2">{description}</p>
        </div>
    );
}

export default FormationCard;
