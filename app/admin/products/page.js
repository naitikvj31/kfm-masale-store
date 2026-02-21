import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import ToggleActiveButton from '@/components/ToggleActiveButton';
import ReorderButtons from '@/components/ReorderButtons';

const prisma = new PrismaClient();

export default async function ProductsListPage() {
    const products = await prisma.product.findMany({
        include: {
            variants: {
                orderBy: { price: 'asc' }
            }
        },
        orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }]
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#111827', marginBottom: '0.25rem' }}>Products &amp; Pricing</h1>
                    <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Manage your spice catalog. Click the Active/Inactive badge to show or hide a product on the website.</p>
                </div>
                <Link href="/admin/products/new" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.7rem 1.25rem', backgroundColor: '#2B5E2E', color: 'white',
                    borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem'
                }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    Add Product
                </Link>
            </div>

            {products.length === 0 ? (
                <div style={{ background: 'white', borderRadius: '12px', padding: '3rem', textAlign: 'center', border: '1px solid #E5E7EB' }}>
                    <p style={{ color: '#6B7280', marginBottom: '1rem' }}>No products found. Start by adding your first product!</p>
                    <Link href="/admin/products/new" style={{ color: '#2B5E2E', fontWeight: 600 }}>+ Add Product</Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {products.map((product, idx) => {
                        const totalStock = product.variants.reduce((sum, v) => sum + v.stockQuantity, 0);
                        const priceRange = product.variants.length > 0
                            ? `₹${product.variants[0].price} — ₹${product.variants[product.variants.length - 1].price}`
                            : 'No variants';

                        return (
                            <div key={product.id} style={{
                                background: 'white',
                                borderRadius: '12px',
                                border: '1px solid #E5E7EB',
                                padding: '1.25rem 1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '1rem',
                                opacity: product.isActive ? 1 : 0.6
                            }}>
                                {/* Reorder Arrows */}
                                <ReorderButtons
                                    productId={product.id}
                                    isFirst={idx === 0}
                                    isLast={idx === products.length - 1}
                                />
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                                        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: '#111827' }}>{product.name}</h3>
                                        <ToggleActiveButton productId={product.id} isActive={product.isActive} />
                                    </div>
                                    <p style={{ margin: 0, color: '#6B7280', fontSize: '0.85rem', lineHeight: 1.5 }}>{product.description}</p>
                                </div>

                                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexShrink: 0 }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '0.7rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.15rem' }}>Variants</div>
                                        <div style={{ fontWeight: 700, color: '#111827' }}>{product.variants.length}</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '0.7rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.15rem' }}>Price Range</div>
                                        <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.9rem' }}>{priceRange}</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '0.7rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.15rem' }}>Total Stock</div>
                                        <div style={{ fontWeight: 700, color: totalStock < 20 ? '#DC2626' : '#111827' }}>{totalStock}</div>
                                    </div>
                                    <Link href={`/admin/products/${product.id}`} style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                        padding: '0.5rem 1rem', backgroundColor: '#F3F4F6', color: '#374151',
                                        borderRadius: '8px', fontWeight: 500, fontSize: '0.85rem'
                                    }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
