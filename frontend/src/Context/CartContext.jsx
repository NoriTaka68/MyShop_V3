import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(currentItems => {
            const itemIndex = currentItems.findIndex(item => item.id === product.id);
            if (itemIndex > -1) {
                const updatedItems = [...currentItems];
                updatedItems[itemIndex].quantity += quantity;
                return updatedItems;
            } else {
                return [...currentItems, {...product, quantity}];
            }
        });
    };

    const submitCart = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://127.0.0.1:8000/api/cart/add/', {items: cartItems}, {
                headers: {'Authorization': `Bearer ${token}`},
            });
            clearCart();
            alert('Votre panier a été soumis avec succès.');
        } catch (error) {
            console.error('Error submitting cart:', error);
            alert('Erreur lors de la soumission du panier.');
        }
    };

    const removeFromCart = (productId) => {
        setCartItems(currentItems => currentItems.filter(item => item.id !== productId));
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, clearCart, submitCart}}>
            {children}
        </CartContext.Provider>
    );
};
