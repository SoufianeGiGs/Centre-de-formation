import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [age, setAge] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [cin, setCin] = useState(""); // Added CIN state
    const [adresse, setAdresse] = useState(""); // Added address state
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Success message state

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous messages
        setErrorMessage("");
        setSuccessMessage("");

        // Client-side validations
        if (password.length < 8) {
            setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas !");
            return;
        }

        // Prepare data for JSON submission
        const formData = {
            nom,
            prenom,
            age,
            telephone,
            email,
            password,
            password_confirmation: confirmPassword,
            cin, // Adding CIN
            adresse, // Adding adresse
            date_inscription: new Date().toISOString().split('T')[0], // Automatically set the registration date
        };

        try {
            // Use axios to send data to the server
            const response = await axios.post("http://127.0.0.1:8000/register", formData, {
                headers: {
                    "Content-Type": "application/json", // Use JSON content-type for the API
                },
            });
            console.log("Registration successful:", response);
            setSuccessMessage("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        } catch (error) {
            console.error("Error during registration:", error);
            if (error.response && error.response.status === 422) {
                // Server-side validation errors
                const serverErrors = error.response.data.errors;
                if (serverErrors?.email) {
                    setErrorMessage("Cet email existe déjà. Veuillez en utiliser un autre.");
                } else {
                    setErrorMessage("Une erreur s'est produite. Veuillez vérifier vos informations.");
                }
            } else {
                setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-800 to-yellow-400">
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">S'inscrire</h2>

                {errorMessage && (
                    <div className="bg-red-200 text-red-700 p-2 mb-4 rounded">
                        {errorMessage}
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-200 text-green-700 p-2 mb-4 rounded">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-6">
                    {/* Form fields for nom, prenom, etc. */}
                    <div className="flex flex-col">
                        <label htmlFor="nom" className="block text-gray-700">Nom</label>
                        <input
                            type="text"
                            id="nom"
                            name="nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="prenom" className="block text-gray-700">Prénom</label>
                        <input
                            type="text"
                            id="prenom"
                            name="prenom"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            required
                            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="age" className="block text-gray-700">Âge</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="telephone" className="block text-gray-700">Téléphone</label>
                        <input
                            type="text"
                            id="telephone"
                            name="telephone"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            required
                            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="cin" className="block text-gray-700">CIN</label>
                        <input
                            type="text"
                            id="cin"
                            name="cin"
                            value={cin}
                            onChange={(e) => setCin(e.target.value)}
                            required
                            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="adresse" className="block text-gray-700">Adresse</label>
                        <input
                            type="text"
                            id="adresse"
                            name="adresse"
                            value={adresse}
                            onChange={(e) => setAdresse(e.target.value)}
                            required
                            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="block text-gray-700">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="block text-gray-700">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <button type="submit" className="w-full py-2 col-span-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-300">
                        S'inscrire
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Vous avez déjà un compte?{" "}
                    <Link to="/login" className="text-yellow-500 hover:text-yellow-400">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
