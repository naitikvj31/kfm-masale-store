'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { verifyEmailClient } from '@/app/actions/auth';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [status, setStatus] = useState('loading'); // loading, success, error
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('No verification token found in the link.');
            return;
        }

        verifyEmailClient(token).then((res) => {
            if (res.error) {
                setStatus('error');
                setMessage(res.error);
                toast.error(res.error);
            } else {
                setStatus('success');
                setMessage(res.message);
                toast.success(res.message);

                // Redirect to login after 3 seconds
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            }
        });
    }, [token, router]);

    return (
        <div style={{ textAlign: 'center' }}>
            {status === 'loading' && (
                <div style={{ padding: '2rem' }}>
                    <div style={{
                        display: 'inline-block', width: '40px', height: '40px',
                        border: '4px solid #f3f3f3', borderTop: '4px solid var(--color-primary)',
                        borderRadius: '50%', animation: 'spin 1s linear infinite'
                    }}></div>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    <h2 style={{ marginTop: '1rem', color: 'var(--color-text)' }}>{message}</h2>
                </div>
            )}

            {status === 'success' && (
                <div style={{ padding: '2rem' }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '60px', height: '60px', borderRadius: '50%',
                        backgroundColor: '#DEF7EC', color: '#03543F', margin: '0 auto 1rem'
                    }}>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <h2 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Email Verified!</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>{message}</p>
                    <Link href="/login" className="btn btn-primary">
                        Continue to Login
                    </Link>
                </div>
            )}

            {status === 'error' && (
                <div style={{ padding: '2rem' }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '60px', height: '60px', borderRadius: '50%',
                        backgroundColor: '#FDE8E8', color: '#9B1C1C', margin: '0 auto 1rem'
                    }}>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    </div>
                    <h2 style={{ color: '#9B1C1C', marginBottom: '0.5rem' }}>Verification Failed</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>{message}</p>
                    <Link href="/signup" className="btn btn-primary" style={{ backgroundColor: '#111827', color: 'white' }}>
                        Return to Sign Up
                    </Link>
                </div>
            )}
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <main className="container section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
                maxWidth: '450px',
                width: '100%',
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '24px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
                border: '1px solid var(--color-border-light)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '1.8rem', margin: 0 }}>
                        KFM Masale
                    </h1>
                </div>

                <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading verification...</div>}>
                    <VerifyEmailContent />
                </Suspense>
            </div>
        </main>
    );
}
