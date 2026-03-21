import { PrismaClient } from '@prisma/client';
import ProductCard from '@/components/ProductCard';

const prisma = new PrismaClient();

export const metadata = {
    title: 'Our Spices — KFM Masale',
    description: 'Shop 100% organic, farm-fresh Indian spices from KFM Masale. Turmeric, Garam Masala, Red Chili Powder, Coriander and more. Buy premium quality masalas online.',
};

export default async function ProductsPage() {
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
                        }}>Our Spice Collection</span>
                    </h1>
                    <p style={{ opacity: 0.9, fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto', color: 'rgba(255,255,255,0.9)' }}>
                        Browse our range of premium organic spices, naturally sun-dried and fresh from the farms of Rajasthan.
                    </p>
                </div>
            </section>

            {/* ===== PRODUCT CATALOG ===== */}
            <section className="section">
                <div className="container">
                    {products.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                            <p style={{ fontSize: '1.1rem' }}>Our spice collection is being updated. Please check back soon!</p>
                        </div>
                    ) : (
                        <div className="product-grid">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main >
    );
}
