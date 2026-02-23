import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import ImageGallery from '@/components/ImageGallery';
import AddToCartSection from '@/components/AddToCartSection';
import ProductCard from '@/components/ProductCard';
import ProductReviews from '@/components/ProductReviews';
import StarRating from '@/components/StarRating';
import { getSession } from '@/app/actions/auth';

const prisma = new PrismaClient();

export async function generateMetadata(props) {
    const params = await props.params;
    const product = await prisma.product.findUnique({ where: { slug: params.slug } });
    if (!product) return { title: 'Product Not Found — KFM Masale' };
    return {
        title: `${product.name} — KFM Masale`,
        description: product.description || `Buy ${product.name} online from KFM Masale. 100% organic, farm-fresh spices.`,
        keywords: `${product.name}, organic spices, buy ${product.name} online, KFM Masale`,
        openGraph: {
            title: `${product.name} — KFM Masale`,
            description: product.description || `Buy ${product.name} online.`,
            type: 'website',
        }
    };
}

export default async function ProductDetailPage(props) {
    const params = await props.params;
    const productSlug = params.slug;

    const product = await prisma.product.findUnique({
        where: { slug: productSlug },
        include: {
            variants: { orderBy: { price: 'asc' } },
            images: { orderBy: { sortOrder: 'asc' } },
            reviews: {
                include: { user: { select: { name: true } } },
                orderBy: { createdAt: 'desc' },
                where: { isApproved: true }
            }
        }
    });

    if (!product) {
        return (
            <main className="container section" style={{ textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Product Not Found</h1>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>The product you are looking for does not exist or has been removed.</p>
                <Link href="/shop" className="btn btn-primary">Browse All Spices</Link>
            </main>
        );
    }

    // Build images array — use product.images, or fall back to imageUrl, or empty
    const galleryImages = product.images.length > 0
        ? product.images
        : product.imageUrl
            ? [{ id: 0, url: product.imageUrl }]
            : [];

    // Fetch similar products (same category, excluding current)
    const similarProducts = await prisma.product.findMany({
        where: { isActive: true, slug: { not: productSlug } },
        include: {
            variants: { orderBy: { price: 'asc' } },
            images: { orderBy: { sortOrder: 'asc' }, take: 1 },
            reviews: { select: { rating: true } }
        },
        take: 4
    });

    const session = await getSession();
    let hasPurchased = false;
    if (session) {
        const pastOrder = await prisma.orderItem.findFirst({
            where: {
                variant: { productId: product.id },
                order: {
                    userId: session.id,
                    status: { in: ['Delivered', 'Shipped', 'Processing', 'Pending'] }
                }
            }
        });
        hasPurchased = !!pastOrder;
    }

    const totalReviews = product.reviews?.length || 0;
    const averageRating = totalReviews > 0 ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews) : 0;

    return (
        <main>
            {/* Breadcrumb */}
            <div className="container" style={{ paddingTop: '1.5rem' }}>
                <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    <Link href="/" style={{ color: 'var(--color-text-muted)' }}>Home</Link>
                    <span>/</span>
                    <Link href="/shop" style={{ color: 'var(--color-text-muted)' }}>Spices</Link>
                    <span>/</span>
                    <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>{product.name}</span>
                </nav>
            </div>

            {/* Product Detail */}
            <section className="container" style={{ padding: '2rem 1rem 4rem' }}>
                <div className="product-detail-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '3rem',
                    alignItems: 'flex-start'
                }}>
                    {/* Left: Image Gallery */}
                    <ImageGallery images={galleryImages} />

                    {/* Right: Product Info & Buy */}
                    <div>
                        <div style={{
                            display: 'inline-block',
                            backgroundColor: 'rgba(43, 94, 46, 0.1)',
                            color: 'var(--color-primary)',
                            padding: '0.3rem 0.85rem',
                            borderRadius: '99px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            marginBottom: '0.75rem'
                        }}>
                            100% Organic
                        </div>

                        <h1 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '2rem',
                            color: 'var(--color-text)',
                            marginBottom: '0.5rem',
                            lineHeight: 1.3
                        }}>
                            {product.name}
                        </h1>

                        <div style={{ marginBottom: '1.25rem' }}>
                            <StarRating rating={averageRating} count={totalReviews} size={18} />
                        </div>

                        {product.description && (
                            <p style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '1.05rem',
                                lineHeight: 1.75,
                                marginBottom: '2rem'
                            }}>
                                {product.description}
                            </p>
                        )}

                        {/* Highlights */}
                        <div style={{
                            display: 'flex',
                            gap: '1.5rem',
                            marginBottom: '2rem',
                            flexWrap: 'wrap'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                No Chemicals
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></svg>
                                Farm Fresh
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                                Fast Delivery
                            </div>
                        </div>

                        <hr style={{ border: 'none', borderTop: '1px solid var(--color-border-light)', marginBottom: '2rem' }} />

                        {/* Add to Cart Section */}
                        <AddToCartSection product={product} />
                    </div>
                </div>

                {/* Reviews Section */}
                <ProductReviews
                    productId={product.id}
                    reviews={product.reviews || []}
                    canReview={hasPurchased}
                />
            </section>

            {/* Similar Products */}
            {similarProducts.length > 0 && (
                <section className="section" style={{ backgroundColor: 'var(--color-bg-cream)' }}>
                    <div className="container">
                        <div className="section-header">
                            <h2>You May Also Like</h2>
                            <p>Explore more premium organic spices from our collection.</p>
                            <div className="section-divider"></div>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            {similarProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
