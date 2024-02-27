import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from '../../Context/AuthContext';
import {useSearch} from '../../Context/SearchContext'; // Assurez-vous d'importer useSearch depuis le bon fichier

const NavBar = () => {
    const {isAuthenticated, logout} = useAuth();
    const {setSearchTerm} = useSearch(); // Utilisez setSearchTerm depuis useSearch
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(localSearchTerm); // Mettez à jour le terme de recherche global avec setSearchTerm
        //navigate('/');
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">MyShop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/products" className="nav-link">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/cart" className="nav-link">Cart</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            {isAuthenticated ? (
                                <button onClick={logout} className="btn btn-danger ms-1">Logout</button>
                            ) : (
                                <Link to="/login" className="btn btn-primary ms-1">Login</Link>
                            )}
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
