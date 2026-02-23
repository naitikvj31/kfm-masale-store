import { getSession } from '@/app/actions/auth';

export default async function ProfilePage() {
    const session = await getSession();

    return (
        <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '2rem' }}>
                Account Overview
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Personal Details Card */}
                <div style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    height: '100%'
                }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '0.75rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        Personal Details
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name</p>
                            <p style={{ fontWeight: 500 }}>{session.name}</p>
                        </div>
                        <div>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</p>
                            <p style={{ fontWeight: 500 }}>{session.email}</p>
                        </div>
                    </div>
                </div>

                {/* Security / Password Card */}
                <div style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    height: '100%'
                }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '0.75rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        Security & Login
                    </h3>

                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label" style={{ fontSize: '0.85rem' }}>New Password</label>
                            <input
                                type="password"
                                className="form-input"
                                placeholder="Enter new password"
                                style={{ padding: '0.6rem 0.8rem' }}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" style={{ fontSize: '0.85rem' }}>Confirm Password</label>
                            <input
                                type="password"
                                className="form-input"
                                placeholder="Confirm new password"
                                style={{ padding: '0.6rem 0.8rem' }}
                            />
                        </div>
                        <button type="button" className="btn btn-outline" style={{ padding: '0.6rem', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
