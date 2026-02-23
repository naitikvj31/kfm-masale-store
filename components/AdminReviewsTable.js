'use client';

import { useState } from 'react';
import { deleteReview, toggleReviewStatus } from '@/app/actions/adminReviews';
import { toast } from 'react-hot-toast';
import StarRating from '@/components/StarRating';

export default function AdminReviewsTable({ initialReviews }) {
    const [reviews, setReviews] = useState(initialReviews);
    const [isProcessing, setIsProcessing] = useState(null);

    const handleToggleStatus = async (reviewId, currentStatus) => {
        setIsProcessing(reviewId);
        const newStatus = !currentStatus;
        const res = await toggleReviewStatus(reviewId, newStatus);

        if (res.success) {
            toast.success(res.message);
            setReviews(reviews.map(r => r.id === reviewId ? { ...r, isApproved: newStatus } : r));
        } else {
            toast.error(res.error);
        }
        setIsProcessing(null);
    };

    const handleDelete = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review? This cannot be undone.")) return;

        setIsProcessing(reviewId);
        const res = await deleteReview(reviewId);

        if (res.success) {
            toast.success(res.message);
            setReviews(reviews.filter(r => r.id !== reviewId));
        } else {
            toast.error(res.error);
        }
        setIsProcessing(null);
    };

    if (reviews.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--color-border-light)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#F3F4F6', marginBottom: '1rem' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', color: '#111827', marginBottom: '0.5rem' }}>No Reviews Yet</h3>
                <p style={{ color: '#6B7280' }}>When customers leave reviews, they will appear here for moderation.</p>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-border-light)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid var(--color-border-light)', color: '#4B5563', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Product</th>
                        <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Customer</th>
                        <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Review</th>
                        <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
                        <th style={{ padding: '1rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(review => (
                        <tr key={review.id} style={{ borderBottom: '1px solid var(--color-border-light)', transition: 'background-color 0.15s ease' }} className="hover-row">
                            <td style={{ padding: '1.25rem 1.5rem', verticalAlign: 'top' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#F3F4F6', flexShrink: 0 }}>
                                        <img src={review.product.imageUrl || '/images/placeholder.jpg'} alt={review.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.95rem' }}>{review.product.name}</div>
                                        <a href={`/product/${review.product.slug}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'var(--color-primary)', textDecoration: 'none' }}>View Page ↗</a>
                                    </div>
                                </div>
                            </td>
                            <td style={{ padding: '1.25rem 1.5rem', verticalAlign: 'top' }}>
                                <div style={{ fontWeight: 500, color: '#111827', fontSize: '0.95rem' }}>{review.user?.name || 'Unknown User'}</div>
                                <div style={{ color: '#6B7280', fontSize: '0.85rem' }}>{review.user?.email}</div>
                                <div style={{ color: '#9CA3AF', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </div>
                            </td>
                            <td style={{ padding: '1.25rem 1.5rem', verticalAlign: 'top', maxWidth: '350px' }}>
                                <div style={{ marginBottom: '0.5rem' }}>
                                    <StarRating rating={review.rating} size={14} />
                                </div>
                                {review.title && <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#111827', marginBottom: '0.25rem' }}>{review.title}</div>}
                                <div style={{ color: '#4B5563', fontSize: '0.9rem', lineHeight: 1.5, wordBreak: 'break-word', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} title={review.comment}>
                                    "{review.comment}"
                                </div>
                            </td>
                            <td style={{ padding: '1.25rem 1.5rem', verticalAlign: 'top' }}>
                                <span style={{
                                    display: 'inline-flex', alignItems: 'center',
                                    padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600,
                                    backgroundColor: review.isApproved ? '#DEF7EC' : '#FDE8E8',
                                    color: review.isApproved ? '#03543F' : '#9B1C1C'
                                }}>
                                    {review.isApproved ? 'Visible' : 'Hidden'}
                                </span>
                            </td>
                            <td style={{ padding: '1.25rem 1.5rem', verticalAlign: 'top', textAlign: 'right' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => handleToggleStatus(review.id, review.isApproved)}
                                        disabled={isProcessing === review.id}
                                        style={{
                                            background: 'none', border: '1px solid var(--color-border)', borderRadius: '6px',
                                            padding: '0.4rem 0.75rem', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
                                            color: '#374151', opacity: isProcessing === review.id ? 0.5 : 1
                                        }}
                                    >
                                        {review.isApproved ? 'Hide' : 'Approve'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(review.id)}
                                        disabled={isProcessing === review.id}
                                        style={{
                                            background: 'none', border: '1px solid #FCA5A5', borderRadius: '6px',
                                            padding: '0.4rem 0.75rem', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
                                            color: '#DC2626', opacity: isProcessing === review.id ? 0.5 : 1
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <style>{`
                .hover-row:hover { background-color: #F9FAFB; }
            `}</style>
        </div>
    );
}
