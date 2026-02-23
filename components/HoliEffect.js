'use client';

import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

export default function HoliEffect() {
    const [windowDimension, setDimension] = useState({ width: 0, height: 0 });
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        // Stop confetti after 7 seconds
        const timer = setTimeout(() => {
            setIsActive(false);
        }, 7000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Only run on client side
        setDimension({
            width: window.innerWidth,
            height: window.innerHeight
        });

        const handleResize = () => {
            setDimension({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (windowDimension.width === 0) return null; // Avoid render on server

    return (
        <div style={{ pointerEvents: 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
            <Confetti
                width={windowDimension.width}
                height={windowDimension.height}
                // Bright Holi Colors: Pink, Green, Yellow, Orange, Purple, Blue
                colors={['#FF1493', '#00FF00', '#FFFF00', '#FF4500', '#9400D3', '#00BFFF']}
                numberOfPieces={120}
                gravity={0.06}
                wind={0.01}
                opacity={0.9}
                recycle={isActive}
            />
        </div>
    );
}
