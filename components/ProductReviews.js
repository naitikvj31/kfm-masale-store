'use client';

import { useState } from 'react';
import StarRating from './StarRating';
import { submitReview } from '@/app/actions/reviews';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ProductReviews({ productId, reviews = [], canReview = false }) {
    const router = useRouter();
    const [rating, setRating] = useState(5);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // Calculate averages
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
        : 0;

    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
        ratingCounts[r.rating] = (ratingCounts[r.rating] || 0) + 1;
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!rating || !comment.trim()) {
            toast.error("Please provide a rating and a comment.");
            return;
        }

        setIsSubmitting(true);
        const res = await submitReview(productId, { rating, title, comment });
        setIsSubmitting(false);

        if (res.error) {
            toast.error(res.error);
        } else {
            toast.success(res.message);
            setShowForm(false);
            setRating(5);
            setTitle('');
            setComment('');
            router.refresh();
        }
    };

    return (
        <section style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--color-border-light)' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', color: 'var(--color-primary)', marginBottom: '2rem' }}>
                Customer Reviews
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '3rem', alignItems: 'start' }}>
                {/* Left: Summary */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '3rem', fontWeight: 700, color: '#111827', lineHeight: 1 }}>{averageRating}</span>
                        <div>
                            <StarRating rating={Number(averageRating)} size={20} />
                            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                                Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                        {[5, 4, 3, 2, 1].map(stars => {
                            const count = ratingCounts[stars];
                            const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                            return (
                                <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                                    <span style={{ width: '35px', color: 'var(--color-primary)', fontWeight: 600 }}>{stars} star</span>
                                    <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: `${percent}%`, height: '100%', backgroundColor: '#FBBF24', borderRadius: '4px' }}></div>
                                    </div>
                                    <span style={{ width: '30px', textAlign: 'right', color: 'var(--color-text-muted)' }}>{percent.toFixed(0)}%</span>
                                </div>
                            );
                        })}
                    </div>

                    {!showForm && (
                        <div>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>Review this product</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                                Share your thoughts with other customers.
                            </p>
                            {canReview ? (
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="btn btn-outline"
                                    style={{ width: '100%' }}
                                >
                                    Write a Customer Review
                                </button>
                            ) : (
                                <div style={{ fontSize: '0.85rem', color: '#9B1C1C', backgroundColor: '#FDE8E8', padding: '0.75rem', borderRadius: '8px', border: '1px solid #FBD5D5' }}>
                                    You can only review products that you have successfully purchased and received.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right: Reviews List or Form */}
                <div>
                    {showForm ? (
                        <div style={{ backgroundColor: '#F9FAFB', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border-light)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Write a Review</h3>
                                <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>Cancel</button>
                            </div>

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>Overall Rating</label>
                                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <svg
                                                key={star}
                                                onClick={() => setRating(star)}
                                                width="32" height="32" viewBox="0 0 24 24"
                                                fill={star <= rating ? "#FBBF24" : "none"}
                                                stroke={star <= rating ? "#FBBF24" : "#D1D5DB"}
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                style={{ cursor: 'pointer', transition: 'all 0.1s ease' }}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                            >
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>Add a headline</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        placeholder="What's most important to know?"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }}
                                        maxLength={100}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>Add a written review</label>
                                    <textarea
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                        placeholder="What did you like or dislike? What did you use this product for?"
                                        required
                                        rows={5}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', resize: 'vertical' }}
                                    ></textarea>
                                </div>

                                <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ alignSelf: 'flex-start', opacity: isSubmitting ? 0.7 : 1 }}>
                                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            {reviews.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '3rem 1rem', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '12px' }}>
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-border)" strokeWidth="1.5" style={{ margin: '0 auto 1rem' }}>
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                    <p style={{ color: 'var(--color-text-muted)' }}>No reviews yet. Be the first to review this product!</p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    {reviews.map(review => (
                                        <div key={review.id} style={{ borderBottom: '1px solid var(--color-border-light)', paddingBottom: '1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-bg-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontWeight: 600, fontSize: '1.1rem' }}>
                                                    {review.user?.name?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{review.user?.name || 'Verified Customer'}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                                        Reviewed on {new Date(review.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                <StarRating rating={review.rating} size={16} />
                                                {review.title && <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{review.title}</span>}
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: '#B45309', fontWeight: 600, marginBottom: '0.75rem' }}>Verified Purchase</div>
                                            <p style={{ color: 'var(--color-text)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
