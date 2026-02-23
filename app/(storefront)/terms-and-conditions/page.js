export function generateMetadata() {
    return {
        title: 'Terms & Conditions | KFM Masale',
        description: 'Terms and Conditions for using KFM Masale website and services.',
    };
}

export default function TermsPage() {
    return (
        <main className="container section">
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '2rem', fontSize: '2.5rem' }}>Terms & Conditions</h1>

                <div style={{ lineHeight: 1.8, color: 'var(--color-text)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <p>Last updated: Feb 2026</p>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>1. Agreement to Terms</h2>
                    <p>These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) and KFM Masale (&quot;we,&quot; &quot;us&quot; or &quot;our&quot;), concerning your access to and use of the website.</p>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>2. Products and Pricing</h2>
                    <p>All products are subject to availability. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.</p>
                    <p>We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors.</p>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>3. Purchases and Payment</h2>
                    <p>We accept Cash on Delivery (COD) and UPI payments. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site.</p>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>4. Health Disclaimer</h2>
                    <p>Information provided on this site is for informational purposes only and is not meant to substitute for the advice provided by your own physician or other medical professional. You should not use the information contained herein for diagnosing or treating a health problem or disease.</p>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>5. Contact Us</h2>
                    <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:</p>
                    <p>Phone/WhatsApp: +91 8875443482</p>
                </div>
            </div>
        </main>
    );
}
