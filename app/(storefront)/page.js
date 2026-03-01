import { PrismaClient } from '@prisma/client';
import ProductCard from '@/components/ProductCard';
import BenefitCard from '@/components/BenefitCard';
import HoliEffect from '@/components/HoliEffect';

const prisma = new PrismaClient();

export const metadata = {
  title: 'KFM Masale — Buy Pure & Organic Indian Spices Online',
  description: 'Shop 100% organic, farm-fresh Indian spices from KFM Masale. Turmeric, Garam Masala, Cumin, Red Chili Powder and more. Buy premium quality masalas online.',
  keywords: 'kfm masale, spices, pure spices, organic indian spices, best spices online, buy spices online india, authentic indian spices, fresh ground spices, wholesale spices india, premium quality masalas, natural herbs and spices, kfm masale kishangarh, rajasthan spices online, highest quality spices, bulk masalas, export quality spices, farm fresh spices, homemade masalas, traditional stone ground spices, chemical free spices, no preservatives spices, pure turmeric powder, organic haldi online, best garam masala powder, pure red chili powder, authentic cumin seeds, jeera powder online, coriander powder, dhaniya powder, pure hing, asafoetida online, black pepper powder, kali mirch, dry ginger powder, saunth, amchur powder, dry mango powder, kasuri methi, fenugreek leaves, green cardamom, hari elaichi, cloves, laung, cinnamon sticks, dalchini, bay leaves, tej patta, black cardamom, badi elaichi, mace, javitri, nutmeg, jaiphal, star anise, chakri phool, mustard seeds, sarson, fennel seeds, saunf, carom seeds, ajwain, sesame seeds, til, poppy seeds, khus khus, rock salt, sendha namak, black salt, kala namak, chaat masala, chhole masala, pav bhaji masala, sambar masala, rasam powder, meat masala, chicken masala, biryani masala, kitchen king masala, tea masala, chai patti masala, authentic rajasthani spices, rajasthani mirchi powder, mathania red chilli, kashmiri lal mirch powder, spicy masale, organic spice store, best spice brand in india, buy pure spices, rajasthani spices supplier, top indian spice company, natural food spices, organic culinary spices, unadulterated masalas, indian cooking spices, spice blends for cooking, masale for daily use, best quality hing, premium haldi powder, raw spices online, whole spices wholesale, indian herbs store',
  openGraph: {
    title: 'KFM Masale — Buy Pure & Organic Indian Spices Online',
    description: 'Shop 100% organic, farm-fresh Indian spices. Order premium, authentic stone-ground masalas online from KFM Masale.',
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
      },
      reviews: { select: { rating: true }, where: { isApproved: true } }
    }
  });

  return (
    <main>
      <HoliEffect />
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
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <span className="animate-fade-in-up" style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(200,162,92,0.2)',
                  border: '1px solid rgba(200,162,92,0.4)',
                  color: 'var(--color-accent-light)',
                  padding: '0.4rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  ✨ 50+ Years of Trust
                </span>
                <span className="animate-fade-in-up delay-1" style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  padding: '0.4rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  100% Natural &bull; Farm Fresh
                </span>
              </div>

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
              description="Carefully crafted homemade spices, bringing you the authentic taste of a 50-year-old tradition (Since 1974) without any preservatives or additives."
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
            <svg width="28" height="28" viewBox="0 2 20 20" fill="none" stroke="var(--color-primary)" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            <span style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.95rem' }}>Over 50 Years of Trust (Since 1974)</span>
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

      {/* ===== SEO ON-PAGE CONTENT BLOCK ===== */}
      <section style={{ backgroundColor: '#F9FAFB', padding: '3rem 0', borderTop: '1px solid var(--color-border-light)' }}>
        <div className="container" style={{
          maxWidth: '900px',
          margin: '0 auto',
          color: 'var(--color-text-muted)',
          fontSize: '0.85rem',
          lineHeight: 1.6,
          textAlign: 'justify'
        }}>
          <h2 style={{ fontSize: '1rem', color: 'var(--color-text)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>About KFM Masale — The Best Spices Online in India</h2>
          <p style={{ marginBottom: '1rem' }}>
            Welcome to <strong>KFM Masale</strong>, your one-stop destination to <a href="#products" style={{ color: 'inherit', textDecoration: 'underline' }}>buy spices online in India</a>. Based in Kishangarh, Rajasthan, we have been supplying <strong>authentic Indian spices</strong>, <em>fresh ground spices</em>, and <strong>premium quality masalas</strong> since 1974. Whether you are looking for <strong>organic Indian spices</strong>, traditional stone ground spices, or unadulterated masalas with no preservatives, KFM Masale guarantees the <em>highest quality spices</em> delivered directly from the farm to your doorstep. We are recognized as a top Indian spice company offering natural herbs and spices, ideal for both daily household cooking and bulk orders for restaurants seeking <strong>wholesale spices India</strong> or export quality spices.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Our expansive collection of <strong>pure spices</strong> caters to all your culinary needs. From <strong>pure turmeric powder (organic haldi online)</strong> and the <em>best garam masala powder</em> to our vibrant, spicy <strong>pure red chili powder</strong> and authentic rajasthani spices like mathania red chilli and kashmiri lal mirch powder, we have it all. Enhance your curries with our <strong>authentic cumin seeds (jeera powder online)</strong>, <strong>coriander powder (dhaniya powder)</strong>, and our notoriously pungent <strong>pure hing (asafoetida online)</strong>. For complex flavors, explore our whole spices including <strong>black pepper powder (kali mirch)</strong>, <em>dry ginger powder (saunth)</em>, amchur powder (dry mango powder), kasuri methi (fenugreek leaves), green cardamom (hari elaichi), cloves (laung), cinnamon sticks (dalchini), bay leaves (tej patta), black cardamom (badi elaichi), mace (javitri), nutmeg (jaiphal), star anise (chakri phool), mustard seeds (sarson), fennel seeds (saunf), carom seeds (ajwain), sesame seeds (til), and poppy seeds (khus khus).
          </p>
          <p>
            When preparing delectable regional dishes, our specialized spice blends for cooking are unmatched. Try our chemical free spices like chaat masala, chhole masala, pav bhaji masala, sambar masala, rasam powder, meat masala, chicken masala, biryani masala, kitchen king masala, and aromatic tea masala (chai patti masala). We also offer natural food spices like rock salt (sendha namak) and black salt (kala namak). Buy pure spices from our <strong>organic masala shop</strong> today and experience why KFM Masale is considered the <em>best spice brand in India</em>. From premium haldi powder to raw spices online and whole spices wholesale, the KFM Masale organic spice store is committed to bringing authentic, homemade masalas into every Indian kitchen.
          </p>
        </div>
      </section>
    </main>
  );
}
