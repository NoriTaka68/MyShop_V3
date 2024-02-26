import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';
// Création du contexte
const CartContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useCart = () => useContext(CartContext);

// Provider du contexte
export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(() => {
        // Tente de charger le panier depuis le localStorage au démarrage
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        // Sauvegarde le panier dans le localStorage chaque fois que cartItems change
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(currentItems => {
            const itemIndex = currentItems.findIndex(item => item.id === product.id);
            if (itemIndex > -1) {
                // Si le produit existe déjà dans le panier, met à jour la quantité
                const updatedItems = [...currentItems];
                updatedItems[itemIndex].quantity += quantity;
                return updatedItems;
            } else {
                // Sinon, ajoute le produit au panier
                return [...currentItems, {...product, quantity}];
            }
        });
    };
    const submitCart = async () => {
        const token = localStorage.getItem('token');
        try {

            const response = await axios.post('http://127.0.0.1:8000/api/cart/add/', {items: cartItems}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Cart submitted successfully:', response.data);
            clearCart();
            alert('Votre panier a été soumis avec succès.');
        } catch (error) {
            console.error('Error submitting cart:', error.response || error);
            alert('Erreur lors de la soumission du panier.');
        }
    };

    const removeFromCart = (productId) => {
        setCartItems(currentItems => currentItems.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart, submitCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
