import { PrismaClient } from '@prisma/client';
import ProductCard from '@/components/ProductCard';
import BenefitCard from '@/components/BenefitCard';

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
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section" style={{
        background: 'linear-gradient(135deg, #1A3D1C 0%, #2B5E2E 40%, #1E4A20 70%, #2B5E2E 100%)',
        color: 'white',
        padding: '5rem 0 6rem',
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
          position: 'absolute', top: '-20%', right: '-10%',
          width: '60%', height: '120%',
          background: 'radial-gradient(ellipse, rgba(200,162,92,0.08) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3.5rem' }}>
            {/* Text Content */}
            <div style={{ flex: '1 1 480px' }}>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
                <span className="animate-fade-in-up" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: 'rgba(200,162,92,0.15)',
                  border: '1px solid rgba(200,162,92,0.35)',
                  color: '#E8D5A8',
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  🌿 50+ Years of Trust
                </span>
                <span className="animate-fade-in-up delay-1" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.9)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  🌾 100% Natural &bull; Farm Fresh
                </span>
              </div>

              <h1 className="animate-fade-in-up" style={{
                fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
                fontWeight: 700,
                marginBottom: '1.5rem',
                lineHeight: 1.12,
                color: 'white'
              }}>
                Pure Organic Spices <br />
                <span style={{
                  background: 'linear-gradient(90deg, #E8D5A8, #C8A25C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Straight From the Farm</span>
              </h1>

              <p className="animate-fade-in-up-delay-1" style={{
                fontSize: '1.1rem',
                marginBottom: '2rem',
                opacity: 0.88,
                lineHeight: 1.75,
                maxWidth: '520px',
                color: 'rgba(255,255,255,0.9)'
              }}>
                Sourced from the finest farms in Rajasthan, sun-dried to perfection, and stone-ground to preserve every ounce of aroma, color, and authentic flavor. Zero chemicals, zero preservatives — just pure nature in every pinch.
              </p>

              {/* Stats Row */}
              <div className="animate-fade-in-up-delay-1" style={{
                display: 'flex',
                gap: '2rem',
                marginBottom: '2.5rem',
                flexWrap: 'wrap'
              }}>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#E8D5A8', fontFamily: 'var(--font-heading)' }}>50+</div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>Years Legacy</div>
                </div>
                <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#E8D5A8', fontFamily: 'var(--font-heading)' }}>100%</div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>Organic</div>
                </div>
                <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#E8D5A8', fontFamily: 'var(--font-heading)' }}>10k+</div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>Happy Families</div>
                </div>
              </div>

              <div className="animate-fade-in-up-delay-2" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#products" className="btn btn-lg" style={{
                  display: 'inline-flex',
                  padding: '0.85rem 2.25rem',
                  borderRadius: '10px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  background: 'linear-gradient(135deg, #C8A25C, #E8D5A8)',
                  color: '#1A3D1C',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(200,162,92,0.3)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  fontSize: '1rem'
                }}>
                  🛒 Explore Our Spices
                </a>
                <a href="https://wa.me/918875443482" target="_blank" rel="noopener noreferrer" className="btn btn-lg" style={{
                  display: 'inline-flex',
                  padding: '0.85rem 2.25rem',
                  borderRadius: '10px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  transition: 'all 0.3s ease',
                  fontSize: '1rem'
                }}>
                  💬 Order on WhatsApp
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div style={{ flex: '1 1 420px', position: 'relative' }}>
              <div className="animate-fade-in-up-delay-1" style={{ position: 'relative', zIndex: 2 }}>
                <div className="promo-image-container" style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.5)',
                  border: '3px solid rgba(200,162,92,0.25)'
                }}>
                  <img
                    src="/images/products/whole.jpg"
                    alt="KFM Masale Premium Authentic Indian Spices Collection - Turmeric, Red Chili, Coriander, Garam Masala"
                    style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '4/3', objectFit: 'cover' }}
                    loading="eager"
                  />
                </div>

                {/* Floating badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '-16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'white',
                  color: 'var(--color-primary)',
                  padding: '0.6rem 1.5rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  letterSpacing: '0.3px'
                }}>
                  ⭐ Rated 4.8/5 by 10,000+ Families
                </div>
              </div>

              {/* Glow Effect */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '130%', height: '130%',
                background: 'radial-gradient(circle, rgba(200,162,92,0.12) 0%, rgba(200,162,92,0) 65%)',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
              title="50+ Years of Trust"
              description="Carefully crafted homemade spices since 1974, bringing authentic taste of tradition without any preservatives or additives."
            />
          </div>
        </div>
      </section>

      {/* ===== FARM TO KITCHEN JOURNEY ===== */}
      <section className="section" style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, var(--color-bg-sage) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div className="section-header">
            <h2>From Farm to Your Kitchen</h2>
            <p>Every spice tells a story — from the sun-kissed fields of Rajasthan to your dining table.</p>
            <div className="section-divider"></div>
          </div>

          <div className="farm-journey-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            position: 'relative'
          }}>
            {/* Connecting line */}
            <div className="journey-line hide-mobile" style={{
              position: 'absolute',
              top: '60px',
              left: '12.5%',
              right: '12.5%',
              height: '2px',
              background: 'linear-gradient(90deg, var(--color-accent), var(--color-primary), var(--color-accent))',
              zIndex: 0,
              opacity: 0.3
            }} />

            {[
              { step: '01', icon: '🌾', title: 'Farm Sourced', desc: 'Handpicked from organic farms in Rajasthan, ensuring the finest raw ingredients.' },
              { step: '02', icon: '☀️', title: 'Sun Dried', desc: 'Naturally sun-dried under the golden Rajasthani sun to preserve authentic flavors.' },
              { step: '03', icon: '🪨', title: 'Stone Ground', desc: 'Traditional stone grinding at low temperatures to retain the natural oils and aroma.' },
              { step: '04', icon: '📦', title: 'Fresh Packed', desc: 'Hygienically packed and delivered fresh to your doorstep within days.' },
            ].map((item, i) => (
              <div key={i} style={{
                textAlign: 'center',
                padding: '2rem 1.25rem',
                background: 'white',
                borderRadius: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                border: '1px solid var(--color-border-light)',
                position: 'relative',
                zIndex: 1,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <div style={{
                  width: '28px', height: '28px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                  color: 'white',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  letterSpacing: '0.5px'
                }}>
                  {item.step}
                </div>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', lineHeight: 1 }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>{item.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
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
      <section style={{ backgroundColor: 'var(--color-bg-sage)', padding: '3.5rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap', textAlign: 'center' }}>
          {[
            { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>, text: 'Free Delivery Above ₹1000' },
            { icon: <svg width="28" height="28" viewBox="0 2 20 20" fill="none" stroke="var(--color-primary)" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>, text: '50+ Years of Trust (Since 1974)' },
            { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, text: '100% Quality Guarantee' },
            { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>, text: 'Easy Order via WhatsApp' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1.25rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              border: '1px solid var(--color-border-light)'
            }}>
              {item.icon}
              <span style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.92rem' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, #1A3D1C 0%, #2B5E2E 50%, #3D8B40 100%)',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />

        <div className="container" style={{ maxWidth: '700px', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌶️</div>
          <h2 style={{ color: 'white', fontSize: '2.25rem', marginBottom: '1rem', lineHeight: 1.25 }}>Ready to Spice Up Your Kitchen?</h2>
          <p style={{ opacity: 0.85, fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Browse our collection above, add your favourite spices to the cart, and complete your order in seconds via WhatsApp. It&apos;s that easy!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#products" className="btn btn-lg" style={{
              background: 'linear-gradient(135deg, #C8A25C, #E8D5A8)',
              color: '#1A3D1C',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 700,
              boxShadow: '0 4px 20px rgba(200,162,92,0.3)',
            }}>
              Shop Now
            </a>
            <a href="https://wa.me/918875443482" target="_blank" rel="noopener noreferrer" className="btn btn-lg" style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '1.5px solid rgba(255,255,255,0.3)',
              borderRadius: '10px',
              fontWeight: 600,
            }}>
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ===== SEO ON-PAGE CONTENT BLOCK ===== */}
      <section style={{
        position: 'relative',
        padding: '5rem 0',
        background: 'linear-gradient(180deg, var(--color-bg-sage) 0%, #FFFFFF 100%)',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1100px' }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <div style={{ width: '40px', height: '3px', background: 'linear-gradient(90deg, transparent, var(--color-accent))', borderRadius: '2px' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '2px' }}>Our Story</span>
              <div style={{ width: '40px', height: '3px', background: 'linear-gradient(90deg, var(--color-accent), transparent)', borderRadius: '2px' }} />
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              margin: '0 0 0.75rem',
              lineHeight: 1.3
            }}>
              About KFM Masale — The Best Spices Online in India
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '650px', margin: '0 auto' }}>
              Bringing the authentic taste of Rajasthan to every Indian kitchen since 1974.
            </p>
          </div>

          {/* Main SEO content grid */}
          <div className="seo-content-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}>
            {/* Card 1 */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem 2rem',
              borderRadius: '20px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              border: '1px solid var(--color-border-light)',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, var(--color-bg-sage), rgba(43,94,46,0.1))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0
                }}>🏪</div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', margin: 0 }}>Who We Are</h3>
              </div>
              <p style={{ color: 'var(--color-text)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0, textAlign: 'left' }}>
                Welcome to <strong>KFM Masale</strong>, your one-stop destination to <a href="#products" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>buy spices online in India</a>. Based in Kishangarh, Rajasthan, we have been supplying <strong>authentic Indian spices</strong>, <em>fresh ground spices</em>, and <strong>premium quality masalas</strong> since 1974. We are recognized as a top Indian spice company offering natural herbs and spices, ideal for both daily cooking and <strong>wholesale spices India</strong> orders.
              </p>
            </div>

            {/* Card 2 */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem 2rem',
              borderRadius: '20px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              border: '1px solid var(--color-border-light)',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #FEF3C7, rgba(200,162,92,0.15))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0
                }}>🌿</div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', margin: 0 }}>Our Spice Range</h3>
              </div>
              <p style={{ color: 'var(--color-text)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0, textAlign: 'left' }}>
                Our expansive collection of <strong>pure spices</strong> caters to all culinary needs. From <strong>pure turmeric powder (organic haldi online)</strong> and <em>best garam masala powder</em> to <strong>pure red chili powder</strong> and authentic rajasthani spices, we have it all. Enhance your curries with <strong>authentic cumin seeds</strong>, <strong>coriander powder</strong>, and our pungent <strong>pure hing (asafoetida)</strong>.
              </p>
            </div>
          </div>

          {/* Full-width bottom card */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem 2.5rem',
            borderRadius: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            border: '1px solid var(--color-border-light)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #FEE2E2, rgba(220,38,38,0.08))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0
              }}>🍛</div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', margin: 0 }}>Spice Blends & Specialties</h3>
            </div>
            <p style={{ color: 'var(--color-text)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0, textAlign: 'left' }}>
              For complex flavors, explore our whole spices including <strong>black pepper powder (kali mirch)</strong>, <em>dry ginger powder (saunth)</em>, amchur powder, kasuri methi, green cardamom, cloves, cinnamon sticks, bay leaves, and more. Try our specialized blends like chaat masala, chhole masala, pav bhaji masala, biryani masala, kitchen king masala, and aromatic <strong>tea masala (chai patti masala)</strong>. We also offer rock salt (sendha namak) and black salt (kala namak). Buy pure spices from our <strong>organic masala shop</strong> and experience why KFM Masale is considered the <em>best spice brand in India</em>. The KFM Masale organic spice store is committed to bringing authentic, homemade masalas into every Indian kitchen.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
