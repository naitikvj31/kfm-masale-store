'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from './CartProvider';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const firstImage = product.images?.[0]?.url || product.imageUrl || null;
    const variants = product.variants || [];

    // Sort variants by price
    const sortedVariants = [...variants].sort((a, b) => a.price - b.price);

    // Track the currently selected variant
    const [selectedVariant, setSelectedVariant] = useState(sortedVariants.length > 0 ? sortedVariants[0] : null);

    const getMaxDiscountPercent = () => {
        if (!variants.length) return 0;
        let maxPercent = 0;
        variants.forEach(v => {
            if (v.discountPrice && v.discountPrice < v.price) {
                const percent = Math.round(((v.price - v.discountPrice) / v.price) * 100);
                if (percent > maxPercent) maxPercent = percent;
            }
        });
        return maxPercent;
    };
    const maxDiscountPercent = getMaxDiscountPercent();

    const totalStock = variants.reduce((sum, v) => sum + v.stockQuantity, 0) || 0;
    const isOutOfStock = totalStock <= 0;

    // Current display price based on selection
    const displayPrice = selectedVariant ? (selectedVariant.discountPrice || selectedVariant.price) : 0;
    const originalPrice = selectedVariant?.price;
    const hasDiscount = selectedVariant?.discountPrice && selectedVariant.discountPrice < originalPrice;

    return (
        <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
            <article style={{
                background: 'white',
                borderRadius: '16px',
                border: '1px solid var(--color-border-light)',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                cursor: 'pointer',
                position: 'relative'
            }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                {/* Image Area */}
                <div style={{
                    width: '100%',
                    paddingBottom: '100%', /* Bulletproof 1:1 aspect ratio */
                    position: 'relative',
                    overflow: 'hidden',
                    background: firstImage ? '#F9FAFB' : 'linear-gradient(135deg, #E8F0E8 0%, #F5F0E8 100%)',
                    flexShrink: 0
                }}>
                    {firstImage ? (
                        <img
                            src={firstImage}
                            alt={product.name}
                            loading="lazy"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.5s ease',
                                objectPosition: 'center'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    ) : (
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}>
                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1" opacity="0.2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                            </svg>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', letterSpacing: '1px' }}>No Image Yet</span>
                        </div>
                    )}

                    {/* Badges */}
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '0.4rem',
                        zIndex: 10
                    }}>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            <span style={{
                                backgroundColor: 'rgba(43, 94, 46, 0.92)',
                                color: 'white',
                                padding: '0.25rem 0.6rem',
                                borderRadius: '6px',
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                letterSpacing: '0.5px',
                                textTransform: 'uppercase',
                                backdropFilter: 'blur(4px)'
                            }}>
                                Organic
                            </span>
                            {maxDiscountPercent > 0 && (
                                <span style={{
                                    backgroundColor: 'var(--color-warm)',
                                    color: 'white',
                                    padding: '0.25rem 0.6rem',
                                    borderRadius: '6px',
                                    fontSize: '0.65rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.5px',
                                    boxShadow: 'var(--shadow-sm)'
                                }}>
                                    {maxDiscountPercent}% OFF
                                </span>
                            )}
                        </div>

                        {product.isHotSeller && (
                            <span className="animate-badge-pulse" style={{
                                backgroundColor: '#EF4444',
                                color: 'white',
                                padding: '0.3rem 0.6rem',
                                borderRadius: '6px',
                                fontSize: '0.65rem',
                                fontWeight: 800,
                                letterSpacing: '0.5px',
                                textTransform: 'uppercase',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.2rem'
                            }}>
                                🔥 Best Seller
                            </span>
                        )}
                        {product.isNewArrival && (
                            <span className="animate-badge-shine" style={{
                                color: 'white',
                                padding: '0.3rem 0.6rem',
                                borderRadius: '6px',
                                fontSize: '0.65rem',
                                fontWeight: 800,
                                letterSpacing: '0.5px',
                                textTransform: 'uppercase',
                                boxShadow: '0 2px 4px rgba(59,130,246,0.3)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.2rem'
                            }}>
                                🌟 New Arrival
                            </span>
                        )}
                    </div>

                    {isOutOfStock && (
                        <div style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            backgroundColor: 'rgba(220, 38, 38, 0.92)',
                            color: 'white',
                            padding: '0.3rem 0.75rem',
                            borderRadius: '8px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            letterSpacing: '0.5px'
                        }}>
                            Sold Out
                        </div>
                    )}
                </div>

                {/* Content */}
                <div style={{
                    padding: '1.25rem 1.35rem 1.35rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1
                }}>
                    <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.15rem',
                        color: 'var(--color-text)',
                        marginBottom: '0.4rem',
                        lineHeight: 1.35
                    }}>
                        {product.name}
                    </h3>

                    {product.description && (
                        <p style={{
                            color: 'var(--color-text-muted)',
                            fontSize: '0.85rem',
                            lineHeight: 1.6,
                            marginBottom: '1rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {product.description}
                        </p>
                    )}

                    {/* Price + Sizes info */}
                    <div style={{ marginTop: 'auto' }} onClick={(e) => {
                        // Prevent the card level click from firing when interacting with variants
                        e.preventDefault();
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '0.5rem',
                            marginBottom: '0.75rem'
                        }}>
                            <span style={{
                                fontSize: '1.4rem',
                                fontWeight: 700,
                                color: 'var(--color-primary)',
                                fontFamily: 'var(--font-heading)'
                            }}>
                                ₹{displayPrice}
                            </span>
                            {hasDiscount && (
                                <span style={{
                                    fontSize: '0.9rem',
                                    color: 'var(--color-text-light)',
                                    textDecoration: 'line-through'
                                }}>
                                    ₹{originalPrice}
                                </span>
                            )}
                        </div>

                        {sortedVariants.length > 0 && (
                            <div style={{
                                display: 'flex',
                                gap: '0.4rem',
                                flexWrap: 'wrap',
                                marginBottom: '1rem'
                            }}>
                                {sortedVariants.map(v => (
                                    <button
                                        key={v.id}
                                        onClick={(e) => {
                                            e.preventDefault(); // Stop Link navigation
                                            setSelectedVariant(v);
                                        }}
                                        style={{
                                            padding: '0.3rem 0.6rem',
                                            borderRadius: '6px',
                                            border: selectedVariant?.id === v.id ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                                            fontSize: '0.75rem',
                                            fontWeight: selectedVariant?.id === v.id ? 600 : 500,
                                            color: selectedVariant?.id === v.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                            backgroundColor: selectedVariant?.id === v.id ? 'var(--color-bg-sage)' : 'var(--color-bg)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            outline: 'none'
                                        }}
                                    >
                                        {v.size}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* CTA Button */}
                        <button
                            disabled={isOutOfStock}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (!isOutOfStock && selectedVariant) {
                                    addToCart(product, selectedVariant);
                                }
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                padding: '0.7rem',
                                width: '100%',
                                border: 'none',
                                cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                                backgroundColor: isOutOfStock ? '#F3F4F6' : 'var(--color-primary)',
                                color: isOutOfStock ? '#9CA3AF' : 'white',
                                borderRadius: '10px',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                transition: 'background 0.2s ease'
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                            {isOutOfStock ? 'Sold Out' : 'Buy'}
                        </button>
                    </div>
                </div>
            </article>
        </Link>
    );
}
