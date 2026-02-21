'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartProvider';

export default function AddToCartSection({ product }) {
    const { addToCart } = useCart();
    const [selectedVariantId, setSelectedVariantId] = useState(
        product.variants[0]?.id || null
    );
    const [added, setAdded] = useState(false);

    const selectedVariant = product.variants.find(v => v.id === selectedVariantId);

    // Calculate display pricing for the selected variant
    const currentPrice = selectedVariant?.discountPrice || selectedVariant?.price || 0;
    const hasDiscount = selectedVariant?.discountPrice && selectedVariant.discountPrice < selectedVariant.price;
    const discountPercent = hasDiscount
        ? Math.round(((selectedVariant.price - selectedVariant.discountPrice) / selectedVariant.price) * 100)
        : 0;

    function handleAddToCart() {
        if (!selectedVariant) return;
        addToCart(product, selectedVariant);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    }

    if (!product.variants.length) {
        return (
            <div style={{
                padding: '1.5rem',
                backgroundColor: '#FEF2F2',
                borderRadius: '12px',
                textAlign: 'center',
                color: '#991B1B',
                fontWeight: 500
            }}>
                This product is currently out of stock.
            </div>
        );
    }

    return (
        <div>
            {/* Pack Size Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#6B7280',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '0.75rem'
                }}>
                    Choose Pack Size
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {product.variants.map(variant => (
                        <button
                            key={variant.id}
                            onClick={() => setSelectedVariantId(variant.id)}
                            disabled={variant.stockQuantity <= 0}
                            style={{
                                padding: '0.65rem 1.25rem',
                                borderRadius: '10px',
                                border: variant.id === selectedVariantId
                                    ? '2px solid #2B5E2E'
                                    : '2px solid #E5E7EB',
                                backgroundColor: variant.id === selectedVariantId ? '#E8F5E9' : 'white',
                                color: variant.stockQuantity <= 0 ? '#9CA3AF' : '#111827',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                cursor: variant.stockQuantity <= 0 ? 'not-allowed' : 'pointer',
                                opacity: variant.stockQuantity <= 0 ? 0.5 : 1,
                                fontFamily: 'inherit',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            {variant.size}
                            {variant.stockQuantity <= 0 && ' (Out of Stock)'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price */}
            {selectedVariant && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <span style={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            color: '#111827',
                            fontFamily: 'var(--font-heading)'
                        }}>
                            ₹{currentPrice}
                        </span>

                        {hasDiscount && (
                            <>
                                <span style={{
                                    fontSize: '1.25rem',
                                    color: '#9CA3AF',
                                    textDecoration: 'line-through',
                                    fontWeight: 500
                                }}>
                                    ₹{selectedVariant.price}
                                </span>
                                <span style={{
                                    backgroundColor: 'rgba(225, 138, 7, 0.1)',
                                    color: 'var(--color-warm)',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '6px',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.5px'
                                }}>
                                    {discountPercent}% OFF
                                </span>
                            </>
                        )}
                        <span style={{ color: '#6B7280', fontSize: '0.9rem', marginLeft: hasDiscount ? '0' : '0.5rem' }}>
                            for {selectedVariant.size}
                        </span>
                    </div>

                    {selectedVariant.stockQuantity > 0 && selectedVariant.stockQuantity <= 10 && (
                        <div style={{ color: '#DC2626', fontSize: '0.85rem', fontWeight: 500, marginTop: '0.35rem' }}>
                            Only {selectedVariant.stockQuantity} left in stock!
                        </div>
                    )}
                </div>
            )}

            {/* Add to Cart Button */}
            <button
                onClick={handleAddToCart}
                disabled={!selectedVariant || selectedVariant.stockQuantity <= 0}
                style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: added ? '#166534' : '#2B5E2E',
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
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                    transform: added ? 'scale(0.98)' : 'scale(1)'
                }}
            >
                {added ? (
                    <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                        Added to Cart!
                    </>
                ) : (
                    <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                        Add to Cart — ₹{currentPrice}
                    </>
                )}
            </button>
        </div>
    );
}
