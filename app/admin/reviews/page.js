import { PrismaClient } from '@prisma/client';
import { getSession } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import AdminReviewsTable from '@/components/AdminReviewsTable';

const prisma = new PrismaClient();

export const metadata = {
    title: 'Manage Reviews — Admin Panel',
};

export default async function AdminReviewsPage() {
    const session = await getSession();

    // Extra protection just in case middleware misses it
    if (!session || session.role !== 'ADMIN') {
        redirect('/login');
    }

    const reviews = await prisma.review.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            user: { select: { name: true, email: true } },
            product: { select: { id: true, name: true, slug: true, imageUrl: true } }
        }
    });

    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
        : 0;

    const pendingReviews = reviews.filter(r => !r.isApproved).length;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.85rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)' }}>
                        Product Reviews
                    </h1>
                    <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>View, moderate, and manage all customer feedback.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--color-border-light)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div style={{ color: '#6B7280', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Total Reviews</div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#111827' }}>{reviews.length}</div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--color-border-light)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div style={{ color: '#6B7280', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Average Rating</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '2rem', fontWeight: 700, color: '#111827' }}>{averageRating}</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    </div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--color-border-light)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div style={{ color: '#9B1C1C', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Hidden / Pending</div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#9B1C1C' }}>{pendingReviews}</div>
                </div>
            </div>

            {/* Data Table */}
            <AdminReviewsTable initialReviews={reviews} />
        </div>
    );
}
