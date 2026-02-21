'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function placeOrder(formData, cartItemsStr, totalAmount) {
    const customerName = formData.get('customerName');
    const customerEmail = formData.get('customerEmail');
    const customerPhone = formData.get('customerPhone');
    const customerAddress = formData.get('customerAddress');

    if (!customerName || !customerPhone || !customerAddress) {
        return { error: 'Name, Phone, and Address are required.' };
    }

    const cartItems = JSON.parse(cartItemsStr);

    if (!cartItems || cartItems.length === 0) {
        return { error: 'Your cart is empty.' };
    }

    try {
        // We use a transaction to ensure we only create the order if all stock updates succeed
        const newOrder = await prisma.$transaction(async (tx) => {
            // 1. Check stock for all items first
            for (const item of cartItems) {
                const variant = await tx.variant.findUnique({ where: { id: item.variant.id } });
                if (!variant || variant.stockQuantity < item.quantity) {
                    throw new Error(`Not enough stock for ${item.product.name} (${item.variant.size})`);
                }
            }

            // 2. Create Order and OrderItems
            const order = await tx.order.create({
                data: {
                    customerName,
                    customerEmail,
                    customerPhone,
                    customerAddress,
                    totalAmount: parseFloat(totalAmount),
                    status: 'Pending',
                    orderItems: {
                        create: cartItems.map(item => ({
                            variantId: item.variant.id,
                            quantity: item.quantity,
                            price: item.variant.price
                        }))
                    }
                },
            });

            // 3. Decrement Stock
            for (const item of cartItems) {
                await tx.variant.update({
                    where: { id: item.variant.id },
                    data: {
                        stockQuantity: {
                            decrement: item.quantity
                        }
                    }
                });
            }

            return order;
        });

        return { success: true, orderId: newOrder.id };
    } catch (error) {
        return { error: error.message || 'Failed to place order. Please try again later.' };
    }
}
