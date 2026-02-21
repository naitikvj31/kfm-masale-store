'use client';

import Link from 'next/link';

function FooterLink({ href, label }) {
    return (
        <li>
            <Link href={href} style={{
                color: 'rgba(255,255,255,0.65)',
                transition: 'color 0.2s ease, padding-left 0.2s ease',
                fontSize: '0.88rem',
                display: 'block',
                paddingBottom: '0.35rem'
            }}>
                {label}
            </Link>
        </li>
    );
}

export default function Footer() {
    return (
        <footer>
            {/* Top accent stripe */}
            <div style={{
                height: '4px',
                background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-primary-light), var(--color-accent))',
            }} />

            <div style={{ backgroundColor: '#1A3D1C' }}>
                {/* Main Footer Content */}
                <div className="container" style={{
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr',
                    gap: '2.5rem',
                    padding: '3.5rem 1.5rem 2.5rem'
                }}>
                    {/* Brand Column */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                            <div style={{
                                width: '56px', height: '56px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                backgroundColor: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                            }}>
                                <img src="/images/products/logokfm.jpg" alt="KFM Masale Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div>
                                <div style={{ color: 'white', fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>KFM Masale</div>
                                <div style={{ fontSize: '0.68rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '2.5px', fontWeight: 600 }}>Pure &amp; Organic Since Generations</div>
                            </div>
                        </div>
                        <p style={{ lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', maxWidth: '320px' }}>
                            Hand-ground, farm-sourced spices crafted with love. We bring the authentic taste of Indian kitchens straight to your doorstep — pure, organic, and full of flavour.
                        </p>

                        {/* Social Icons */}
                        <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.5rem' }}>
                            <a href="https://www.instagram.com/kfmmasale" target="_blank" rel="noopener noreferrer"
                                aria-label="Follow us on Instagram"
                                style={{
                                    width: '40px', height: '40px', borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #FCAF45)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                            <a href="https://wa.me/918875443482" target="_blank" rel="noopener noreferrer"
                                aria-label="Chat on WhatsApp"
                                style={{
                                    width: '40px', height: '40px', borderRadius: '10px',
                                    backgroundColor: '#25D366', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                            <a href="tel:+918875443482" aria-label="Call us"
                                style={{
                                    width: '40px', height: '40px', borderRadius: '10px',
                                    backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    transition: 'transform 0.2s, background 0.2s'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{
                            color: 'var(--color-accent)',
                            fontSize: '0.78rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            marginBottom: '1.25rem',
                            fontWeight: 700,
                            fontFamily: 'var(--font-body)'
                        }}>
                            Quick Links
                        </h4>
                        <ul style={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none' }}>
                            <FooterLink href="/" label="Home" />
                            <FooterLink href="/#products" label="Our Spices" />
                            <FooterLink href="/#about" label="Why Choose Us" />
                            <FooterLink href="/checkout" label="Checkout" />
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h4 style={{
                            color: 'var(--color-accent)',
                            fontSize: '0.78rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            marginBottom: '1.25rem',
                            fontWeight: 700,
                            fontFamily: 'var(--font-body)'
                        }}>
                            Customer Care
                        </h4>
                        <ul style={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none' }}>
                            <FooterLink href="/#products" label="Bulk Orders" />
                            <FooterLink href="https://wa.me/918875443482" label="WhatsApp Support" />
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{
                            color: 'var(--color-accent)',
                            fontSize: '0.78rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            marginBottom: '1.25rem',
                            fontWeight: 700,
                            fontFamily: 'var(--font-body)'
                        }}>
                            Get in Touch
                        </h4>
                        <ul style={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem', listStyle: 'none' }}>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '8px',
                                    backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                </div>
                                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                                    Kamla flour mill, Teli mohalla,<br />Madanganj- kishangarh 305801
                                </span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '8px',
                                    backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                </div>
                                <a href="tel:+918875443482" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>+91 88754 43482</a>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '8px',
                                    backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                </div>
                                <a href="mailto:kamlaflourmill123@gmail.com" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>kamlaflourmill123@gmail.com</a>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '8px',
                                    backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                    </svg>
                                </div>
                                <a href="https://www.instagram.com/kfmmasale" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>@kfmmasale</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Trust bar */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    padding: '1.25rem 1.5rem'
                }}>
                    <div className="container" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '2.5rem',
                        flexWrap: 'wrap',
                        fontSize: '0.8rem',
                        color: 'rgba(255,255,255,0.4)'
                    }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            100% Organic
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                            Pan-India Delivery
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M12 6v6l4 2" /></svg>
                            COD Available
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                            UPI Payments
                        </span>
                    </div>
                </div>

                {/* Copyright */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    padding: '1rem',
                    textAlign: 'center',
                    fontSize: '0.78rem',
                    color: 'rgba(255,255,255,0.25)'
                }}>
                    &copy; {new Date().getFullYear()} KFM Masale — Kamla Flour Mill. All rights reserved. Made with ❤️ in India.
                </div>
            </div>
        </footer>
    );
}
