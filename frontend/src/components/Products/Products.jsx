// Products.jsx
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useCart} from '../../Context/CartContext';
import NavBar from "../../Communs/NavBar/NavBar.jsx";
import Footer from "../../Communs/Footer/Footer.jsx";

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const {addToCart} = useCart();
    const baseUrl = "http://127.0.0.1:8000";

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(`${baseUrl}/api/products/`);
            const productsWithAbsoluteImageUrl = response.data.map(product => ({
                ...product,
                image: baseUrl + product.image
            }));
            setProducts(productsWithAbsoluteImageUrl);
        };
        fetchProducts();
    }, []);

    // Filtrer les produits en fonction du terme de recherche
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <NavBar/>
            <div className="container mt-5">
                <h2 className="mb-4">Nos Produits</h2>
                <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    className="form-control mb-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="row">
                    {filteredProducts.map((product) => (
                        <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={product.id}>
                            <div className="card h-100">
                                <img src={product.image} className="card-img-top img-fluid" alt={product.name}/>
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text">Prix: {product.price} €</p>
                                    <Link to={`/products/${product.id}`} className="btn btn-primary">Voir Détails</Link>
                                    <button onClick={() => addToCart(product)} className="btn btn-success ms-1">
                                        Ajouter au panier
                                    </button>
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
