'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/components/CartProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSession } from '@/app/actions/auth';

export default function CheckoutPage() {
    const router = useRouter();
    const { cartItems, subtotalAmount, deliveryFee, totalAmount, clearCart, promoCode, discountAmount } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', address: ''
    });
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

    useEffect(() => {
        // Detect if user is on desktop to conditionally show QR vs Button
        setIsDesktop(window.innerWidth > 768);

        // Fetch session to protect checkout route
        getSession().then(session => {
            if (!session) {
                router.push('/login?redirect=/checkout');
            } else {
                setFormData(prev => ({
                    ...prev,
                    name: session.name || '',
                    email: session.email || ''
                }));
                setIsLoadingAuth(false);
            }
        });
    }, [router]);

    if (isLoadingAuth) {
        return (
            <main className="container section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', color: 'var(--color-primary)' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}>
                        <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                    </svg>
                    <p style={{ fontWeight: 500 }}>Securing checkout...</p>
                    <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 100% { transform: rotate(360deg); } }` }} />
                </div>
            </main>
        );
    }

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
        msg += `\n📝 *Subtotal:* ₹${subtotalAmount.toFixed(0)}\n`;
        if (discountAmount > 0) {
            msg += `🏷️ *Promo (${promoCode}):* -₹${discountAmount.toFixed(0)}\n`;
        }
        msg += `🚚 *Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee.toFixed(0)}\n`;
        msg += `💰 *Total Amount:* ₹${totalAmount.toFixed(0)}\n`;
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
                const data = await res.json();
                setOrderId(data.orderId || Math.floor(100000 + Math.random() * 900000));

                if (paymentMethod === 'cod') {
                    // Open WhatsApp immediately for COD
                    const whatsappMsg = buildWhatsAppMessage();
                    window.open(`https://wa.me/918875443482?text=${whatsappMsg}`, '_blank');
                    clearCart();
                }

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
        if (paymentMethod === 'upi') {
            const upiId = '8890819966@ptaxis';
            const merchantName = 'KFM Masale';
            const amount = totalAmount.toFixed(2);
            const transactionNote = `Order ${orderId}`;
            // Construct UPI Intent URI string
            const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

            return (
                <main className="container section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem' }}>
                    <div style={{
                        maxWidth: '500px', width: '100%',
                        backgroundColor: 'white', borderRadius: '20px', padding: '2.5rem 2rem',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                        border: '1px solid var(--color-border-light)',
                        textAlign: 'center'
                    }}>
                        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                            Complete Your Payment
                        </h1>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                            Pay ₹{amount} securely via any UPI app
                        </p>

                        <div style={{
                            backgroundColor: '#F9FAFB',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            marginBottom: '2rem',
                            border: '1px dashed var(--color-border)'
                        }}>
                            {isDesktop ? (
                                <>
                                    <p style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: '1rem', fontSize: '0.95rem' }}>Scan QR Code with Phone</p>
                                    <div style={{
                                        width: '200px', height: '200px', margin: '0 auto',
                                        backgroundColor: 'white', padding: '0.5rem', borderRadius: '12px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                                    }}>
                                        <img
                                            src={`/api/qr?upi=${encodeURIComponent(upiLink)}`}
                                            alt="UPI Payment QR Code"
                                            style={{ width: '100%', height: '100%', display: 'block' }}
                                        />
                                    </div>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '1rem' }}>
                                        Supports GPay, PhonePe, Paytm, and more
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>Tap below to pay securely</p>
                                    <a
                                        href={upiLink}
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                            backgroundColor: 'var(--color-primary)', color: 'white',
                                            padding: '1.1rem', borderRadius: '12px', fontWeight: 700,
                                            textDecoration: 'none', width: '100%', fontSize: '1.05rem',
                                            boxShadow: '0 8px 16px rgba(43, 94, 46, 0.2)'
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
                                        Pay via UPI App
                                    </a>
                                </>
                            )}
                        </div>

                        <div style={{ marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--color-text)' }}>
                            Or pay manually to UPI ID:<br />
                            <strong style={{ userSelect: 'all', fontSize: '1.05rem', display: 'inline-block', marginTop: '0.5rem', padding: '0.4rem 0.8rem', backgroundColor: '#F3F4F6', borderRadius: '6px' }}>{upiId}</strong>
                        </div>

                        <hr style={{ border: 'none', borderTop: '1px solid var(--color-border-light)', margin: '0 0 1.5rem 0' }} />

                        <p style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: '1rem', fontSize: '0.95rem' }}>Paid successfully?</p>
                        <button
                            onClick={() => {
                                const whatsappMsg = buildWhatsAppMessage();
                                window.open(`https://wa.me/918875443482?text=${whatsappMsg}%0A%0A%E2%9C%85+*I+have+completed+the+UPI+Payment.*`, '_blank');
                                clearCart();
                            }}
                            className="btn btn-outline"
                            style={{ width: '100%', padding: '1rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                            Confirm Payment on WhatsApp
                        </button>
                    </div>
                </main>
            );
        }

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
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px', lineHeight: 1.7, marginBottom: '2rem' }}>
                    Your order details have been sent via WhatsApp. We&apos;ll confirm your order and share delivery updates on WhatsApp.
                </p>
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
                                    <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.95rem' }}>Cash on Delivery (COD)</div>
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
                                    <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.95rem' }}>UPI Payment</div>
                                    <div style={{ color: '#6B7280', fontSize: '0.82rem', marginTop: '0.15rem' }}>Pay via Google Pay, PhonePe, Paytm or any UPI app</div>
                                </div>
                            </label>
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
                        marginBottom: '1rem'
                    }}>
                        <span style={{ fontWeight: 500, fontSize: '1rem', color: 'var(--color-text)' }}>Subtotal</span>
                        <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-text)' }}>₹{subtotalAmount.toFixed(0)}</span>
                    </div>

                    {discountAmount > 0 && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem'
                        }}>
                            <span style={{ fontWeight: 500, fontSize: '1rem', color: 'var(--color-primary)' }}>Discount ({promoCode})</span>
                            <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-primary)' }}>-₹{discountAmount.toFixed(0)}</span>
                        </div>
                    )}

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                        paddingBottom: '1rem',
                        borderBottom: '1px dashed var(--color-border)'
                    }}>
                        <span style={{ fontWeight: 500, fontSize: '1rem', color: 'var(--color-text)' }}>Delivery Fee</span>
                        <span style={{ fontWeight: 600, fontSize: '1rem', color: deliveryFee === 0 ? 'var(--color-primary)' : 'var(--color-text)' }}>
                            {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(0)}`}
                        </span>
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
                            backgroundColor: 'var(--color-primary)',
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
                            opacity: isSubmitting ? 0.7 : 1,
                            boxShadow: '0 8px 16px rgba(43, 94, 46, 0.15)'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        {isSubmitting ? 'Processing Securely...' : 'Place Secure Order'}
                    </button>

                    <p style={{
                        textAlign: 'center',
                        fontSize: '0.78rem',
                        color: '#9CA3AF',
                        marginTop: '0.75rem',
                        lineHeight: 1.5
                    }}>
                        Your transaction is safely encrypted and processed.
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
