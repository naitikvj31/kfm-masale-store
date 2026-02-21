'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function updateOrderStatus(orderId, formData) {
    const status = formData.get('status');

    if (!status) return { error: 'Status is required' };

    try {
        await prisma.order.update({
            where: { id: parseInt(orderId) },
            data: { status },
        });

        revalidatePath('/admin/orders');
        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        return { error: 'Failed to update order status' };
    }
}
