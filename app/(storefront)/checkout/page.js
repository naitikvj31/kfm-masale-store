'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import Link from 'next/link';

export default function CheckoutPage() {
    const { cartItems, totalAmount, clearCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', address: ''
    });
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(e) {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function buildWhatsAppMessage() {
        let msg = `🛒 *New Order — KFM Masale*\n\n`;
        msg += `👤 *Name:* ${formData.name}\n`;
        msg += `📱 *Phone:* ${formData.phone}\n`;
        if (formData.email) msg += `📧 *Email:* ${formData.email}\n`;
        msg += `📍 *Address:* ${formData.address}\n\n`;
        msg += `📦 *Items Ordered:*\n`;
        cartItems.forEach(item => {
            const itemPrice = item.variant.discountPrice || item.variant.price;
            msg += `• ${item.product.name} (${item.variant.size}) × ${item.quantity} = ₹${(itemPrice * item.quantity).toFixed(0)}\n`;
        });
        msg += `\n💰 *Total:* ₹${totalAmount.toFixed(0)}\n`;
        msg += `💳 *Payment:* ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI Payment'}\n`;
        return encodeURIComponent(msg);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (cartItems.length === 0 || isSubmitting) return;
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerName: formData.name,
                    customerPhone: formData.phone,
                    customerEmail: formData.email || null,
                    customerAddress: formData.address,
                    totalAmount,
                    items: cartItems.map(i => ({
                        variantId: i.variant.id,
                        quantity: i.quantity,
                        price: i.variant.price,
                    })),
                }),
            });

            if (res.ok) {
                // Open WhatsApp with order details
                const whatsappMsg = buildWhatsAppMessage();
                window.open(`https://wa.me/918875443482?text=${whatsappMsg}`, '_blank');
                clearCart();
                setOrderPlaced(true);
            }
        } catch (err) {
            // Even if API fails, send via WhatsApp
            const whatsappMsg = buildWhatsAppMessage();
            window.open(`https://wa.me/918875443482?text=${whatsappMsg}`, '_blank');
            clearCart();
            setOrderPlaced(true);
        }

        setIsSubmitting(false);
    }

    if (orderPlaced) {
        return (
            <main className="container section" style={{ textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    animation: 'scaleIn 0.4s ease'
                }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
                    Order Placed Successfully! 🎉
                </h1>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px', lineHeight: 1.7, marginBottom: '1rem' }}>
                    Your order details have been sent via WhatsApp. We&apos;ll confirm your order and share delivery updates on WhatsApp.
                </p>
                {paymentMethod === 'upi' && (
                    <div style={{
                        backgroundColor: '#FEF3C7', border: '1px solid #FDE68A',
                        borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1.5rem',
                        maxWidth: '400px', fontSize: '0.9rem', color: '#92400E'
                    }}>
                        <strong>UPI Payment:</strong> Please complete the payment to <strong>kamlaflourmill123@oksbi</strong> and send the screenshot on WhatsApp.
                    </div>
                )}
                <Link href="/" className="btn btn-primary">Continue Shopping</Link>
            </main>
        );
    }

    if (cartItems.length === 0) {
        return (
            <main className="container section" style={{ textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-light)" strokeWidth="1.5" style={{ marginBottom: '1.5rem', opacity: 0.5 }}>
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Your Cart is Empty</h2>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Add some delicious spices to get started!</p>
                <Link href="/#products" className="btn btn-primary">Browse Spices</Link>
            </main>
        );
    }

    return (
        <main className="container" style={{ padding: '2rem 1rem 4rem' }}>
            <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                color: 'var(--color-primary)',
                marginBottom: '0.5rem'
            }}>
                Checkout
            </h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                Complete your details below. Your order will be confirmed via WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="checkout-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: '2.5rem',
                alignItems: 'flex-start'
            }}>
                {/* Left: Customer Details + Payment */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Customer Info */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        border: '1px solid var(--color-border-light)',
                        padding: '1.75rem'
                    }}>
                        <h2 style={{
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            color: '#111827',
                            margin: '0 0 1.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontFamily: 'var(--font-body)'
                        }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            Your Details
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label htmlFor="name" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.3rem' }}>Full Name *</label>
                                <input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your full name"
                                    style={{ width: '100%', padding: '0.7rem 1rem', border: '1.5px solid var(--color-border)', borderRadius: '10px', fontSize: '0.95rem', fontFamily: 'inherit' }} />
                            </div>
                            <div>
                                <label htmlFor="phone" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.3rem' }}>WhatsApp / Mobile *</label>
                                <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="+91 88754 43482"
                                    style={{ width: '100%', padding: '0.7rem 1rem', border: '1.5px solid var(--color-border)', borderRadius: '10px', fontSize: '0.95rem', fontFamily: 'inherit' }} />
                            </div>
                            <div>
                                <label htmlFor="email" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.3rem' }}>Email (optional)</label>
                                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com"
                                    style={{ width: '100%', padding: '0.7rem 1rem', border: '1.5px solid var(--color-border)', borderRadius: '10px', fontSize: '0.95rem', fontFamily: 'inherit' }} />
                            </div>
                            <div>
                                <label htmlFor="address" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.3rem' }}>Delivery Address *</label>
                                <textarea id="address" name="address" value={formData.address} onChange={handleChange} required rows={3} placeholder="Street, City, State, Pincode"
                                    style={{ width: '100%', padding: '0.7rem 1rem', border: '1.5px solid var(--color-border)', borderRadius: '10px', fontSize: '0.95rem', fontFamily: 'inherit', resize: 'vertical' }} />
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        border: '1px solid var(--color-border-light)',
                        padding: '1.75rem'
                    }}>
                        <h2 style={{
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            color: '#111827',
                            margin: '0 0 1.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontFamily: 'var(--font-body)'
                        }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                            Payment Method
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {/* COD */}
                            <label
                                htmlFor="payment-cod"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.85rem',
                                    padding: '1rem 1.25rem',
                                    borderRadius: '12px',
                                    border: paymentMethod === 'cod' ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                                    backgroundColor: paymentMethod === 'cod' ? '#E8F5E9' : 'white',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                <input type="radio" id="payment-cod" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')}
                                    style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.95rem' }}>💵 Cash on Delivery (COD)</div>
                                    <div style={{ color: '#6B7280', fontSize: '0.82rem', marginTop: '0.15rem' }}>Pay when your order arrives at your doorstep</div>
                                </div>
                            </label>

                            {/* UPI */}
                            <label
                                htmlFor="payment-upi"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.85rem',
                                    padding: '1rem 1.25rem',
                                    borderRadius: '12px',
                                    border: paymentMethod === 'upi' ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                                    backgroundColor: paymentMethod === 'upi' ? '#E8F5E9' : 'white',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                <input type="radio" id="payment-upi" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')}
                                    style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.95rem' }}>📱 UPI Payment</div>
                                    <div style={{ color: '#6B7280', fontSize: '0.82rem', marginTop: '0.15rem' }}>Pay via Google Pay, PhonePe, Paytm or any UPI app</div>
                                </div>
                            </label>

                            {paymentMethod === 'upi' && (
                                <div style={{
                                    backgroundColor: '#FEF9EE',
                                    border: '1px solid #FDE68A',
                                    borderRadius: '10px',
                                    padding: '1rem 1.25rem',
                                    fontSize: '0.88rem',
                                    color: '#92400E',
                                    lineHeight: 1.6
                                }}>
                                    <strong>UPI ID:</strong> <code style={{ backgroundColor: '#FDE68A', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>kamlaflourmill123@oksbi</code>
                                    <br />
                                    After placing the order, pay via UPI and share the payment screenshot on WhatsApp for instant confirmation.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: Order Summary */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    border: '1px solid var(--color-border-light)',
                    padding: '1.75rem',
                    position: 'sticky',
                    top: '5rem'
                }}>
                    <h2 style={{
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: '#111827',
                        margin: '0 0 1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: 'var(--font-body)'
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                        Order Summary ({cartItems.length} items)
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        {cartItems.map((item, idx) => (
                            <div key={idx} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                                paddingBottom: '0.75rem',
                                borderBottom: '1px solid #F3F4F6'
                            }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#111827' }}>{item.product.name}</div>
                                    <div style={{ color: '#6B7280', fontSize: '0.8rem' }}>{item.variant.size} × {item.quantity}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 700, color: '#111827' }}>₹{((item.variant.discountPrice || item.variant.price) * item.quantity).toFixed(0)}</div>
                                    {item.variant.discountPrice && item.variant.discountPrice < item.variant.price && (
                                        <div style={{ fontSize: '0.75rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                                            ₹{(item.variant.price * item.quantity).toFixed(0)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'var(--color-bg-sage)',
                        padding: '1rem',
                        borderRadius: '10px',
                        marginBottom: '1.5rem'
                    }}>
                        <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-primary)' }}>Total Amount</span>
                        <span style={{ fontWeight: 700, fontSize: '1.35rem', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>₹{totalAmount.toFixed(0)}</span>
                    </div>

                    {/* Place Order Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            backgroundColor: '#25D366',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.6rem',
                            transition: 'all 0.2s ease',
                            opacity: isSubmitting ? 0.7 : 1
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        {isSubmitting ? 'Placing Order...' : 'Place Order via WhatsApp'}
                    </button>

                    <p style={{
                        textAlign: 'center',
                        fontSize: '0.78rem',
                        color: '#9CA3AF',
                        marginTop: '0.75rem',
                        lineHeight: 1.5
                    }}>
                        Your order details will be sent to our WhatsApp for quick confirmation
                    </p>

                    {/* Trust Signals */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1.5rem',
                        marginTop: '1.25rem',
                        paddingTop: '1.25rem',
                        borderTop: '1px solid #F3F4F6'
                    }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: '#9CA3AF' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            Secure
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: '#9CA3AF' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                            Verified
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: '#9CA3AF' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                            Fast Delivery
                        </span>
                    </div>
                </div>
            </form>
        </main>
    );
}
