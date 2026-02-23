'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginClient } from '@/app/actions/auth';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const formData = new FormData(e.target);

            toast.loading('Signing in...', { id: 'login' });
            const res = await loginClient(formData);
            toast.dismiss('login');

            if (res.error) {
                toast.error(res.error, { duration: 5000 });
            } else { // Assuming success if no error
                toast.success('Welcome back!');
                // Success! See if they came from checkout
                const params = new URLSearchParams(window.location.search);
                const redirectUrl = params.get('redirect') || '/profile';

                router.push(redirectUrl);
                router.refresh();
            }
        } catch (err) {
            toast.dismiss('login');
            toast.error("A network error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="container section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
                maxWidth: '450px',
                width: '100%',
                backgroundColor: 'white',
                padding: '3rem 2.5rem',
                borderRadius: '24px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
                border: '1px solid var(--color-border-light)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden',
                        margin: '0 auto 1.5rem', border: '1px solid var(--color-border-light)',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                    }}>
                        <img src="/images/products/logokfm.jpg" alt="KFM Masale" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '2.2rem', marginBottom: '0.5rem' }}>
                        Welcome Back
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                        Sign in to manage your orders and profile.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label className="form-label" htmlFor="password">Password</label>
                            <Link href="/forgot-password" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                                Forgot Password?
                            </Link>
                        </div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                        style={{ marginTop: '1rem', width: '100%', padding: '0.9rem', fontSize: '1rem' }}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
                    Don't have an account?{' '}
                    <Link href="/signup" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
                        Sign Up
                    </Link>
                </div>
            </div>
        </main>
    );
}
