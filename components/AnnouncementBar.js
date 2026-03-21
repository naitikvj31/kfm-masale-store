'use client';

export default function AnnouncementBar() {
    const messages = [
        '🌿 Flat 15% OFF on all 500g & 1kg Premium Spice Packs! Limited Time Offer →',
        '🚚 Free Home Delivery on Orders Above ₹1000',
        '💬 Order Instantly on WhatsApp: +91 88754 43482',
        '✨ Browse our complete range: Authentic Haldi, Mirchi, Dhaniya, & Garam Masala',
        '⭐ 100% Natural & Farm-Fresh — Trusted by Families Across India Since 1974',
        '🌾 Pure Organic Spices — No Chemicals, No Preservatives, Just Nature'
    ];

    const repeatedMessages = [...messages, ...messages, ...messages];

    return (
        <div style={{
            background: 'linear-gradient(90deg, #1A3D1C 0%, #2B5E2E 50%, #1A3D1C 100%)',
            color: 'white',
            overflow: 'hidden',
            fontSize: '0.82rem',
            fontWeight: 500,
            letterSpacing: '0.3px',
            position: 'relative',
            height: '38px',
            display: 'flex',
            alignItems: 'center'
        }}>
            <div
                style={{
                    display: 'flex',
                    whiteSpace: 'nowrap',
                    animation: 'marqueeScroll 45s linear infinite',
                    gap: '3rem'
                }}
            >
                {repeatedMessages.map((msg, i) => (
                    <span
                        key={i}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            paddingRight: '3rem'
                        }}
                    >
                        {msg}
                        <span style={{ color: 'var(--color-accent)', fontSize: '0.5rem' }}>◆</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
