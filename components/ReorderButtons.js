'use client';

import { useTransition } from 'react';
import { updateProductSortOrder } from '@/app/actions/products';

export default function ReorderButtons({ productId, isFirst, isLast }) {
    const [isPending, startTransition] = useTransition();

    function handleMove(direction) {
        startTransition(async () => {
            await updateProductSortOrder(productId, direction);
        });
    }

    const btnStyle = (disabled) => ({
        background: 'none',
        border: '1px solid #D1D5DB',
        borderRadius: '6px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        padding: '0.35rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.3 : (isPending ? 0.5 : 1),
        transition: 'all 0.15s ease',
        color: '#374151'
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <button
                onClick={() => handleMove('up')}
                disabled={isFirst || isPending}
                title="Move up (show earlier)"
                style={btnStyle(isFirst)}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="18 15 12 9 6 15" />
                </svg>
            </button>
            <button
                onClick={() => handleMove('down')}
                disabled={isLast || isPending}
                title="Move down (show later)"
                style={btnStyle(isLast)}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
        </div>
    );
}
