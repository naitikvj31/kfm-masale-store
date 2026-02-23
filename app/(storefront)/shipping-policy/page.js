export function generateMetadata() {
    return {
        title: 'Shipping & Delivery Policy | KFM Masale',
        description: 'Learn about our shipping times, delivery charges, and processes.',
    };
}

export default function ShippingPolicyPage() {
    return (
        <main className="container section">
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '2rem', fontSize: '2.5rem' }}>Shipping & Delivery Policy</h1>

                <div style={{ lineHeight: 1.8, color: 'var(--color-text)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <p>Last updated: Feb 2026</p>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>1. Dispatch Times</h2>
                    <p>All orders are processed and freshly packed within 1-2 business days (excluding weekends and holidays) after receiving your order confirmation.</p>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>2. Delivery Charges</h2>
                    <p>Shipping charges for your order will be calculated and displayed at checkout:</p>
                    <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                        <li><strong>Orders under ₹500:</strong> A flat standard delivery fee of ₹100 applies.</li>
                        <li><strong>Orders ₹500 and above:</strong> Enjoy FREE standard delivery on us.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>3. Delivery Timelines</h2>
                    <p>Standard delivery typically takes between 3 to 7 business days depending on your location within India. Remote areas may experience slightly longer delivery times.</p>
                    <p>Please note that delivery times are estimates and not guarantees. We are not responsible for delays caused by the courier company or unforeseen weather circumstances, but we will always help you track your package.</p>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>4. Order Tracking</h2>
                    <p>Once your order has shipped, we will send you a confirmation message via WhatsApp along with tracking information (if available) so you can monitor your delivery.</p>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>5. Contact Us</h2>
                    <p>If you have questions about your delivery, please contact us at:</p>
                    <p>Phone/WhatsApp: +91 8875443482</p>
                </div>
            </div>
        </main>
    );
}
