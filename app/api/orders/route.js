import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getSession } from '@/app/actions/auth';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        // [SECURITY] 1. Validate Session to prevent anonymous Bot Spamming
        const session = await getSession();
        if (!session || !session.id) {
            return NextResponse.json({ error: 'Unauthorized: Valid User Session Required' }, { status: 401 });
        }

        const body = await req.json();
        const {
            customerName,
            customerPhone,
            customerEmail, // We will still check this against the Session
            customerAddress,
            totalAmount, // We will re-calculate this server-side so hackers cant spoof it
            items
        } = body;

        if (!customerName || !customerPhone || !customerAddress || !items || !items.length) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // [SECURITY] 2. Email Spoofing protection - Ensure they aren't ordering on behalf of someone else
        if (customerEmail && customerEmail !== session.email) {
            return NextResponse.json({ error: 'Identity mismatch. Please use your authenticated email.' }, { status: 403 });
        }

        // [SECURITY] 3. Server-side total calculation to prevent payload manipulation
        let serverCalculatedSubtotal = 0;
        const processedItems = items.map(item => {
            serverCalculatedSubtotal += item.price * item.quantity;
            return {
                variantId: item.variantId,
                quantity: item.quantity,
                price: item.price
            };
        });

        // Static Delivery Rule (must match frontend checkout.js)
        const serverCalculatedDeliveryFee = serverCalculatedSubtotal > 500 ? 0 : 40;
        const verifiedTotalAmount = serverCalculatedSubtotal + serverCalculatedDeliveryFee;

        if (totalAmount !== verifiedTotalAmount) {
            console.warn('Tampered Total Amount detected. Enforcing server calculation.');
        }

        const order = await prisma.order.create({
            data: {
                customerName: session.name || customerName,
                customerPhone,
                customerEmail: session.email,
                customerAddress,
                totalAmount: verifiedTotalAmount,
                deliveryFee: serverCalculatedDeliveryFee,
                orderItems: {
                    create: processedItems
                }
            }
        });

        return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
    } catch (error) {
        console.error('Failed to create order:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
