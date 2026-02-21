import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { updateProduct, createVariant, updateVariant, deleteVariant, addProductImage, deleteProductImage } from '@/app/actions/products';
import DeleteProductForm from '@/components/DeleteProductForm';
import ToggleActiveButton from '@/components/ToggleActiveButton';
import ClientForm from '@/components/ClientForm';

const prisma = new PrismaClient();

export default async function EditProductPage(props) {
    const params = await props.params;
    const { id } = params;

    const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: { variants: { orderBy: { price: 'asc' } }, images: { orderBy: { sortOrder: 'asc' } } }
    });

    if (!product) return <div style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>Product not found.</div>;

    return (
        <div style={{ maxWidth: '1200px' }}>
            {/* Page Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                    <Link href="/admin/products" style={{ fontSize: '0.85rem', color: '#6B7280', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                        Back to Products
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#111827', margin: 0 }}>
                            Edit: {product.name}
                        </h1>
                        <ToggleActiveButton productId={product.id} isActive={product.isActive} />
                    </div>
                    <p style={{ color: '#6B7280', fontSize: '0.85rem', marginTop: '0.35rem' }}>
                        {product.isActive ? 'This product is visible on your storefront.' : 'This product is hidden from your storefront.'}
                    </p>
                </div>
                <DeleteProductForm productId={product.id} />
            </div>

            {/* ===== SECTION 1: Basic Information ===== */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '1.75rem', border: '1px solid #E5E7EB', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827', margin: '0 0 0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B5E2E" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    Product Information
                </h2>
                <p style={{ color: '#6B7280', fontSize: '0.85rem', margin: '0 0 1.25rem' }}>Update the product name, description, or image.</p>

                <ClientForm action={updateProduct.bind(null, product.id)} successMessage="Product saved!" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.88rem', color: '#374151' }}>Product Name</label>
                        <input type="text" name="name" defaultValue={product.name} required style={{ width: '100%', padding: '0.7rem 0.9rem', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.88rem', color: '#374151' }}>Description</label>
                        <textarea name="description" rows="3" defaultValue={product.description || ''} style={{ width: '100%', padding: '0.7rem 0.9rem', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit', resize: 'vertical' }}></textarea>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.88rem', color: '#374151' }}>Image URL</label>
                        <input type="url" name="imageUrl" defaultValue={product.imageUrl || ''} placeholder="https://example.com/image.jpg" style={{ width: '100%', padding: '0.7rem 0.9rem', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }} />
                    </div>
                    <button type="submit" style={{ alignSelf: 'flex-start', padding: '0.65rem 1.5rem', backgroundColor: '#2B5E2E', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'inherit' }}>
                        Save Changes
                    </button>
                </ClientForm>
            </div>

            {/* ===== SECTION 2: Variants & Pricing ===== */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '1.75rem', border: '1px solid #E5E7EB' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827', margin: '0 0 0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B5E2E" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
                    Variants, Pricing & Stock
                </h2>
                <p style={{ color: '#6B7280', fontSize: '0.85rem', margin: '0 0 1.5rem' }}>
                    Each variant is a different pack size (e.g. 50g, 100g, 500g). Set the price and stock quantity for each.
                </p>

                {/* Variant Table Header */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr 1.2fr 1fr auto auto',
                    gap: '0.75rem',
                    padding: '0 0.75rem 0.75rem',
                    borderBottom: '2px solid #F3F4F6',
                    alignItems: 'center'
                }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>Pack Size</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>Original Price</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>Discount Price</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>Stock Qty</span>
                    <span></span>
                    <span></span>
                </div>

                {/* Existing Variants */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {product.variants.map(variant => (
                        <div key={variant.id} style={{
                            display: 'grid',
                            gridTemplateColumns: '1.2fr 1fr 1.2fr 1fr auto auto',
                            gap: '0.75rem',
                            padding: '0.75rem',
                            alignItems: 'center',
                            borderBottom: '1px solid #F3F4F6'
                        }}>
                            <ClientForm action={updateVariant.bind(null, variant.id, product.id)} successMessage="Variant updated!" id={`update-${variant.id}`} style={{ display: 'contents' }}>
                                <input type="text" name="size" defaultValue={variant.size} required placeholder="e.g. 250g" style={{ width: '100%', minWidth: 0, padding: '0.55rem 0.75rem', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                                <input type="number" name="price" defaultValue={variant.price} step="0.01" required placeholder="120" style={{ width: '100%', minWidth: 0, padding: '0.55rem 0.75rem', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                                <input type="number" name="discountPrice" defaultValue={variant.discountPrice || ''} step="0.01" placeholder="None" style={{ width: '100%', minWidth: 0, padding: '0.55rem 0.75rem', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                                <input type="number" name="stockQuantity" defaultValue={variant.stockQuantity} required style={{ width: '100%', minWidth: 0, padding: '0.55rem 0.75rem', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                                <button type="submit" style={{ padding: '0.5rem 0.85rem', background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Save</button>
                            </ClientForm>
                            <ClientForm action={deleteVariant.bind(null, variant.id, product.id)} successMessage="Variant deleted!">
                                <button type="submit" style={{ padding: '0.5rem 0.65rem', background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                </button>
                            </ClientForm>
                        </div>
                    ))}
                    {product.variants.length === 0 && (
                        <p style={{ padding: '1.5rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.9rem' }}>No variants yet. Add one below.</p>
                    )}
                </div>

                {/* Add New Variant */}
                <div style={{ marginTop: '1.25rem', padding: '1.25rem', backgroundColor: '#F9FAFB', borderRadius: '10px', border: '1px dashed #D1D5DB' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 0.75rem', color: '#374151' }}>
                        + Add a New Pack Size
                    </h3>
                    <ClientForm action={createVariant.bind(null, product.id)} successMessage="Variant added!" resetOnSuccess={true} style={{
                        display: 'grid',
                        gridTemplateColumns: '1.2fr 1fr 1.2fr 1fr auto',
                        gap: '0.75rem',
                        alignItems: 'flex-end'
                    }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', color: '#6B7280', marginBottom: '0.3rem', fontWeight: 500 }}>Pack Size</label>
                            <input type="text" name="size" required placeholder="e.g. 500g" style={{ width: '100%', minWidth: 0, padding: '0.55rem 0.75rem', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', color: '#6B7280', marginBottom: '0.3rem', fontWeight: 500 }}>Original Price</label>
                            <input type="number" name="price" step="0.01" required placeholder="120" style={{ width: '100%', minWidth: 0, padding: '0.55rem 0.75rem', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', color: '#6B7280', marginBottom: '0.3rem', fontWeight: 500 }}>Discount Price (opt)</label>
                            <input type="number" name="discountPrice" step="0.01" placeholder="99" style={{ width: '100%', minWidth: 0, padding: '0.55rem 0.75rem', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', color: '#6B7280', marginBottom: '0.3rem', fontWeight: 500 }}>Stock Quantity</label>
                            <input type="number" name="stockQuantity" defaultValue={100} required style={{ width: '100%', minWidth: 0, padding: '0.55rem 0.75rem', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                        </div>
                        <button type="submit" style={{ padding: '0.6rem 1.2rem', background: '#2B5E2E', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                            Add Variant
                        </button>
                    </ClientForm>
                </div>
            </div>

            {/* ===== SECTION 3: Product Images ===== */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '1.75rem', border: '1px solid #E5E7EB' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827', margin: '0 0 0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B5E2E" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                    Product Images
                </h2>
                <p style={{ color: '#6B7280', fontSize: '0.85rem', margin: '0 0 1.25rem' }}>
                    Add multiple images for this product. Place image files in <code style={{ backgroundColor: '#F3F4F6', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.82rem' }}>public/images/products/</code> and enter the path below.
                </p>

                {/* Existing Images */}
                {product.images.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                        {product.images.map(img => (
                            <div key={img.id} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1px solid #E5E7EB', aspectRatio: '1' }}>
                                <img src={img.url} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <ClientForm action={deleteProductImage.bind(null, img.id, product.id)} successMessage="Image removed!" style={{ position: 'absolute', top: '6px', right: '6px' }}>
                                    <button type="submit" style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'rgba(220,38,38,0.9)', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                    </button>
                                </ClientForm>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add Image */}
                <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '10px', border: '1px dashed #D1D5DB' }}>
                    <ClientForm action={addProductImage.bind(null, product.id)} successMessage="Image added!" resetOnSuccess={true} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.78rem', color: '#6B7280', marginBottom: '0.3rem', fontWeight: 500 }}>Image Path</label>
                            <input type="text" name="url" required placeholder="/images/products/turmeric.jpg" style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                        </div>
                        <button type="submit" style={{ padding: '0.6rem 1.2rem', background: '#2B5E2E', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                            Add Image
                        </button>
                    </ClientForm>
                </div>
            </div>
        </div>
    );
}
