export function generateMetadata() {
    return {
        title: 'Privacy Policy | KFM Masale',
        description: 'Privacy Policy for KFM Masale. We respect your privacy and are committed to protecting it.',
    };
}

export default function PrivacyPolicyPage() {
    return (
        <main className="container section">
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '2rem', fontSize: '2.5rem' }}>Privacy Policy</h1>

                <div style={{ lineHeight: 1.8, color: 'var(--color-text)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <p>Last updated: Feb 2026</p>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>1. Introduction</h2>
                    <p>Welcome to KFM Masale (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>2. The Data We Collect</h2>
                    <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                    <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                        <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>3. How We Use Your Data</h2>
                    <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                    <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                        <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., fulfilling your order).</li>
                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        <li>Where we need to comply with a legal obligation.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>4. Data Security</h2>
                    <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. Payment information is securely transmitted via WhatsApp and UPI.</p>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginTop: '1rem' }}>5. Contact Us</h2>
                    <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
                    <p>Phone/WhatsApp: +91 8875443482</p>
                </div>
            </div>
        </main>
    );
}
