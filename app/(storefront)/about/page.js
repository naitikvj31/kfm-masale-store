import BenefitCard from '@/components/BenefitCard';

export const metadata = {
    title: 'Why Choose KFM Masale — Our Story',
    description: 'Learn why KFM Masale has been a trusted Indian spice company since 1974. 100% organic, stone-ground, and farm-sourced spices.',
};

export default function AboutPage() {
    return (
        <main style={{ minHeight: '60vh', paddingBottom: '3rem' }}>
            {/* ===== HEADER BANNER ===== */}
            <section className="hero-section" style={{
                background: 'linear-gradient(135deg, #1A3D1C 0%, #2B5E2E 40%, #1E4A20 70%, #2B5E2E 100%)',
                padding: '6rem 0 5rem',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Organic leaf pattern overlay */}
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.035,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M40 10c-5 8-15 15-15 25s10 15 15 15 15-5 15-15S45 18 40 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />

                {/* Subtle radial glow */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '80%', height: '100%',
                    background: 'radial-gradient(ellipse, rgba(200,162,92,0.1) 0%, transparent 60%)',
                    pointerEvents: 'none'
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                        marginBottom: '1rem',
                        lineHeight: 1.2
                    }}>
                        <span style={{
                            background: 'linear-gradient(90deg, #E8D5A8, #C8A25C)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>About KFM Masale</span>
                    </h1>
                    <p style={{ opacity: 0.9, fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto', color: 'rgba(255,255,255,0.9)' }}>
                        Bringing the authentic taste of Rajasthan to every Indian kitchen since 1974.
                    </p>
                </div>
            </section>

            {/* ===== SEO ON-PAGE CONTENT BLOCK ===== */}
            <section style={{
                position: 'relative',
                padding: '5rem 0 3rem',
                backgroundColor: 'var(--color-bg-sage)',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1100px' }}>
                    <div className="seo-content-grid" style={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem'
                    }}>
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', marginBottom: '1.25rem' }}>🏪 Who We Are</h3>
                            <p style={{ color: 'var(--color-text)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                                Welcome to <strong>KFM Masale</strong>, your destination to buy pure spices online in India. Based in Kishangarh, Rajasthan, we have been supplying authentic Indian spices and premium quality masalas since 1974.
                            </p>
                        </div>
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', marginBottom: '1.25rem' }}>🌿 Our Spice Range</h3>
                            <p style={{ color: 'var(--color-text)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                                Our carefully curated collection of pure spices caters to your daily needs. From pure turmeric powder (organic haldi) to authentic pure hing (asafoetida), we exclusively sell what we make natively.
                            </p>
                        </div>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '2rem 2.5rem', borderRadius: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', marginBottom: '1.25rem' }}>🍛 Spice Blends &amp; Specialties</h3>
                        <p style={{ color: 'var(--color-text)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                            We specialize in vibrant colors and authentic heat, featuring our Special Mirch Powder, Kashmiri Mirchi, and Garam Masala. We also offer our highly requested aromatic tea masala (chai patti masala). Experience why KFM Masale is considered among the best in India!
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== WHY US SECTION ===== */}
            <section className="section" style={{ backgroundColor: 'white' }}>
                <div className="container">
                    <div className="section-header">
                        <h2 style={{ color: 'var(--color-primary)' }}>Why Choose KFM Masale</h2>
                        <p>We bring the freshest, most authentic spices to your doorstep.</p>
                        <div className="section-divider"></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        <BenefitCard
                            icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>}
                            title="Certified Organic"
                            description="Every spice is naturally grown without chemical pesticides, preservatives, or artificial flavors."
                        />
                        <BenefitCard
                            icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>}
                            title="Crafted with Care"
                            description="Hand-selected, stone-ground, and packed fresh to retain aroma and health benefits."
                        />
                        <BenefitCard
                            icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>}
                            title="50+ Years of Trust"
                            description="Carefully crafted homemade spices since 1974, bringing authentic taste of tradition without any preservatives or additives."
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
