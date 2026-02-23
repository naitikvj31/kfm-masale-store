'use client';

import { useCart } from './CartProvider';
import Link from 'next/link';

export default function CartDrawer() {
    const { cartItems, isCartOpen, closeCart, updateQuantity, removeFromCart, subtotalAmount, deliveryFee, totalAmount } = useCart();

    if (!isCartOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 100, backdropFilter: 'blur(2px)' }}
                onClick={closeCart}
                aria-hidden="true"
            />

            {/* Drawer */}
            <aside
                role="dialog"
                aria-label="Shopping Cart"
                style={{
                    position: 'fixed',
                    top: 0, right: 0, bottom: 0,
                    width: '100%',
                    maxWidth: '420px',
                    backgroundColor: 'white',
                    zIndex: 101,
                    boxShadow: '-8px 0 30px rgba(0,0,0,0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    animation: 'slideInRight 0.3s ease forwards'
                }}
            >
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid var(--color-border-light)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '1.35rem' }}>
                        Your Cart
                    </h2>
                    <button
                        onClick={closeCart}
                        aria-label="Close Cart"
                        style={{
                            background: 'var(--color-bg-subtle)',
                            border: 'none',
                            width: '36px', height: '36px',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'background var(--transition-fast)'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--color-border)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--color-bg-subtle)'}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                </div>

                {/* Items */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    {cartItems.length === 0 ? (
                        <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '3rem' }}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-border)" strokeWidth="1.5" style={{ margin: '0 auto 1rem' }}>
                                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            <p style={{ fontWeight: 500, marginBottom: '0.5rem', color: 'var(--color-text)' }}>Your cart is empty</p>
                            <p style={{ fontSize: '0.9rem' }}>Browse our spice collection and add items.</p>
                            <button
                                onClick={closeCart}
                                className="btn btn-outline"
                                style={{ marginTop: '1.5rem' }}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {cartItems.map(item => (
                                <div key={item.variant.id} style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    padding: '1rem',
                                    backgroundColor: 'var(--color-bg-subtle)',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border-light)'
                                }}>
                                    {/* Thumbnail */}
                                    <div style={{
                                        width: '56px', height: '56px',
                                        background: 'linear-gradient(135deg, var(--color-bg-sage), var(--color-bg-cream))',
                                        borderRadius: 'var(--radius-sm)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.4">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        </svg>
                                    </div>

                                    {/* Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                                            <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 600, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                                                {item.product.name}
                                            </h4>
                                            <button
                                                onClick={() => removeFromCart(item.variant.id)}
                                                aria-label={`Remove ${item.product.name} from cart`}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-light)', padding: '2px' }}
                                                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-danger)'}
                                                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-light)'}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                            </button>
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.6rem' }}>
                                            Pack: {item.variant.size}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                border: '1px solid var(--color-border)',
                                                borderRadius: 'var(--radius-sm)',
                                                overflow: 'hidden'
                                            }}>
                                                <button
                                                    onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                                                    aria-label="Decrease quantity"
                                                    style={{ padding: '0.3rem 0.6rem', border: 'none', background: 'var(--color-bg-subtle)', cursor: 'pointer', fontWeight: 600, color: 'var(--color-text-muted)' }}
                                                >−</button>
                                                <span style={{ padding: '0 0.65rem', fontSize: '0.9rem', fontWeight: 600, minWidth: '28px', textAlign: 'center' }}>{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                                                    aria-label="Increase quantity"
                                                    style={{ padding: '0.3rem 0.6rem', border: 'none', background: 'var(--color-bg-subtle)', cursor: 'pointer', fontWeight: 600, color: 'var(--color-text-muted)' }}
                                                >+</button>
                                            </div>
                                            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text)' }}>
                                                ₹{(item.variant.discountPrice || item.variant.price) * item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div style={{
                        padding: '1.5rem',
                        borderTop: '1px solid var(--color-border-light)',
                        backgroundColor: 'var(--color-bg-subtle)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: 500, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Subtotal</span>
                            <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>₹{subtotalAmount}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span style={{ fontWeight: 500, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Delivery Fee</span>
                            <span style={{ fontWeight: 600, color: deliveryFee === 0 ? 'var(--color-primary)' : 'var(--color-text)' }}>
                                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', borderTop: '1px dashed var(--color-border)', paddingTop: '1rem' }}>
                            <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>Total</span>
                            <span style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-primary)' }}>₹{totalAmount}</span>
                        </div>
                        <Link
                            href="/checkout"
                            onClick={closeCart}
                            className="btn btn-primary"
                            style={{
                                display: 'flex',
                                width: '100%',
                                fontSize: '1rem'
                            }}
                        >
                            Proceed to Checkout
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </Link>
                    </div>
                )}
            </aside>
        </>
    );
}
