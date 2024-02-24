import React, {useState} from 'react';
import NavBar from "../../Communs/NavBar/NavBar.jsx";
import Footer from "../../Communs/Footer/Footer.jsx";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('URL_API/auth/login', {username, password});
            localStorage.setItem('token', response.data.token);
            // Redirection vers la page d'accueil ou gestion de l'état global de l'utilisateur ici
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <NavBar/>
            <h1>Login</h1>
            <br/>
            <div className="col-lg-4-offset-3">

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
            <Footer/>
        </>
    );
};

export default Login;