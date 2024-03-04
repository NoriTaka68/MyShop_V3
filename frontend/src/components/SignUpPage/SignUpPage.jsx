// src/components/SignUpPage.jsx
import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Footer from "../../Communs/Footer/Footer.jsx";
import NavBar from "../../Communs/NavBar/NavBar.jsx";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post('http://127.0.0.1:8000/api/users/', formData);
            navigate('/'); // Redirige vers la page de connexion après l'inscription réussie
        } catch (error) {
            if (error.response) {
                // L'API a répondu avec un code d'erreur
                setError(error.response.data.message || "Une erreur est survenue lors de l'inscription.");
            } else {
                setError("Une erreur est survenue lors de l'inscription.");
            }
        }
    };

    return (
        <>
            <NavBar/>
            <div className="container mt-4">
                <div className="col-4">
                    <h2>Inscription</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Mot de passe</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">S'inscrire</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default SignUpPage;
