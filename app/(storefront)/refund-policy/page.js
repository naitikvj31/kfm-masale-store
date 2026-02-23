export function generateMetadata() {
    return {
        title: 'Refund & Returns Policy | KFM Masale',
        description: 'Our policy regarding refunds and returns for our organic spices.',
    };
}

export default function RefundPolicyPage() {
    return (
        <main className="container section">
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '2rem', fontSize: '2.5rem' }}>Refund & Returns Policy</h1>

                <div style={{ lineHeight: 1.8, color: 'var(--color-text)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <p>Last updated: Feb 2026</p>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>1. Food Products Non-Returnable</h2>
                    <p>At KFM Masale, we deal exclusively in premium organic food products. Because of the consumable nature of spices and strict hygiene protocols, <strong>we do not accept returns on any opened or sealed spice packets once they have been delivered.</strong></p>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>2. Refunds for Damaged or Incorrect Items</h2>
                    <p>We take extreme care in packaging your orders. However, if your order arrives damaged, tampered with, or if you receive the wrong item, we will issue a full refund or a replacement.</p>
                    <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                        <li>You must notify us within <strong>24 hours</strong> of receiving the delivery.</li>
                        <li>Please send a photo or video of the damaged package/product clearly showing the issue and the shipping label to our WhatsApp support at +91 8875443482.</li>
                        <li>We will review your claim and process a refund to your original method of payment (or via UPI/Bank transfer if COD was used) within 5-7 business days.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>3. Cancellations</h2>
                    <p>You can cancel your order for a full refund at any time <strong>before it is dispatched</strong>. Once an order has been handed over to our delivery partners, it cannot be cancelled.</p>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>4. Contact for Claims</h2>
                    <p>To start a claim for a damaged product or to cancel your order, message us directly at:</p>
                    <p>Phone/WhatsApp: +91 8875443482</p>
                </div>
            </div>
        </main>
    );
}
