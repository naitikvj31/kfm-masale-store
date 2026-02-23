import { getSession } from '@/app/actions/auth';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    const session = await getSession();
    if (!session) {
        return new NextResponse('Unauthorized. Please log in first.', { status: 401 });
    }

    const resolvedParams = await params;
    const orderId = parseInt(resolvedParams.id, 10);
    if (isNaN(orderId)) {
        return new NextResponse('Invalid Order ID.', { status: 400 });
    }

    const order = await prisma.order.findUnique({
        where: { id: orderId },
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

    if (!order) {
        return new NextResponse('Order not found.', { status: 404 });
    }
    if (order.customerEmail && order.customerEmail !== session.email) {
        return new NextResponse('Unauthorized access.', { status: 403 });
    }

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>KFM Masale - Order ${order.id}</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                color: #000; 
                margin: 0; 
                padding: 40px; 
                font-size: 13px; 
                background: #fff; 
                line-height: 1.4;
            }
            .container { 
                max-width: 850px; 
                margin: 0 auto; 
            }
            .header-banner {
                font-size: 24px;
                font-weight: bold;
                text-align: right;
                margin-bottom: 20px;
            }
            .logo-section {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 30px;
            }
            .brand-name {
                font-size: 28px;
                font-weight: bold;
                letter-spacing: -0.5px;
            }
            .invoice-label {
                font-size: 22px;
                font-weight: normal;
                margin-top: 10px;
                text-align: right;
            }
            .details-grid {
                display: flex;
                justify-content: space-between;
                margin-bottom: 30px;
            }
            .address-box {
                width: 48%;
            }
            .address-box strong {
                display: block;
                margin-bottom: 5px;
                font-size: 14px;
            }
            .address-text {
                white-space: pre-line;
            }
            .order-meta-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
                border: 2px solid #000;
            }
            .order-meta-table td {
                padding: 8px 12px;
                border: 1px solid #000;
                vertical-align: top;
            }
            .items-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
                border: 2px solid #000;
            }
            .items-table th {
                background-color: #f0f0f0;
                border: 1px solid #000;
                padding: 8px 12px;
                text-align: left;
                font-weight: bold;
                font-size: 12px;
            }
            .items-table td {
                border: 1px solid #000;
                padding: 8px 12px;
                vertical-align: top;
            }
            .text-right { text-align: right !important; }
            .text-center { text-align: center !important; }
            
            .totals-table {
                width: 40%;
                float: right;
                border-collapse: collapse;
            }
            .totals-table td {
                padding: 6px 12px;
            }
            .totals-table tr.grand-total {
                font-weight: bold;
                font-size: 14px;
                border-top: 2px solid #000;
                border-bottom: 2px solid #000;
            }
            .clear { clear: both; }
            .footer-notes {
                margin-top: 50px;
                font-size: 11px;
                text-align: center;
                border-top: 1px solid #ccc;
                padding-top: 20px;
            }
            @media print {
                body { padding: 0; }
            }
        </style>
    </head>
    <body onload="window.print()">
        <div class="container">
            <div class="header-banner">
                Tax Invoice
            </div>

            <div class="logo-section">
                <div>
                    <div class="brand-name">KFM Masale</div>
                    <div>30/8 sec 3 pratap nagar</div>
                    <div>Sanganer, Jaipur, RJ 302033</div>
                    <div>IN</div>
                </div>
                <div style="text-align: right;">
                    <strong>Original for Recipient</strong>
                </div>
            </div>

            <div class="details-grid">
                <div class="address-box">
                    <strong>Billing Address :</strong>
                    <div class="address-text">${order.customerName}
${order.customerAddress || 'Address not provided'}
Phone: ${order.customerPhone}
Email: ${order.customerEmail || 'N/A'}</div>
                </div>
                <div class="address-box">
                    <strong>Shipping Address :</strong>
                    <div class="address-text">${order.customerName}
${order.customerAddress || 'Address not provided'}
Phone: ${order.customerPhone}</div>
                </div>
            </div>

            <table class="order-meta-table">
                <tr>
                    <td width="50%">
                        <strong>Order Number:</strong> KFM-${order.id}<br>
                        <strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td width="50%">
                        <strong>Invoice Date:</strong> ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}<br>
                        <strong>Payment Method:</strong> ${order.paymentMethod === 'cod' ? 'Pay on Delivery' : 'Prepaid (UPI)'}
                    </td>
                </tr>
            </table>

            <table class="items-table">
                <thead>
                    <tr>
                        <th width="5%">Sl. No</th>
                        <th width="45%">Description</th>
                        <th width="15%" class="text-right">Unit Price</th>
                        <th width="10%" class="text-center">Qty</th>
                        <th width="25%" class="text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.orderItems.map((item, index) => `
                    <tr>
                        <td class="text-center">${index + 1}</td>
                        <td>
                            <strong>${item.variant?.product?.name || 'Item'}</strong><br>
                            Size: ${item.variant?.size || '-'}
                        </td>
                        <td class="text-right">₹${item.price.toFixed(2)}</td>
                        <td class="text-center">${item.quantity}</td>
                        <td class="text-right">₹${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>

            <table class="totals-table">
                <tr>
                    <td class="text-right">Subtotal:</td>
                    <td class="text-right">₹${(order.totalAmount).toFixed(2)}</td>
                </tr>
                <tr>
                    <td class="text-right">Shipping Charges:</td>
                    <td class="text-right">₹0.00</td>
                </tr>
                <tr class="grand-total">
                    <td class="text-right">Grand Total:</td>
                    <td class="text-right">₹${(order.totalAmount).toFixed(2)}</td>
                </tr>
            </table>
            
            <div class="clear"></div>
            
            <div style="margin-top: 20px;">
                <strong>Amount in Words:</strong><br>
                <em>INR ${order.totalAmount} Only</em>
            </div>

            <div class="footer-notes">
                * This is a computer generated invoice and does not require a physical signature.<br>
                Thank you for shopping on KFM Masale. To learn more about our pure organic spices, visit our website.<br>
                For any queries, email us at contact@kfmmasale.com.
            </div>
        </div>
    </body>
    </html>
    `;

    return new NextResponse(html, {
        headers: {
            'Content-Type': 'text/html',
        },
    });
}
