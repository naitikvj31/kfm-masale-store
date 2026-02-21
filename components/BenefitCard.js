'use client';

export default function BenefitCard({ icon, title, description }) {
    return (
        <div style={{
            background: 'white',
            padding: '2.5rem 2rem',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-border-light)',
            transition: 'transform var(--transition-base), box-shadow var(--transition-base)'
        }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
        >
            <div style={{
                width: '64px', height: '64px',
                backgroundColor: 'var(--color-bg-sage)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.25rem'
            }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>{title}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>{description}</p>
        </div>
    );
}
