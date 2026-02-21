'use client';

import { toggleProductActive } from '@/app/actions/products';

export default function ToggleActiveButton({ productId, isActive }) {
    return (
        <form action={toggleProductActive.bind(null, productId)}>
            <button type="submit" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.85rem',
                backgroundColor: isActive ? '#DCFCE7' : '#FEE2E2',
                color: isActive ? '#166534' : '#991B1B',
                border: `1px solid ${isActive ? '#BBF7D0' : '#FECACA'}`,
                borderRadius: '99px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.78rem',
                fontFamily: 'inherit',
                transition: 'all 0.15s ease'
            }}>
                <span style={{
                    width: '8px', height: '8px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? '#22C55E' : '#EF4444'
                }}></span>
                {isActive ? 'Active' : 'Inactive'}
            </button>
        </form>
    );
}
