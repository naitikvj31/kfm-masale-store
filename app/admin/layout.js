import Link from 'next/link';
import { logoutClient as logout } from '@/app/actions/auth';
import { Toaster } from 'react-hot-toast';

export const metadata = {
    title: 'Admin Panel — KFM Masale',
};

const navItems = [
    {
        href: '/admin',
        label: 'Dashboard',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
        ),
    },
    {
        href: '/admin/products',
        label: 'Products & Pricing',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
        ),
    },
    {
        href: '/admin/orders',
        label: 'Customer Orders',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
        ),
    },
    {
        href: '/admin/reviews',
        label: 'Product Reviews',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
        ),
    },
];

export default function AdminLayout({ children }) {
    return (
        <>
            <Toaster position="top-right" />
            <style>{`
                .admin-wrapper {
                    display: flex;
                    min-height: 100vh;
                    background-color: #F3F4F6;
                }
                .admin-sidebar {
                    width: 260px;
                    background-color: #111827;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    flex-shrink: 0;
                    position: fixed;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    z-index: 40;
                }
                .admin-main {
                    flex: 1;
                    margin-left: 260px;
                    padding: 2rem 2.5rem;
                    min-width: 0;
                }
                /* Tablet (iPad) */
                @media (max-width: 1024px) {
                    .admin-sidebar {
                        width: 220px;
                    }
                    .admin-main {
                        margin-left: 220px;
                        padding: 1.5rem 1.5rem;
                    }
                }
                /* Small tablet / large phone */
                @media (max-width: 768px) {
                    .admin-sidebar {
                        width: 64px;
                        align-items: center;
                    }
                    .admin-sidebar .brand-text,
                    .admin-sidebar .nav-label {
                        display: none;
                    }
                    .admin-sidebar .brand-icon {
                        margin: 0;
                    }
                    .admin-sidebar .nav-link {
                        justify-content: center;
                        padding: 0.7rem !important;
                    }
                    .admin-sidebar .logout-btn {
                        justify-content: center;
                    }
                    .admin-sidebar .logout-text {
                        display: none;
                    }
                    .admin-main {
                        margin-left: 64px;
                        padding: 1.25rem 1rem;
                    }
                }
            `}</style>

            <div className="admin-wrapper">

                {/* Sidebar */}
                <aside className="admin-sidebar">
                    {/* Brand */}
                    <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div className="brand-icon" style={{
                                width: '36px', height: '36px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                                backgroundColor: 'white'
                            }}>
                                <img src="/images/products/logokfm.jpg" alt="KFM Masale" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div className="brand-text">
                                <div style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '0.3px' }}>KFM Masale</div>
                                <div style={{ fontSize: '0.7rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Admin Panel</div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav style={{ flex: 1, padding: '1rem 0.75rem' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {navItems.map(item => (
                                <li key={item.href}>
                                    <Link href={item.href} className="nav-link" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.7rem 1rem',
                                        borderRadius: '8px',
                                        color: '#D1D5DB',
                                        fontSize: '0.9rem',
                                        fontWeight: 500,
                                        transition: 'background 0.15s, color 0.15s'
                                    }}>
                                        {item.icon}
                                        <span className="nav-label">{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Logout */}
                    <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <form action={logout}>
                            <button type="submit" className="logout-btn" style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                padding: '0.6rem',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: '#9CA3AF',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                fontFamily: 'inherit'
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                                <span className="logout-text">Sign Out</span>
                            </button>
                        </form>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="admin-main">
                    {children}
                </main>
            </div>
        </>
    );
}
