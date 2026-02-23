import { getSession } from '@/app/actions/auth';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function OrderDetailsPage({ params }) {
    const session = await getSession();
    if (!session) redirect('/login');

    const resolvedParams = await params;
    const orderId = parseInt(resolvedParams.id, 10);
    if (isNaN(orderId)) notFound();

    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
            orderItems: {
                include: {
                    variant: {
                        include: {
                            product: {
                                include: { images: true }
                            }
                        }
                    }
                }
            }
        }
    });

    // Make sure order belongs to user (or if an older order lacks email, allow the static user to view it)
    if (!order) notFound();
    if (order.customerEmail && order.customerEmail !== session.email) {
        // Prevent unauthorized viewing
        notFound();
    }

    if (!order) notFound();

    return (
        <div>
            {/* Context & Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/profile/orders" style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-muted)', textDecoration: 'none', fontWeight: 500 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.25rem' }}><path d="m15 18-6-6 6-6" /></svg>
                        Back to Orders
                    </Link>
                    <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '2rem', margin: 0 }}>
                        Order Details
                    </h1>
                </div>
                <Link
                    href={`/profile/orders/${order.id}/invoice`}
                    target="_blank"
                    className="btn btn-outline"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', textDecoration: 'none' }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    Download Invoice
                </Link>
            </div>

            {/* Top Info Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                {/* Shipping Address */}
                <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '1.5rem', backgroundColor: 'white' }}>
                    <h3 style={{ fontSize: '1.05rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '0.5rem' }}>Shipping Address</h3>
                    <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{order.customerName}</p>
                    <p style={{ color: 'var(--color-text-muted)' }}>{order.customerAddress || 'Address not provided on cod orders'}</p>
                    <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Phone: {order.customerPhone}</p>
                </div>

                {/* Payment Method */}
                <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '1.5rem', backgroundColor: 'white' }}>
                    <h3 style={{ fontSize: '1.05rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '0.5rem' }}>Payment Method</h3>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
                        {/* Schema missing paymentMethod, defaulting to COD */}
                        Cash on Delivery (COD) / UPI
                    </p>
                    <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                        Order Status: <span style={{ fontWeight: 600, color: '#166534' }}>{order.status}</span>
                    </p>
                </div>

                {/* Order Summary */}
                <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '1.5rem', backgroundColor: 'white' }}>
                    <h3 style={{ fontSize: '1.05rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '0.5rem' }}>Order Summary</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                        {/* deliveryFee not in schema, assuming all totalAmount comprises items + any flat fee at creation */}
                        <span>₹{order.totalAmount}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border-light)', fontWeight: 700, fontSize: '1.1rem' }}>
                        <span>Total</span>
                        <span style={{ color: 'var(--color-primary)' }}>₹{order.totalAmount}</span>
                    </div>
                </div>
            </div>

            {/* Items Included */}
            <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', backgroundColor: 'white', overflow: 'hidden' }}>
                <div style={{ padding: '1.25rem 1.5rem', backgroundColor: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)' }}>
                    <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 600 }}>{order.orderItems.length} Items Included</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {order.orderItems.map((item, i) => (
                        <div key={item.id} style={{
                            display: 'flex',
                            gap: '1.5rem',
                            padding: '1.5rem',
                            borderBottom: i !== order.orderItems.length - 1 ? '1px solid var(--color-border-light)' : 'none'
                        }}>
                            {/* Image */}
                            <div style={{
                                width: '100px', height: '100px', borderRadius: '8px', border: '1px solid var(--color-border-light)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem'
                            }}>
                                <img
                                    src={item.variant.product.images?.[0]?.url || item.variant.product.imageUrl || 'https://via.placeholder.com/100'}
                                    alt={item.variant.product.name}
                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                />
                            </div>

                            {/* Info */}
                            <div style={{ flex: 1 }}>
                                <Link href={`/product/${item.variant.product.slug}`} style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-primary)', textDecoration: 'none', display: 'block', marginBottom: '0.25rem' }}>
                                    {item.variant.product.name}
                                </Link>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                                    Pack Size: {item.variant.size}
                                </p>

                                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.95rem' }}>
                                    <div>
                                        <span style={{ color: 'var(--color-text-muted)', marginRight: '0.5rem' }}>Price:</span>
                                        <span style={{ fontWeight: 600 }}>₹{item.price}</span>
                                    </div>
                                    <div>
                                        <span style={{ color: 'var(--color-text-muted)', marginRight: '0.5rem' }}>Quantity:</span>
                                        <span style={{ fontWeight: 600 }}>{item.quantity}</span>
                                    </div>
                                    <div>
                                        <span style={{ color: 'var(--color-text-muted)', marginRight: '0.5rem' }}>Item Total:</span>
                                        <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Re-order action */}
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Link href={`/product/${item.variant.product.slug}`} className="btn btn-outline" style={{ padding: '0.6rem 1.25rem' }}>
                                    Buy it again
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
