import React, { useState, useEffect } from 'react';
import formation1 from './assets/formation1.png';
import formation2 from './assets/formation2.png';
import formation3 from './assets/formation3.jpg';
import headerImage from './assets/formation3.jpg';
import userImage from './assets/users.png'; // Replace with the actual image file path
// New image for the header

const App = () => {
    const formations = [
        { title: 'Développement Web', description: 'Apprenez à créer des applications web modernes.', image: formation1 },
        { title: 'Gestion de Projets', description: 'Maîtrisez la gestion de vos projets professionnels.', image: formation2 },
        { title: 'Marketing Digital', description: 'Apprenez à utiliser le marketing digital pour vos projets.', image: formation3 },
        { title: 'Design Graphique', description: 'Apprenez les bases du design et de la création visuelle.', image: 'https://via.placeholder.com/400x250?text=Graphic+Design' },
        { title: 'Data Science', description: 'Explorez le monde des données et de l\'intelligence artificielle.', image: 'https://via.placeholder.com/400x250?text=Data+Science' },
        { title: 'Sécurité Informatique', description: 'Apprenez à sécuriser les systèmes et réseaux.', image: 'https://via.placeholder.com/400x250?text=Cyber+Security' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextFormation = () => {
        if (currentIndex < formations.length - 3) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevFormation = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Auto-scroll the cards every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex < formations.length - 3) {
                setCurrentIndex(currentIndex + 1);
            } else {
                setCurrentIndex(0); // Reset to the first card if at the end
            }
        }, 300000); // 3000ms = 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [currentIndex, formations.length]);

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <header className="bg-gradient-to-r from-black via-gray-800 to-yellow-400 text-white p-6">
                <h1 className="text-4xl font-bold text-center text-yellow-500">Centre de Formation Excellence</h1>
                <nav className="mt-4 text-center">
                    <ul className="flex justify-center space-x-6">
                        <li><a href="#about" className="hover:text-yellow-400">À Propos</a></li>
                        <li><a href="#formations" className="hover:text-yellow-400">Formations</a></li>
                        <li><a href="#certifications" className="hover:text-yellow-400">Certifications</a></li>
                        <li><a href="#testimonials" className="hover:text-yellow-400">Témoignages</a></li>
                        <li><a href="#contact" className="hover:text-yellow-400">Contact</a></li>
                    </ul>
                </nav>
            </header>

            {/* Image below header */}
            <div>
                <img src={headerImage} alt="Header" className="w-full h-32 object-cover" />
            </div>

            {/* Main Content Section */}
            <main className="p-8 bg-white">
                {/* About Section */}
                <section id="about" className="mt-12">
                    <h2 className="text-3xl font-semibold">À propos de notre centre</h2>
                    <p className="mt-4 text-lg">
                        Notre centre de formation propose des programmes adaptés aux besoins actuels du marché.
                        Nous avons des formations dans divers domaines comme le développement web, la gestion de
                        projets, le marketing digital et bien plus.
                        Rejoignez-nous pour booster votre carrière avec des compétences précieuses et actuelles.
                    </p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold text-white">Nos Valeurs</h3>
                            <p className="mt-2 text-white">Nous croyons en la qualité de l'éducation, la passion pour
                                l'innovation,
                                et la réussite de nos étudiants.</p>
                        </div>
                        <div
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold text-white">Nos Objectifs</h3>
                            <p className="mt-2 text-white">Former des professionnels compétents et prêts à relever les
                                défis du
                                marché du travail.</p>
                        </div>
                        <div
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold text-white">Nos Programmes</h3>
                            <p className="mt-2 text-white">Des formations variées, allant des technologies web à la
                                gestion de
                                projets, en passant par le marketing digital.</p>
                        </div>
                    </div>
                </section>

                {/* Formation Cards Section */}
                <section id="formations" className="mt-12">
                    <h2 className="text-3xl font-semibold">Nos Formations</h2>

                    {/* Carousel Section */}
                    <div className="relative mt-6 flex justify-center">
                        <div className="flex overflow-hidden space-x-6 w-full justify-center">
                            {formations.slice(currentIndex, currentIndex + 3).map((formation, index) => (
                                <div key={index}
                                     className="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out w-1/4">
                                    {/* Add Image */}
                                    <img src={formation.image} alt={formation.title}
                                         className="w-full h-48 object-cover rounded-md"/>

                                    <h3 className="text-xl font-semibold text-yellow-500 mt-4">{formation.title}</h3>
                                    <p className="mt-2">{formation.description}</p>
                                    <button
                                        className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-yellow-400 transition duration-200">
                                        En savoir plus
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevFormation}
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black p-4 rounded-full hover:bg-yellow-400 text-2xl"
                        >
                            &lt;
                        </button>
                        <button
                            onClick={nextFormation}
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black p-4 rounded-full hover:bg-yellow-400 text-2xl"
                        >
                            &gt;
                        </button>
                    </div>
                </section>

                {/* Added Writing between "Nos Formations" and "Nos Certifications" */}
                <section className="mt-12 text-center">
                    <h2 className="text-3xl font-semibold">Pourquoi choisir nos formations ?</h2>
                    <p className="mt-4 text-lg">
                        Nous vous offrons non seulement une expertise dans vos domaines de formation, mais aussi des
                        certifications reconnues et valorisées par les entreprises. Nos formations sont conçues pour
                        répondre aux exigences du marché actuel, et nous vous accompagnons tout au long de votre
                        parcours.
                    </p>
                </section>

                {/* Certifications Section */}
                <section id="certifications" className="mt-12 bg-black p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-white">Nos Certifications</h2>
                    <p className="mt-4 text-lg text-white">À la fin de chaque formation, vous recevrez une certification
                        reconnue
                        par les entreprises, attestant de vos nouvelles compétences acquises.</p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div
                            className="bg-gray-900 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold text-yellow-500">Certification Web Developer</h3>
                            <p className="mt-2 text-white">Obtenez une certification après avoir maîtrisé les
                                technologies web
                                modernes et le développement d'applications interactives.</p>
                        </div>
                        <div
                            className="bg-gray-900 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold text-yellow-500">Certification Project Manager</h3>
                            <p className="mt-2 text-white">Une certification reconnue pour prouver vos compétences en
                                gestion de
                                projets et leadership d'équipes.</p>
                        </div>
                        <div
                            className="bg-gray-900 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold text-yellow-500">Certification Digital Marketing</h3>
                            <p className="mt-2 text-white">Devenez expert en marketing digital et obtenez une
                                certification validant
                                vos compétences en stratégie et publicité numérique.</p>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="mt-12">
                    <h2 className="text-3xl font-semibold text-center">Ce que nos étudiants disent de nous</h2>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                            <p className="text-lg italic">"Une formation exceptionnelle ! Grâce à ce centre, j'ai trouvé
                                un emploi
                                dans le développement web rapidement."</p>
                            <p className="mt-4 text-gray-600">– John Doe</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                            <p className="text-lg italic">"Le programme de marketing digital m'a permis de lancer ma
                                propre entreprise.
                                Merci pour tout !" </p>
                            <p className="mt-4 text-gray-600">– Jane Smith</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                            <p className="text-lg italic">"L'équipe pédagogique est très professionnelle et réactive.
                                J'ai beaucoup
                                appris en gestion de projets."</p>
                            <p className="mt-4 text-gray-600">– Ahmed K.</p>
                        </div>
                    </div>
                </section>

                <section id="about-users" className="mt-9 bg-gray-100 py-12 pt-20 w-full px-4 md:px-8">
                    <h2 className="text-3xl font-semibold text-center text-yellow-600 mb-6">Nos Utilisateurs</h2>
                    <p className="text-center text-lg mb-8">Nos formations sont suivies par une diversité de profils
                        professionnels :</p>

                    <div className="user-profiles grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* User Profile 1 */}
                        <div
                            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                            <div className="flex justify-center mb-4">
                                <img src={userImage} alt="User 1"
                                     className="rounded-full w-20 h-20 object-cover"/>
                            </div>
                            <h3 className="text-lg font-semibold text-yellow-500 text-center">Marie L.</h3>
                            <p className="text-center text-gray-600 mt-2">Développeuse Web</p>
                            <p className="text-center text-gray-700 mt-4">"Grâce à la formation en développement web,
                                j'ai trouvé un emploi dans une start-up technologique."</p>
                        </div>

                        {/* User Profile 2 */}
                        <div
                            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                            <div className="flex justify-center mb-4">
                                <img src={userImage} alt="User 2"
                                     className="rounded-full w-20 h-20 object-cover"/>
                            </div>
                            <h3 className="text-lg font-semibold text-yellow-500 text-center">Pierre D.</h3>
                            <p className="text-center text-gray-600 mt-2">Chef de Projet</p>
                            <p className="text-center text-gray-700 mt-4">"La gestion de projets m'a permis de piloter
                                des équipes dans des projets complexes, avec un impact positif."</p>
                        </div>

                        {/* User Profile 3 */}
                        <div
                            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                            <div className="flex justify-center mb-4">
                                <img src={userImage} alt="User 3"
                                     className="rounded-full w-20 h-20 object-cover"/>
                            </div>
                            <h3 className="text-lg font-semibold text-yellow-500 text-center">Sophie P.</h3>
                            <p className="text-center text-gray-600 mt-2">Consultante Marketing Digital</p>
                            <p className="text-center text-gray-700 mt-4">"La formation en marketing digital a été un
                                véritable tournant dans ma carrière, me permettant de gérer des campagnes
                                internationales."</p>
                        </div>

                        {/* User Profile 4 */}
                        <div
                            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                            <div className="flex justify-center mb-4">
                                <img src={userImage} alt="User 4"
                                     className="rounded-full w-20 h-20 object-cover"/>
                            </div>
                            <h3 className="text-lg font-semibold text-yellow-500 text-center">Jean M.</h3>
                            <p className="text-center text-gray-600 mt-2">Consultant IT</p>
                            <p className="text-center text-gray-700 mt-4">"Grâce à la formation IT, j'ai acquis les
                                compétences pour développer des solutions innovantes."</p>
                        </div>

                        {/* Additional User Profiles (hidden or dynamically added) */}
                        {/* User Profile 5 */}
                        <div
                            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out hidden">
                            <div className="flex justify-center mb-4">
                                <img src={userImage} alt="User 5"
                                     className="rounded-full w-20 h-20 object-cover"/>
                            </div>
                            <h3 className="text-lg font-semibold text-yellow-500 text-center">Lucas T.</h3>
                            <p className="text-center text-gray-600 mt-2">Développeur Full Stack</p>
                            <p className="text-center text-gray-700 mt-4">"La formation Full Stack m'a permis de
                                développer des applications complexes et scalables."</p>
                        </div>
                    </div>
                </section>


                {/* Contact Section */}
                <section id="contact" className="mt-12 text-center">
                    <h2 className="text-3xl font-semibold">Contactez-nous</h2>
                    <form className="mt-4">
                        <input
                            type="email"
                            placeholder="Entrez votre email"
                            className="border-2 border-yellow-400 p-2 rounded-md"
                        />

                        <button
                            type="submit"
                            className="ml-4 px-6 py-2 bg-yellow-400 text-white rounded-full hover:bg-yellow-600 transition duration-200">
                            Envoyer
                        </button>
                    </form>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-black text-white p-6 mt-12">
                <div className="text-center">
                    <p>&copy; 2024 Centre de Formation Excellence. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
