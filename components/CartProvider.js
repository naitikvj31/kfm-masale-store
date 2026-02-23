'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);

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

    const applyPromoCode = (code) => {
        if (!code) {
            setPromoCode('');
            return { success: false, message: 'Please enter a code' };
        }
        if (code.toUpperCase() === 'HOLI15') {
            const expiryDate = new Date('2026-03-12T23:59:59'); // Valid until March 12th end of day
            if (new Date() > expiryDate) {
                return { success: false, message: 'This promo code expired on March 12th' };
            }
            setPromoCode('HOLI15');
            return { success: true, message: 'HOLI15 applied! 15% off cart total.' };
        }
        return { success: false, message: 'Invalid promo code' };
    };

    const removePromoCode = () => {
        setPromoCode('');
    };

    const subtotalAmount = cartItems.reduce((sum, item) => sum + ((item.variant.discountPrice || item.variant.price) * item.quantity), 0);
    const deliveryFee = subtotalAmount > 0 && subtotalAmount < 1000 ? 100 : 0;

    // Calculate discount
    let calculatedDiscount = 0;
    if (promoCode === 'HOLI15') {
        calculatedDiscount = subtotalAmount * 0.15; // 15% off
    }

    const totalAmount = Math.max(0, subtotalAmount + deliveryFee - calculatedDiscount);
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
            isMounted,
            promoCode,
            applyPromoCode,
            removePromoCode,
            discountAmount: calculatedDiscount
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
