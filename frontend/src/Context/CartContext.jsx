import React, {createContext, useContext, useState} from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            // Vérifie si l'article est déjà dans le panier
            const itemExists = prevItems.find((i) => i.id === item.id);
            if (itemExists) {
                // Augmente la quantité
                return prevItems.map((i) =>
                    i.id === item.id ? {...i, quantity: i.quantity + 1} : i
                );
            } else {
                // Ajoute l'article au panier
                return [...prevItems, {...item, quantity: 1}];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => {
            // Vérifie si l'article est déjà dans le panier et sa quantité
            const existingItem = prevItems.find((item) => item.id === id);
            if (existingItem && existingItem.quantity > 1) {
                // Réduit la quantité de l'article de 1
                return prevItems.map((item) =>
                    item.id === id ? {...item, quantity: item.quantity - 1} : item
                );
            } else {
                // Supprime l'article du panier
                return prevItems.filter((item) => item.id !== id);
            }
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };
    const submitCart = async (cartItems, token) => {
        // Préparation des données du panier pour correspondre à l'attente de l'API
        const cartData = {
            products: cartItems.map(item => ({
                product_id: item.id, // Assurez-vous que cela correspond à la clé attendue par votre API pour l'ID du produit
                quantity: item.quantity
            }))
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/cart/add/', cartData, {
                headers: {
                    // Assurez-vous que le nom de cet en-tête corresponde à ce que votre API attend pour le token JWT
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Réponse de l\'API:', response.data);
            // Gérez la réponse de l'API ici (par exemple, afficher un message de succès)
        } catch (error) {
            console.error('Erreur lors de l\'envoi du panier:', error);
            // Gérez les erreurs ici (par exemple, afficher un message d'erreur)
        }
    };

    return (
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, clearCart, submitCart}}>
            {children}
        </CartContext.Provider>
    );
};
