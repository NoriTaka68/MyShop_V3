// src/components/Cart/Cart.js
import React from 'react';
import {useCart} from '../../Context/CartContext'; // Ajustez le chemin selon votre structure
import {useAuth} from '../../Context/AuthContext';
import {submit} from '../../Context/CartContext'
import NavBar from "../../Communs/NavBar/NavBar.jsx";
import Footer from "../../Communs/Footer/Footer.jsx"; // Vérifiez le chemin

const Cart = () => {
    const {cartItems, removeFromCart, clearCart} = useCart();
    const {authToken} = useAuth();

    const handleCheckout = async () => {
        if (!authToken) {
            alert("Veuillez vous connecter pour continuer.");
            return;
        }

        if (cartItems.length === 0) {
            alert("Votre panier est vide.");
            return;
        }

        await submitCart(cartItems, authToken);
        clearCart(); // Optionnel, vide le panier après une validation réussie
        alert("Votre commande a été soumise avec succès !");
    };


    return (
        <>
            <NavBar/>

            <div className="container mt-5">
                <h2>Votre Panier</h2>
                {cartItems.length === 0 ? (
                    <p>Votre panier est vide.</p>
                ) : (
                    <>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Produit</th>
                                <th scope="col">Prix</th>
                                <th scope="col">Quantité</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={item.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>${item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => removeFromCart(item.id)}>
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-success" onClick={handleCheckout}>Valider le Panier</button>
                            <button className="btn btn-secondary" onClick={clearCart}>Vider le Panier</button>
                        </div>
                    </>
                )}
            </div>
            <Footer/>
        </>
    );
};

export default Cart;
