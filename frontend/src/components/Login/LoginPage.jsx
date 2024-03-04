import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../Context/AuthContext';
import NavBar from "../../Communs/NavBar/NavBar.jsx";
import Footer from "../../Communs/Footer/Footer.jsx";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/');// redirection
        } catch (error) {
            console.error("Erreur lors de la connexion", error);
        }
    };


    return (
        <>
            <NavBar/>
            <div className="container">
                <form onSubmit={handleSubmit} className="mt-5">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                        <input type="text" className="form-control" id="username" value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input type="password" className="form-control" id="password" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Se connecter</button>
                </form>
            </div>
            <Footer/>
        </>
    );
};

export default LoginPage;
