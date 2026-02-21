'use client';

import { deleteProduct } from '@/app/actions/products';
import ClientForm from '@/components/ClientForm';

export default function DeleteProductForm({ productId }) {
    return (
        <ClientForm action={deleteProduct.bind(null, productId)} successMessage="Product deleted successfully!" onSubmit={(e) => {
            if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
                e.preventDefault();
            }
        }}>
            <button type="submit" style={{ background: '#c62828', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                Delete Product
            </button>
        </ClientForm>
    );
}
