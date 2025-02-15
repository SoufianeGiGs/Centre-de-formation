import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Success message state
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate(); // Added navigation hook

    // Fetch CSRF token on component mount (this assumes the token is available in a cookie)
    useEffect(() => {
        const token = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
        if (token) {
            axios.defaults.headers.common['X-XSRF-TOKEN'] = token[1];
        }
    }, []);

    const handleSubmit = async (e) => {
        console.log("Form submitted");
        e.preventDefault();

        // Clear previous messages
        setErrorMessage("");
        setSuccessMessage("");
        setLoading(true); // Set loading to true when login starts

        // Client-side validation
        if (!email || !password) {
            setErrorMessage("Veuillez remplir tous les champs.");
            setLoading(false); // Stop loading if validation fails
            return;
        }

        try {
            // Send POST request with credentials as JSON
            const response = await axios.post("http://localhost:8000/login", {
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true, // Send cookies with request
            });

            // Successful login
            console.log("Login successful:", response);
            setSuccessMessage("Connexion réussie. Vous êtes maintenant connecté.");

            // Get user ID and role from the response (assuming the backend sends user data)
            const userId = response.data.user.id;
            const isAdmin = response.data.user.is_admin; // Check if the user is admin

            // Add a 2-second delay before redirecting
            setTimeout(() => {
                if (isAdmin) {
                    navigate(`/Admin/Dashboard/${userId}`); // Redirect to Admin Dashboard
                } else {
                    navigate(`/users/${userId}`); // Redirect to normal user page
                }
            }, 2000); // 2-second delay
        } catch (error) {
            console.error("Error during login:", error);
            if (error.response && error.response.status === 401) {
                // Invalid credentials
                setErrorMessage("Email ou mot de passe incorrect.");
            } else {
                setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
            }
        } finally {
            setLoading(false); // Stop loading after request completes
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-800 to-yellow-400">
            <div className="w-full max-w-lg bg-white p-10 rounded-xl shadow-lg">
                <h2 className="text-4xl font-semibold text-center text-yellow-500 mb-8">Se connecter</h2>

                {errorMessage && (
                    <div className="bg-red-200 text-red-700 p-3 mb-4 rounded-lg">
                        {errorMessage}
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-200 text-green-700 p-3 mb-4 rounded-lg">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-lg font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-lg font-medium text-gray-700">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
                        />
                    </div>
                    <button type="submit" className="w-full py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-300" disabled={loading}>
                        {loading ? "Chargement..." : "Se connecter"}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Vous n'avez pas de compte?{" "}
                    <Link to="/register" className="text-yellow-500 hover:text-yellow-400">
                        S'inscrire
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
