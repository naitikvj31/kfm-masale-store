'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function updateOrderStatus(orderId, formData) {
    // [SECURITY] 1. Validate Admin Session (Prevent IDOR / Privilege Escalation)
    const cookieStore = await cookies();
    const adminToken = cookieStore.get('admin_token')?.value;

    if (adminToken !== 'authenticated') {
        throw new Error('Unauthorized: Admin privileges required to update order status.');
    }

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
