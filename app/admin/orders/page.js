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
                                    backgroundColor: '#F9FAFB',
                                    borderBottom: '1px solid #E5E7EB',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    flexWrap: 'wrap',
                                    gap: '1.5rem'
                                }}>
                                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                                        <div>
                                            <div style={{ fontSize: '0.72rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>Order ID</div>
                                            <div style={{ fontWeight: 700, color: '#111827', fontSize: '1.1rem' }}>#{order.id}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.72rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>Placed On</div>
                                            <div style={{ fontWeight: 500, color: '#374151' }}>{new Date(order.createdAt).toLocaleString()}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.72rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>Customer</div>
                                            <div style={{ fontWeight: 600, color: '#111827' }}>{order.customerName}</div>
                                            <div style={{ color: '#4B5563', fontSize: '0.85rem' }}>{order.customerPhone}</div>
                                        </div>
                                    </div>

                                    {/* Status Update */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
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
                                                padding: '0.4rem 0.6rem', border: '1.5px solid #E5E7EB', borderRadius: '6px',
                                                fontSize: '0.85rem', fontWeight: 500, backgroundColor: 'white', cursor: 'pointer', outline: 'none'
                                            }}>
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                            <button type="submit" style={{
                                                padding: '0.45rem 0.85rem', backgroundColor: '#111827', color: 'white',
                                                border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600,
                                                fontSize: '0.8rem', transition: 'background-color 0.2s'
                                            }}>Save</button>
                                        </ClientForm>
                                    </div>
                                </div>

                                {/* Deep Information Grid */}
                                <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>

                                    {/* Additional Financials */}
                                    <div style={{ flex: 1, minWidth: '200px' }}>
                                        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#6B7280', marginBottom: '0.75rem', letterSpacing: '0.5px' }}>Payment & Finance</h4>
                                        <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.9rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: '#6B7280' }}>Payment Method:</span>
                                                <span style={{ fontWeight: 500, color: '#111827' }}>COD / UPI</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: '#6B7280' }}>Order Status:</span>
                                                <span style={{ fontWeight: 500, color: '#111827' }}>{order.status}</span>
                                            </div>
                                            <div style={{ width: '100%', height: '1px', backgroundColor: '#E5E7EB', margin: '0.25rem 0' }}></div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: '#111827' }}>
                                                <span>Total Amount:</span>
                                                <span>₹{order.totalAmount}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Detailed Address */}
                                    <div>
                                        <h4 style={{ fontSize: '0.85rem', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>Shipping Information</h4>
                                        <p style={{ color: '#111827', fontWeight: 600, marginBottom: '0.25rem' }}>{order.customerName}</p>
                                        <p style={{ color: '#4B5563', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                                            {order.customerAddress || 'No address provided in system.'}
                                        </p>
                                        <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#6B7280' }}>
                                            <div>Email: <a href={`mailto:${order.customerEmail}`} style={{ color: '#2563EB', textDecoration: 'none' }}>{order.customerEmail}</a></div>
                                            <div>Phone: <a href={`tel:${order.customerPhone}`} style={{ color: '#2563EB', textDecoration: 'none' }}>{order.customerPhone}</a></div>
                                        </div>
                                    </div>

                                    {/* Items List */}
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <h4 style={{ fontSize: '0.85rem', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>
                                            Items Ordered ({order.orderItems.length})
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {order.orderItems.map(item => (
                                                <div key={item.id} style={{
                                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                    padding: '0.75rem 1rem', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #F3F4F6'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <div style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.25rem' }}>
                                                            <img
                                                                src={item.variant?.product?.images?.[0]?.url || item.variant?.product?.imageUrl || 'https://via.placeholder.com/40'}
                                                                alt={item.variant?.product?.name || 'Product'}
                                                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.95rem' }}>{item.variant?.product?.name || 'Unknown Product'}</div>
                                                            <div style={{ color: '#6B7280', fontSize: '0.85rem' }}>Pack Size: {item.variant?.size || '?'}</div>
                                                        </div>
                                                    </div>
                                                    <div style={{ textAlign: 'right' }}>
                                                        <div style={{ fontWeight: 600, color: '#111827' }}>₹{item.price * item.quantity}</div>
                                                        <div style={{ color: '#6B7280', fontSize: '0.85rem' }}>{item.quantity} x ₹{item.price}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
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
