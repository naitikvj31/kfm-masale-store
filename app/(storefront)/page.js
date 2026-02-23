import { PrismaClient } from '@prisma/client';
import ProductCard from '@/components/ProductCard';
import BenefitCard from '@/components/BenefitCard';

const prisma = new PrismaClient();

export const metadata = {
  title: 'KFM Masale — Pure & Organic Indian Spices',
  description: 'Shop 100% organic, farm-fresh Indian spices from KFM Masale. Turmeric, Garam Masala, Cumin, Red Chili Powder and more. Available in 50g to 1kg packs.',
  keywords: 'organic spices, Indian masale, turmeric, garam masala, cumin, organic masala shop, KFM Masale',
  openGraph: {
    title: 'KFM Masale — Pure & Organic Indian Spices',
    description: 'Shop 100% organic, farm-fresh Indian spices.',
    type: 'website',
  }
};

export default async function Home() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    include: {
      variants: {
        orderBy: { price: 'asc' }
      },
      images: {
        orderBy: { sortOrder: 'asc' },
        take: 1
      }
    }
  });

  return (
    <main>
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section" style={{
        background: 'linear-gradient(135deg, #1A3D1C 0%, #2B5E2E 50%, #3D8B40 100%)',
        color: 'white',
        padding: '6rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
            {/* Text Content */}
            <div style={{ flex: '1 1 450px' }}>
              <span className="animate-fade-in-up" style={{
                display: 'inline-block',
                backgroundColor: 'rgba(200,162,92,0.2)',
                border: '1px solid rgba(200,162,92,0.4)',
                color: 'var(--color-accent-light)',
                padding: '0.4rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '1.5rem'
              }}>
                100% Natural &bull; Farm Fresh
              </span>

              <h1 className="animate-fade-in-up" style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)',
                fontWeight: 700,
                marginBottom: '1.5rem',
                lineHeight: 1.15,
                color: 'white'
              }}>
                Pure Organic Spices <br />
                <span style={{ color: 'var(--color-accent-light)' }}>For Your Kitchen</span>
              </h1>

              <p className="animate-fade-in-up-delay-1" style={{
                fontSize: '1.15rem',
                marginBottom: '2.5rem',
                opacity: 0.9,
                lineHeight: 1.7,
                maxWidth: '520px'
              }}>
                Our spices are sourced directly from the finest farms, sun-dried to perfection, and ground at low temperatures. This ensures every pinch delivers maximum aroma, rich color, and authentic flavor to your everyday cooking.
              </p>

              <div className="animate-fade-in-up-delay-2">
                <a href="#products" className="btn btn-white btn-lg" style={{ display: 'inline-flex', padding: '0.8rem 2.2rem', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', backgroundColor: 'white', color: 'var(--color-primary)' }}>
                  Explore Our Spices
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div style={{ flex: '1 1 450px', position: 'relative' }}>
              <div className="animate-fade-in-up-delay-1" style={{ position: 'relative', zIndex: 2 }}>
                <div style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  border: '8px solid rgba(255,255,255,0.1)'
                }}>
                  <img
                    src="/images/products/whole.jpg"
                    alt="Authentic KFM Masale Spices"
                    style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '4/3', objectFit: 'cover' }}
                  />
                </div>
              </div>
              {/* Glow Effect */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '120%', height: '120%',
                background: 'radial-gradient(circle, rgba(200,162,92,0.15) 0%, rgba(200,162,92,0) 70%)',
                zIndex: 1, pointerEvents: 'none'
              }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY US SECTION ===== */}
      <section id="about" className="section" style={{ backgroundColor: 'var(--color-bg-cream)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Why Choose KFM Masale</h2>
            <p>We bring the freshest, most authentic spices to your doorstep.</p>
            <div className="section-divider"></div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
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
              title="Authentic Homemade"
              description="Carefully crafted homemade spices, bringing you the authentic taste of tradition without any preservatives or additives."
            />
          </div>
        </div>
      </section>

      {/* ===== PRODUCT CATALOG ===== */}
      <section id="products" className="section">
        <div className="container">
          <div className="section-header">
            <h2>Our Spice Collection</h2>
            <p>Browse our range of premium organic spices, available from 50g to 1kg.</p>
            <div className="section-divider"></div>
          </div>

          {products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
              <p style={{ fontSize: '1.1rem' }}>Our spice collection is being updated. Please check back soon!</p>
            </div>
          ) : (
            <div className="product-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '2rem'
            }}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>



      {/* ===== TRUST SIGNALS ===== */}
      <section style={{ backgroundColor: 'var(--color-bg-sage)', padding: '3rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
            <span style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.95rem' }}>Free Delivery on Orders Above ₹1000</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            <span style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.95rem' }}>100% Quality Guarantee</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            <span style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.95rem' }}>Easy Order via WhatsApp</span>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="section" style={{ backgroundColor: 'var(--color-primary)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '650px' }}>
          <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>Ready to Spice Up Your Kitchen?</h2>
          <p style={{ opacity: 0.85, fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            Browse our collection above, add your favourite spices to the cart, and complete your order in seconds via WhatsApp. It&apos;s that easy!
          </p>
          <a href="#products" className="btn btn-white btn-lg">
            Shop Now
          </a>
        </div>
      </section>
    </main>
  );
}
