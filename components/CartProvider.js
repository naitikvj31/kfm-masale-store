'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const saved = localStorage.getItem('kfm_cart');
        if (saved) {
            try {
                setCartItems(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse cart');
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('kfm_cart', JSON.stringify(cartItems));
        }
    }, [cartItems, isMounted]);

    const addToCart = (product, variant, quantity = 1) => {
        setCartItems(prev => {
            const existingLine = prev.find(item => item.variant.id === variant.id);
            if (existingLine) {
                return prev.map(item =>
                    item.variant.id === variant.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { product, variant, quantity }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (variantId) => {
        setCartItems(prev => prev.filter(item => item.variant.id !== variantId));
    };

    const updateQuantity = (variantId, newQty) => {
        if (newQty < 1) return removeFromCart(variantId);
        setCartItems(prev => prev.map(item =>
            item.variant.id === variantId ? { ...item, quantity: newQty } : item
        ));
    };

    const clearCart = () => setCartItems([]);

    const toggleCart = () => setIsCartOpen(prev => !prev);
    const closeCart = () => setIsCartOpen(false);

    const subtotalAmount = cartItems.reduce((sum, item) => sum + ((item.variant.discountPrice || item.variant.price) * item.quantity), 0);
    const deliveryFee = subtotalAmount > 0 && subtotalAmount < 1000 ? 100 : 0;
    const totalAmount = subtotalAmount + deliveryFee;
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            isCartOpen,
            toggleCart,
            closeCart,
            subtotalAmount,
            deliveryFee,
            totalAmount,
            totalItems,
            isMounted
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
