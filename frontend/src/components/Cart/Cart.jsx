import React from 'react';
import {useCart} from '../../Context/CartContext';
import {useAuth} from '../../Context/AuthContext';
import {useNavigate} from 'react-router-dom';
import NavBar from "../../Communs/NavBar/NavBar.jsx";
import Footer from "../../Communs/Footer/Footer.jsx";

const Cart = () => {
    const {cartItems, removeFromCart, clearCart, submitCart} = useCart(); // Accès à submitCart via useCart
    const {authToken} = useAuth();
    const history = useNavigate();

    const handleCheckout = async () => {
        if (!authToken) {
            console.log(authToken)
            alert("Veuillez vous connecter pour continuer.");
            // Optionnel: redirection vers la page de connexion
            return;
        }

        if (cartItems.length === 0) {
            alert("Votre panier est vide.");
            return;
        }

        try {
            await submitCart(cartItems, authToken);
            clearCart();
            alert("Votre commande a été soumise avec succès !");
        } catch (error) {
            // Gérer l'erreur, par exemple afficher un message d'erreur spécifique
            //alert("Une erreur est survenue lors de la soumission de votre commande.");
            console.log(error)
        }
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
                            <button className="btn btn-secondary ms-1" onClick={clearCart}>Vider le Panier</button>
                        </div>
                    </>
                )}
            </div>
            <Footer/>
        </>
    );
};

export default Cart;
