import { PrismaClient } from '@prisma/client';
import { updateOrderStatus } from '@/app/actions/orders';
import ClientForm from '@/components/ClientForm';

const prisma = new PrismaClient();

export default async function OrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            orderItems: {
                include: {
                    variant: {
                        include: { product: true }
                    }
                }
            }
        }
    });

    const statusColors = {
        Pending: { bg: '#FEF3C7', text: '#92400E', dot: '#F59E0B' },
        Processing: { bg: '#DBEAFE', text: '#1E40AF', dot: '#3B82F6' },
        Shipped: { bg: '#D1FAE5', text: '#065F46', dot: '#10B981' },
        Delivered: { bg: '#DCFCE7', text: '#166534', dot: '#22C55E' },
        Cancelled: { bg: '#FEE2E2', text: '#991B1B', dot: '#EF4444' }
    };

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#111827', marginBottom: '0.25rem' }}>Customer Orders</h1>
                <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>View all orders placed by customers and update their delivery status.</p>
            </div>

            {orders.length === 0 ? (
                <div style={{ background: 'white', borderRadius: '12px', padding: '3rem', textAlign: 'center', border: '1px solid #E5E7EB' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" style={{ margin: '0 auto 1rem' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                    <p style={{ color: '#6B7280', fontSize: '1rem' }}>No orders yet. When customers place orders, they'll appear here.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {orders.map(order => {
                        const sc = statusColors[order.status] || statusColors['Pending'];

                        return (
                            <div key={order.id} style={{
                                background: 'white',
                                borderRadius: '12px',
                                border: '1px solid #E5E7EB',
                                overflow: 'hidden'
                            }}>
                                {/* Order Header */}
                                <div style={{
                                    padding: '1.25rem 1.5rem',
                                    borderBottom: '1px solid #F3F4F6',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: '1rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                                        <div>
                                            <div style={{ fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Order ID</div>
                                            <div style={{ fontWeight: 700, color: '#111827' }}>#{order.id}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer</div>
                                            <div style={{ fontWeight: 600, color: '#111827' }}>{order.customerName}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone</div>
                                            <div style={{ color: '#374151' }}>{order.customerPhone}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</div>
                                            <div style={{ fontWeight: 700, color: '#111827', fontSize: '1.05rem' }}>₹{order.totalAmount}</div>
                                        </div>
                                    </div>

                                    {/* Status Update */}
                                    <ClientForm action={updateOrderStatus.bind(null, order.id)} successMessage="Order status updated!" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                                            backgroundColor: sc.bg, color: sc.text,
                                            padding: '0.3rem 0.75rem', borderRadius: '99px',
                                            fontSize: '0.78rem', fontWeight: 600
                                        }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: sc.dot }}></span>
                                            {order.status}
                                        </span>
                                        <select name="status" defaultValue={order.status} style={{
                                            padding: '0.45rem 0.65rem', border: '1.5px solid #E5E7EB', borderRadius: '8px',
                                            fontSize: '0.85rem', fontFamily: 'inherit', backgroundColor: 'white', cursor: 'pointer'
                                        }}>
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                        <button type="submit" style={{
                                            padding: '0.45rem 0.85rem', backgroundColor: '#2B5E2E', color: 'white',
                                            border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600,
                                            fontSize: '0.8rem', fontFamily: 'inherit'
                                        }}>Update</button>
                                    </ClientForm>
                                </div>

                                {/* Order Items & Address */}
                                <div style={{ padding: '1rem 1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                                    {/* Items */}
                                    <div style={{ flex: 2, minWidth: '300px' }}>
                                        <div style={{ fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>Items Ordered</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                            {order.orderItems.map(item => (
                                                <div key={item.id} style={{
                                                    display: 'flex', justifyContent: 'space-between',
                                                    padding: '0.5rem 0.75rem', backgroundColor: '#F9FAFB', borderRadius: '6px', fontSize: '0.9rem'
                                                }}>
                                                    <span>
                                                        <span style={{ fontWeight: 600 }}>{item.variant?.product?.name || 'Unknown'}</span>
                                                        <span style={{ color: '#6B7280' }}> — {item.variant?.size || '?'} x{item.quantity}</span>
                                                    </span>
                                                    <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div style={{ flex: 1, minWidth: '200px' }}>
                                        <div style={{ fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>Delivery Address</div>
                                        <p style={{ color: '#374151', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                                            {order.customerAddress}
                                        </p>
                                        {order.customerEmail && (
                                            <p style={{ color: '#6B7280', fontSize: '0.85rem', margin: '0.5rem 0 0' }}>{order.customerEmail}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
