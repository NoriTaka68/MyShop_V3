import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import NavBar from "../../Communs/NavBar/NavBar.jsx";
import Footer from "../../Communs/Footer/Footer.jsx";

const ProductDetails = () => {
    const [products, setProducts] = useState([]);
    // Définissez l'URL de base de votre backend ici
    const baseUrl = "http://127.0.0.1:8000";

    useEffect(() => {
        const fetchProducts = async () => {
            // Utilisation de l'URL de base pour la requête
            const response = await axios.get(`${baseUrl}/api/products/`);
            console.log(response.data);
            // Construisez l'URL absolue pour chaque image de produit
            const productsWithAbsoluteImageUrl = response.data.map(product => ({
                ...product,
                image: baseUrl + product.image // Construire l'URL absolue de l'image
            }));
            setProducts(productsWithAbsoluteImageUrl);
        };
        fetchProducts();
    }, []);

    return (
        <>
            <NavBar/>
            <br/>
            <div className="container">

                <div className="row">
                    {products.map((product) => (
                        <div className="col-md-4 mb-3" key={product.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    {/* Assurez-vous que l'image est correctement affichée avec une URL absolue */}
                                    <img src={product.image} className="img-fluid" alt={product.name}/>
                                    <p className="card-text">{product.description}</p>
                                    <Link to={`/products/${product.id}`} className="btn btn-primary">Voir Détails</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default ProductDetails;
