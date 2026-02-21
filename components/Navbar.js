'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './CartProvider';

export default function Navbar() {
    const pathname = usePathname();
    const { toggleCart, totalItems, isMounted } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    if (pathname?.startsWith('/admin')) return null;

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            backgroundColor: 'rgba(255, 255, 255, 0.97)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--color-border-light)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '76px',
                padding: '0 2rem', /* Full width padding */
                width: '100%',
                maxWidth: '1920px',
                margin: '0 auto'
            }}>

                {/* Mobile Menu & Logo Container */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Hamburger Toggle (Mobile Only) */}
                    <button
                        className="mobile-only-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            padding: '0.2rem', color: 'var(--color-text)',
                            display: 'none' // Hidden on desktop normally via CSS, but let's inline CSS for reliable responsive behaviour
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {mobileMenuOpen ? (
                                <path d="M18 6L6 18M6 6l12 12" />
                            ) : (
                                <path d="M3 12h18M3 6h18M3 18h18" />
                            )}
                        </svg>
                    </button>
                    <style>{`
                        @media (max-width: 768px) {
                            .mobile-only-btn { display: block !important; }
                        }
                    `}</style>

                    {/* Logo */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }} aria-label="KFM Masale Home">
                        <div style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            backgroundColor: 'white',
                            border: '1px solid var(--color-border-light)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                        }}>
                            <img src="/images/products/logokfm.jpg" alt="KFM Masale Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div className="brand-text-nav" style={{ lineHeight: 1.2 }}>
                            <span style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: 'var(--color-primary)',
                                display: 'block',
                                letterSpacing: '0.5px'
                            }}>
                                KFM Masale
                            </span>
                            <span style={{
                                fontSize: '0.65rem',
                                textTransform: 'uppercase',
                                letterSpacing: '2.5px',
                                color: 'var(--color-accent)',
                                fontWeight: 600
                            }}>
                                Pure &amp; Organic
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Navigation (Desktop) */}
                <nav className="hide-mobile" aria-label="Main navigation">
                    <ul style={{ display: 'flex', listStyle: 'none', gap: '2rem', margin: 0, padding: 0 }}>
                        <NavLink href="/" label="Home" active={pathname === '/'} />
                        <NavLink href="/#products" label="Our Spices" />
                        <NavLink href="/#about" label="Why Us" />
                    </ul>
                </nav>

                {/* Cart Button */}
                <button
                    onClick={toggleCart}
                    aria-label={`Shopping cart with ${isMounted ? totalItems : 0} items`}
                    style={{
                        background: 'none',
                        border: '1.5px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 0.85rem',
                        fontSize: '0.9rem',
                        color: 'var(--color-text)',
                        fontWeight: 500,
                        transition: 'all var(--transition-fast)'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <span className="hide-mobile">Cart</span>
                    {isMounted && totalItems > 0 && (
                        <span style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            borderRadius: 'var(--radius-full)',
                            minWidth: '22px',
                            height: '22px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '0 6px'
                        }}>
                            {totalItems}
                        </span>
                    )}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div style={{
                    position: 'absolute', top: '76px', left: 0, right: 0,
                    backgroundColor: 'white', borderBottom: '1px solid var(--color-border-light)',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', padding: '1rem 2rem',
                    display: 'flex', flexDirection: 'column', gap: '1rem',
                    zIndex: 49
                }}
                    className="hide-desktop-menu"
                >
                    <style>{`
                        @media (min-width: 769px) { .hide-desktop-menu { display: none !important; } }
                    `}</style>
                    <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: pathname === '/' ? 'var(--color-primary)' : 'var(--color-text)', fontWeight: 600, fontSize: '1.05rem' }}>Home</Link>
                    <Link href="/#products" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--color-text)', fontWeight: 600, fontSize: '1.05rem' }}>Our Spices</Link>
                    <Link href="/#about" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--color-text)', fontWeight: 600, fontSize: '1.05rem' }}>Why Us</Link>
                </div>
            )}
        </header>
    );
}

function NavLink({ href, label, active }) {
    return (
        <li>
            <Link
                href={href}
                style={{
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    color: active ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    position: 'relative',
                    paddingBottom: '4px',
                    borderBottom: active ? '2px solid var(--color-primary)' : '2px solid transparent',
                    transition: 'color var(--transition-fast), border-color var(--transition-fast)'
                }}
            >
                {label}
            </Link>
        </li>
    );
}
