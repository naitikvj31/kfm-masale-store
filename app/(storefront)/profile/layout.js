import { getSession } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { logoutClient } from '@/app/actions/auth';

export default async function ProfileLayout({ children }) {
    const session = await getSession();

    if (!session) {
        redirect('/login');
    }

    return (
        <main className="container section" style={{ padding: '3rem 1rem' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(250px, 1fr) 3fr',
                gap: '2.5rem',
                alignItems: 'start'
            }}>
                {/* Sidebar Navigation */}
                <aside style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '2rem 1.5rem',
                    border: '1px solid var(--color-border-light)',
                    boxShadow: 'var(--shadow-sm)'
                }}>
                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-bg-sage)',
                            color: 'var(--color-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            margin: '0 auto 1rem',
                        }}>
                            {session.name.charAt(0).toUpperCase()}
                        </div>
                        <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-text)', marginBottom: '0.25rem' }}>
                            {session.name}
                        </h2>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                            {session.email}
                        </p>
                    </div>

                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Link href="/profile" style={sidebarLinkStyle}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            Account Overview
                        </Link>
                        <Link href="/profile/orders" style={sidebarLinkStyle}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                            Your Orders
                        </Link>

                        <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '1rem 0' }}></div>

                        <form action={logoutClient}>
                            <button type="submit" style={{ ...sidebarLinkStyle, width: '100%', color: 'var(--color-danger)', border: 'none', backgroundColor: 'transparent', textAlign: 'left', cursor: 'pointer' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                                Sign Out
                            </button>
                        </form>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <section style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '2.5rem',
                    border: '1px solid var(--color-border-light)',
                    boxShadow: 'var(--shadow-sm)',
                    minHeight: '400px'
                }}>
                    {children}
                </section>
            </div>

            {/* Inline styles for responsive layout */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 768px) {
                    .container > div {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}} />
        </main>
    );
}

const sidebarLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.85rem 1rem',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '0.95rem',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'background-color 0.2s',
};
