import { getSession } from '@/app/actions/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function OrdersPage() {
    const session = await getSession();

    // Fetch orders matching the static demo email
    // In a real app, this would filter by session.id
    const orders = await prisma.order.findMany({
        where: {
            customerEmail: session.email
        },
        include: {
            orderItems: {
                include: {
                    variant: {
                        include: {
                            product: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '2rem' }}>
                Your Orders
            </h1>

            {orders.length === 0 ? (
                <div style={{
                    padding: '3rem',
                    textAlign: 'center',
                    backgroundColor: 'var(--color-bg-subtle)',
                    borderRadius: '16px',
                    border: '1px dashed var(--color-border)'
                }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" style={{ margin: '0 auto 1rem' }}><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>No orders found</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>You haven't placed any orders yet. Start exploring our organic spices!</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {orders.map((order) => (
                        <div key={order.id} style={{
                            border: '1px solid var(--color-border)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            backgroundColor: 'white'
                        }}>
                            {/* Order Header (Amazon style) */}
                            <div style={{
                                backgroundColor: 'var(--color-bg-subtle)',
                                padding: '1rem 1.5rem',
                                borderBottom: '1px solid var(--color-border)',
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '1rem',
                                fontSize: '0.85rem',
                                color: 'var(--color-text-muted)'
                            }}>
                                <div style={{ display: 'flex', gap: '2rem' }}>
                                    <div>
                                        <div style={{ textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>Order Placed</div>
                                        <div style={{ color: 'var(--color-text)', fontWeight: 500 }}>
                                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                year: 'numeric', month: 'long', day: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>Total</div>
                                        <div style={{ color: 'var(--color-text)', fontWeight: 500 }}>₹{order.totalAmount}</div>
                                    </div>
                                    <div>
                                        <div style={{ textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>Ship To</div>
                                        <div style={{ color: 'var(--color-text)', fontWeight: 500 }}>{order.customerName}</div>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem', textAlign: 'right' }}>Order #</div>
                                    <div style={{ color: 'var(--color-text)', fontWeight: 500 }}>KFM-ORD-{order.id}</div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '999px',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    marginBottom: '1.5rem',
                                    backgroundColor: order.status === 'Delivered' ? '#DCFCE7' : '#FEF9C3',
                                    color: order.status === 'Delivered' ? '#166534' : '#854D0E',
                                }}>
                                    {order.status}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {order.orderItems.map((item) => (
                                        <div key={item.id} style={{ display: 'flex', gap: '1.5rem' }}>
                                            {/* Item Image */}
                                            <div style={{
                                                width: '90px',
                                                height: '90px',
                                                flexShrink: 0,
                                                borderRadius: '8px',
                                                border: '1px solid var(--color-border-light)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: '0.5rem',
                                                backgroundColor: 'white'
                                            }}>
                                                <img
                                                    src={item.variant.product.imageUrl || 'https://via.placeholder.com/90'}
                                                    alt={item.variant.product.name}
                                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                                />
                                            </div>

                                            {/* Item Info */}
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                                                    {item.variant.product.name}
                                                </h4>
                                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                                                    Pack Size: {item.variant.size}
                                                </p>
                                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', fontSize: '0.9rem' }}>
                                                    <span style={{ fontWeight: 600 }}>₹{item.price}</span>
                                                    <span style={{ color: 'var(--color-text-muted)' }}>Qty: {item.quantity}</span>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <a href={`/product/${item.variant.product.slug}`} style={{
                                                    padding: '0.5rem 1rem',
                                                    border: '1px solid var(--color-border)',
                                                    borderRadius: '8px',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 500,
                                                    transition: 'all 0.2s',
                                                    backgroundColor: 'white',
                                                    color: 'var(--color-text)'
                                                }}
                                                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-bg-subtle)'; }}
                                                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
                                                >
                                                    Buy it again
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
