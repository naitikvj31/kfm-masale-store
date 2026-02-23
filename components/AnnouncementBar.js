'use client';

export default function AnnouncementBar() {
    const messages = [
        '🎨 HAPPY HOLI! Use code HOLI15 for Flat 15% OFF on all 500g & 1kg Premium Spice Packs!',
        '🚚 Free Home Delivery on Orders Above ₹1000',
        '💬 Order Instantly on WhatsApp: +91 88754 43482',
        '✨ Browse our complete range: Authentic Haldi, Mirchi, Dhaniya, & Garam Masala',
        '⭐ 100% Natural & Farm-Fresh — Trusted by Families Across India'
    ];

    const repeatedMessages = [...messages, ...messages, ...messages];

    return (
        <div style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            overflow: 'hidden',
            fontSize: '0.82rem',
            fontWeight: 500,
            letterSpacing: '0.3px',
            position: 'relative',
            height: '36px',
            display: 'flex',
            alignItems: 'center'
        }}>
            <div
                style={{
                    display: 'flex',
                    whiteSpace: 'nowrap',
                    animation: 'marqueeScroll 40s linear infinite',
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
                        <span style={{ color: 'var(--color-accent)', fontSize: '0.6rem' }}>●</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
