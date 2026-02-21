import Link from 'next/link';
import { createProduct } from '@/app/actions/products';

export default function NewProductPage() {
    return (
        <div style={{ maxWidth: '700px' }}>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/admin/products" style={{ fontSize: '0.85rem', color: '#6B7280', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                    Back to Products
                </Link>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#111827', margin: 0 }}>Add New Product</h1>
                <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '0.25rem' }}>Create a new spice product. You can add size variants after creating the product.</p>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', border: '1px solid #E5E7EB' }}>
                <form action={createProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.88rem', color: '#374151' }}>Product Name *</label>
                        <input type="text" name="name" required placeholder="e.g. Garam Masala" style={{ width: '100%', padding: '0.7rem 0.9rem', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.88rem', color: '#374151' }}>Description</label>
                        <textarea name="description" rows="3" placeholder="Describe the spice, its aroma, and best uses..." style={{ width: '100%', padding: '0.7rem 0.9rem', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit', resize: 'vertical' }}></textarea>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.88rem', color: '#374151' }}>Image URL (Optional)</label>
                        <input type="url" name="imageUrl" placeholder="https://example.com/product-image.jpg" style={{ width: '100%', padding: '0.7rem 0.9rem', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                        <button type="submit" style={{
                            padding: '0.7rem 1.5rem', backgroundColor: '#2B5E2E', color: 'white',
                            border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', fontFamily: 'inherit'
                        }}>
                            Create Product
                        </button>
                        <Link href="/admin/products" style={{
                            padding: '0.7rem 1.5rem', backgroundColor: 'white', color: '#374151',
                            border: '1px solid #D1D5DB', borderRadius: '8px', fontWeight: 500, fontSize: '0.95rem',
                            display: 'inline-flex', alignItems: 'center'
                        }}>
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
