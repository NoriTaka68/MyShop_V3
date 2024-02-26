import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Charger le panier depuis le localStorage au démarrage du composant
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        // Mettre à jour le localStorage à chaque changement de cartItems
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const itemExists = prevItems.find((i) => i.id === item.id);
            let newItems;
            if (itemExists) {
                newItems = prevItems.map((i) =>
                    i.id === item.id ? {...i, quantity: i.quantity + 1} : i
                );
            } else {
                newItems = [...prevItems, {...item, quantity: 1}];
            }
            // Mettre à jour le localStorage
            localStorage.setItem('cart', JSON.stringify(newItems));
            return newItems;
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === id);
            let newItems;
            if (existingItem && existingItem.quantity > 1) {
                newItems = prevItems.map((item) =>
                    item.id === id ? {...item, quantity: item.quantity - 1} : item
                );
            } else {
                newItems = prevItems.filter((item) => item.id !== id);
            }
            // Mettre à jour le localStorage
            localStorage.setItem('cart', JSON.stringify(newItems));
            return newItems;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        // Effacer le panier dans le localStorage
        localStorage.removeItem('cart');
    };


    const submitCart = async () => {
        // Récupérer le panier du localStorage
        const storedCart = localStorage.getItem('cart');
        // Récupérer le token JWT du localStorage
        const token = localStorage.getItem('token');

        // Vérifier si le panier existe et n'est pas vide
        if (!storedCart || storedCart.length === 0) {
            alert('Votre panier est vide.');
            return;
        }

        // Vérifier si l'utilisateur est authentifié
        if (!token) {
            alert('Vous devez être connecté pour valider le panier.');
            return;
        }

        // Parser le panier stocké pour le transformer en objet JavaScript
        const cartItems = JSON.parse(storedCart);

        // Préparer le corps de la requête selon le format attendu par votre API
        const requestData = {
            user_id: userId,
            // Assurez-vous de structurer requestData selon les besoins de votre API
            cart_items: cartItems.map(item => ({
                product_id: item.id,
                quantity: item.quantity,
            }))
        };

        try {
            // Envoyer la requête POST à l'API avec axios
            const response = await axios.post('http://127.0.0.1:8000/api/cart/add/', requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Inclure le token d'authentification
                }
            });

            // Traitement en cas de succès
            console.log('Réponse de l\'API:', response.data);
            alert('Votre panier a été soumis avec succès.');
            localStorage.removeItem('cart'); // Optionnel: Vider le panier après une soumission réussie
        } catch (error) {
            // Gestion des erreurs
            console.error('Erreur lors de la soumission du panier:', error);
            if (error.response) {
                // La requête a été faite et le serveur a répondu avec un statut d'erreur
                alert(`Une erreur s'est produite : ${error.response.status} ${error.response.data}`);
            } else if (error.request) {
                // La requête a été faite mais aucune réponse n'a été reçue
                alert('Une erreur est survenue lors de la connexion au serveur.');
            } else {
                // Quelque chose s'est mal passé lors de la création de la requête
                alert('Erreur lors de la soumission du panier: ' + error.message);
            }
        }
    };


    return (
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, clearCart, submitCart}}>
            {children}
        </CartContext.Provider>
    );
};
