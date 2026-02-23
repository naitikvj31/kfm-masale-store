import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            customerName,
            customerPhone,
            customerEmail,
            customerAddress,
            totalAmount,
            items
        } = body;

        if (!customerName || !customerPhone || !customerAddress || !items || !items.length) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const order = await prisma.order.create({
            data: {
                customerName,
                customerPhone,
                customerEmail: customerEmail || null,
                customerAddress,
                totalAmount,
                orderItems: {
                    create: items.map(item => ({
                        variantId: item.variantId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        });

        return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
    } catch (error) {
        console.error('Failed to create order:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
