'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin as login } from '@/app/actions/adminAuth';

export default function AdminLoginPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const result = await login(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        } else {
            router.push('/admin');
        }
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
            padding: '1rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '3rem 2.5rem',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '56px', height: '56px',
                        background: 'linear-gradient(135deg, #2B5E2E, #4CAF50)',
                        borderRadius: '14px',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white',
                        fontFamily: 'Playfair Display, serif',
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        marginBottom: '1rem'
                    }}>K</div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#111827', marginBottom: '0.35rem' }}>
                        Admin Login
                    </h1>
                    <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Enter your credentials to access the dashboard</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: '#374151' }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            autoFocus
                            style={{
                                width: '100%',
                                padding: '0.85rem 1rem',
                                border: '1.5px solid #E5E7EB',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                fontFamily: 'inherit',
                                transition: 'border-color 0.2s',
                                outline: 'none'
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = '#2B5E2E'}
                            onBlur={e => e.currentTarget.style.borderColor = '#E5E7EB'}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: '#374151' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            placeholder="***************"
                            style={{
                                width: '100%',
                                padding: '0.85rem 1rem',
                                border: '1.5px solid #E5E7EB',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                fontFamily: 'inherit',
                                transition: 'border-color 0.2s',
                                outline: 'none'
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = '#2B5E2E'}
                            onBlur={e => e.currentTarget.style.borderColor = '#E5E7EB'}
                        />
                    </div>

                    {error && (
                        <div style={{
                            backgroundColor: '#FEE2E2',
                            color: '#991B1B',
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            fontWeight: 500
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '0.85rem',
                            backgroundColor: '#2B5E2E',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            fontFamily: 'inherit',
                            transition: 'background 0.2s'
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
