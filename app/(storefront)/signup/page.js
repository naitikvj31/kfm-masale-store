'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signupClient } from '@/app/actions/auth';
import { toast } from 'react-hot-toast';

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const formData = new FormData(e.target);

            toast.loading('Creating account...', { id: 'signup' });
            const res = await signupClient(formData);
            toast.dismiss('signup');

            if (res.error) {
                toast.error(res.error, { duration: 5000 });
            } else if (res.success) {
                toast.success(res.message || "Account created successfully! Please verify your email.", { duration: 6000 });
                router.push('/login');
                router.refresh();
            }
        } catch (err) {
            toast.dismiss('signup');
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
                    <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '2.2rem', marginBottom: '0.5rem' }}>
                        Create Account
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                        Join KFM Masale for faster checkout and exclusive offers.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

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
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            placeholder="Create a strong password"
                            minLength={6}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                        style={{ marginTop: '1rem', width: '100%', padding: '0.9rem', fontSize: '1rem' }}
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
                    Already have an account?{' '}
                    <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
                        Sign In
                    </Link>
                </div>
            </div>
        </main>
    );
}
