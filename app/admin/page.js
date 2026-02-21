import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function AdminDashboard() {
    const productsCount = await prisma.product.count();
    const ordersCount = await prisma.order.count();
    const pendingOrders = await prisma.order.count({ where: { status: 'Pending' } });

    const lowStockVariants = await prisma.variant.findMany({
        where: { stockQuantity: { lt: 10 } },
        include: { product: true },
        take: 5,
        orderBy: { stockQuantity: 'asc' }
    });

    const recentOrders = await prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { orderItems: true }
    });

    return (
        <div>
            {/* Page Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#111827', marginBottom: '0.25rem' }}>Dashboard</h1>
                <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Welcome back! Here's an overview of your store.</p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                <StatCard label="Total Products" value={productsCount} color="#2B5E2E" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /></svg>} />
                <StatCard label="Total Orders" value={ordersCount} color="#1565C0" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>} />
                <StatCard label="Pending Orders" value={pendingOrders} color="#E65100" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Low Stock Alerts */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E5E7EB' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827', margin: 0 }}>Low Stock Alerts</h2>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DC2626', backgroundColor: '#FEE2E2', padding: '0.2rem 0.6rem', borderRadius: '99px' }}>
                            {lowStockVariants.length} items
                        </span>
                    </div>
                    {lowStockVariants.length === 0 ? (
                        <p style={{ color: '#9CA3AF', fontSize: '0.9rem', textAlign: 'center', padding: '2rem 0' }}>All stock levels are healthy!</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {lowStockVariants.map(v => (
                                <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.75rem', backgroundColor: '#FEF2F2', borderRadius: '8px', fontSize: '0.9rem' }}>
                                    <div>
                                        <span style={{ fontWeight: 600, color: '#111827' }}>{v.product.name}</span>
                                        <span style={{ color: '#6B7280' }}> — {v.size}</span>
                                    </div>
                                    <span style={{ fontWeight: 700, color: '#DC2626' }}>{v.stockQuantity} left</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Orders */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E5E7EB' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827', margin: 0 }}>Recent Orders</h2>
                        <Link href="/admin/orders" style={{ fontSize: '0.85rem', fontWeight: 500, color: '#2B5E2E' }}>View All →</Link>
                    </div>
                    {recentOrders.length === 0 ? (
                        <p style={{ color: '#9CA3AF', fontSize: '0.9rem', textAlign: 'center', padding: '2rem 0' }}>No orders yet.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {recentOrders.map(order => (
                                <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.75rem', backgroundColor: '#F9FAFB', borderRadius: '8px', fontSize: '0.9rem' }}>
                                    <div>
                                        <span style={{ fontWeight: 600, color: '#111827' }}>#{order.id}</span>
                                        <span style={{ color: '#6B7280' }}> — {order.customerName}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ fontWeight: 600 }}>₹{order.totalAmount}</span>
                                        <StatusBadge status={order.status} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                <Link href="/admin/products/new" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.7rem 1.25rem', backgroundColor: '#2B5E2E', color: 'white',
                    borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem'
                }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    Add New Product
                </Link>
                <Link href="/admin/orders" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.7rem 1.25rem', backgroundColor: 'white', color: '#374151',
                    border: '1px solid #D1D5DB', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem'
                }}>
                    View All Orders
                </Link>
            </div>
        </div>
    );
}

function StatCard({ label, value, color, icon }) {
    return (
        <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
        }}>
            <div style={{
                width: '48px', height: '48px',
                backgroundColor: color + '12',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: color
            }}>
                {icon}
            </div>
            <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '0.2rem' }}>{label}</div>
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        Pending: { bg: '#FEF3C7', text: '#92400E' },
        Processing: { bg: '#DBEAFE', text: '#1E40AF' },
        Shipped: { bg: '#D1FAE5', text: '#065F46' },
        Delivered: { bg: '#DCFCE7', text: '#166534' },
        Cancelled: { bg: '#FEE2E2', text: '#991B1B' }
    };
    const s = styles[status] || styles['Pending'];
    return (
        <span style={{ backgroundColor: s.bg, color: s.text, padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600 }}>
            {status}
        </span>
    );
}
