import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import NavBar from "../../Communs/NavBar/NavBar.jsx";
import Footer from "../../Communs/Footer/Footer.jsx";

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    // Définissez l'URL de base de votre backend ici
    const baseUrl = "http://127.0.0.1:8000";

    useEffect(() => {
        const fetchProducts = async () => {
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
            <div className="container mt-5">
                <h2 className="mb-4">Nos Produits</h2>
                <div className="row">
                    {products.map((product) => (
                        <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={product.id}>
                            <div className="card h-100">
                                <img src={product.image} className="card-img-top img-fluid" alt={product.name}/>
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
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

export default ProductListPage;
