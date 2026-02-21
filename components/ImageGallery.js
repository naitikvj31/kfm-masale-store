'use client';

import { useState } from 'react';

export default function ImageGallery({ images }) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div style={{
                width: '100%',
                aspectRatio: '1',
                background: 'linear-gradient(135deg, #E8F0E8 0%, #F5F0E8 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#2B5E2E" strokeWidth="1" opacity="0.2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                </svg>
            </div>
        );
    }

    return (
        <div>
            {/* Main Image */}
            <div style={{
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#F9FAFB',
                marginBottom: '0.75rem',
                border: '1px solid #E5E7EB'
            }}>
                <img
                    src={images[activeIndex]?.url}
                    alt={`Product image ${activeIndex + 1}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transition: 'opacity 0.3s ease'
                    }}
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    overflowX: 'auto',
                    paddingBottom: '0.25rem'
                }}>
                    {images.map((img, index) => (
                        <button
                            key={img.id}
                            onClick={() => setActiveIndex(index)}
                            aria-label={`View image ${index + 1}`}
                            style={{
                                width: '72px',
                                height: '72px',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                border: index === activeIndex ? '2px solid #2B5E2E' : '2px solid #E5E7EB',
                                cursor: 'pointer',
                                flexShrink: 0,
                                padding: 0,
                                background: 'none',
                                opacity: index === activeIndex ? 1 : 0.6,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <img
                                src={img.url}
                                alt={`Thumbnail ${index + 1}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
