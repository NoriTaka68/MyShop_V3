import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {useCart} from '../../Context/CartContext'
import NavBar from "../../Communs/NavBar/NavBar.jsx";
import Footer from "../../Communs/Footer/Footer.jsx";

const ProductDetails = () => {
    const {id} = useParams(); // Récupère l'ID du produit depuis l'URL
    const [product, setProduct] = useState(null);
    const baseUrl = "http://127.0.0.1:8000";
    const {addToCart} = useCart();

    useEffect(() => {
        const fetchProductDetails = async () => {
            const response = await axios.get(`${baseUrl}/api/products/${id}`);
            const productWithAbsoluteImageUrl = {
                ...response.data,
                image: baseUrl + response.data.image
            };
            setProduct(productWithAbsoluteImageUrl);
        };
        fetchProductDetails();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NavBar/>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-6">
                        <img src={product.image} alt={product.name} className="img-fluid"/>
                    </div>
                    <div className="col-lg-6">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p className="text-primary font-weight-bold">Prix: {product.price} €</p>
                        <button className="btn btn-success" onClick={() => addToCart(product)}>
                            Ajouter au panier
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default ProductDetails;
