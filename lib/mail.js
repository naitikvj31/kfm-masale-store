import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kamlaflourmill123@gmail.com',
        pass: 'uybt osyg vquh kcbs'
    }
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const headerTemplate = `
    <div style="background-color: #2B5E2E; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-family: Arial, sans-serif; font-size: 24px; letter-spacing: 1px;">KFM Masale</h1>
        <p style="color: #e0e0e0; margin: 5px 0 0 0; font-family: Arial, sans-serif; font-size: 14px;">Pure & Organic Spices</p>
    </div>
`;

const footerTemplate = `
    <div style="margin-top: 30px; text-align: center; color: #888; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px; font-family: Arial, sans-serif;">
        <p>Thank you for choosing KFM Masale!</p>
        <p>If you have any questions, please contact us at contact@kfmmasale.com.</p>
        <p>© ${new Date().getFullYear()} KFM Masale. All rights reserved.</p>
    </div>
`;

export async function sendVerificationEmail(email, name, token) {
    const verificationLink = `${BASE_URL}/verify-email?token=${token}`;

    const html = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
            ${headerTemplate}
            <div style="padding: 30px;">
                <h2 style="color: #2B5E2E; margin-top: 0;">Welcome to KFM Masale, ${name}!</h2>
                <p>We are thrilled to have you join our community of pure spice lovers.</p>
                <p>To ensure the security of your account and start placing orders, please verify your email address by clicking the button below:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationLink}" style="background-color: #2B5E2E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">Verify My Email</a>
                </div>
                <p>If the button doesn't work, copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #2563EB;">${verificationLink}</p>
                <p>This link will expire in 24 hours.</p>
                <p>Best regards,<br>The KFM Masale Team</p>
            </div>
            ${footerTemplate}
        </div>
    `;

    return transporter.sendMail({
        from: '"KFM Masale" <kamlaflourmill123@gmail.com>',
        to: email,
        subject: 'Verify your KFM Masale account',
        html: html
    });
}

export async function sendPasswordResetEmail(email, name, token) {
    const resetLink = `${BASE_URL}/reset-password?token=${token}`;

    const html = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
            ${headerTemplate}
            <div style="padding: 30px;">
                <h2 style="color: #2B5E2E; margin-top: 0;">Password Reset Request</h2>
                <p>Hello ${name},</p>
                <p>We received a request to reset the password for your KFM Masale account.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" style="background-color: #2B5E2E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">Reset Password</a>
                </div>
                <p>If the button doesn't work, copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #2563EB;">${resetLink}</p>
                <p>This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.</p>
            </div>
            ${footerTemplate}
        </div>
    `;

    return transporter.sendMail({
        from: '"KFM Masale" <kamlaflourmill123@gmail.com>',
        to: email,
        subject: 'Reset your KFM Masale password',
        html: html
    });
}

export async function sendOrderConfirmation(email, order) {
    const orderLink = `${BASE_URL}/profile/orders/${order.id}`;

    const html = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
            ${headerTemplate}
            <div style="padding: 30px;">
                <h2 style="color: #2B5E2E; margin-top: 0;">Order Confirmed!</h2>
                <p>Hello ${order.customerName},</p>
                <p>Thank you for shopping with KFM Masale. Your order <strong>#KFM-${order.id}</strong> has been successfully placed and is currently being processed.</p>
                
                <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0; border: 1px solid #e5e7eb;">
                    <h3 style="margin-top: 0; border-bottom: 1px solid #d1d5db; padding-bottom: 5px;">Order Summary</h3>
                    <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
                    <p><strong>Payment Method:</strong> ${order.paymentMethod === 'upi' ? 'UPI / Online' : 'Cash on Delivery'}</p>
                    <p><strong>Shipping To:</strong> ${order.customerAddress}</p>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${orderLink}" style="background-color: #2B5E2E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">View Order Details & Track Status</a>
                </div>
                
                <p>We will notify you once your order has been shipped!</p>
            </div>
            ${footerTemplate}
        </div>
    `;

    return transporter.sendMail({
        from: '"KFM Masale Support" <kamlaflourmill123@gmail.com>',
        to: email,
        subject: `Order Confirmation #KFM-${order.id}`,
        html: html
    });
}

export async function sendAdminOrderAlert(order) {
    const adminLink = `${BASE_URL} / admin / orders`;
    const html = `
    < div style = "font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee;" >
            <div style="background-color: #111827; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-family: Arial, sans-serif; font-size: 20px;">🚨 New Order Received</h1>
            </div>
            <div style="padding: 30px;">
                <h3 style="margin-top: 0;">Order Details</h3>
                <ul>
                    <li><strong>Order ID:</strong> KFM-${order.id}</li>
                    <li><strong>Customer:</strong> ${order.customerName}</li>
                    <li><strong>Phone:</strong> ${order.customerPhone}</li>
                    <li><strong>Amount:</strong> ₹${order.totalAmount}</li>
                    <li><strong>Method:</strong> ${order.paymentMethod === 'upi' ? 'UPI' : 'COD'}</li>
                </ul>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${adminLink}" style="background-color: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">Open Admin Dashboard</a>
                </div>
            </div>
        </div >
        `;

    return transporter.sendMail({
        from: '"KFM Notification Bot" <kamlaflourmill123@gmail.com>',
        to: 'kamlaflourmill123@gmail.com',
        subject: `[URGENT] New Order Placed: KFM-${order.id}`,
        html: html
    });
}
