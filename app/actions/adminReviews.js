'use server';

import { prisma } from '@/lib/db';
import { getSession } from '@/app/actions/auth';
import { revalidatePath } from 'next/cache';

export async function deleteReview(reviewId) {
    try {
        const session = await getSession();
        if (!session || session.role !== 'ADMIN') {
            return { error: 'Unauthorized. Admin access required.' };
        }

        const review = await prisma.review.findUnique({
            where: { id: reviewId },
            select: { product: { select: { slug: true } } }
        });

        if (!review) return { error: 'Review not found.' };

        await prisma.review.delete({
            where: { id: reviewId }
        });

        revalidatePath('/admin/reviews');
        if (review.product) {
            revalidatePath(`/product/${review.product.slug}`);
            revalidatePath(`/shop`);
            revalidatePath(`/`);
        }

        return { success: true, message: 'Review deleted successfully.' };
    } catch (e) {
        console.error('Delete review error:', e);
        return { error: 'Failed to delete review.' };
    }
}

export async function toggleReviewStatus(reviewId, newStatus) {
    try {
        const session = await getSession();
        if (!session || session.role !== 'ADMIN') {
            return { error: 'Unauthorized. Admin access required.' };
        }

        const review = await prisma.review.findUnique({
            where: { id: reviewId },
            select: { product: { select: { slug: true } } }
        });

        if (!review) return { error: 'Review not found.' };

        await prisma.review.update({
            where: { id: reviewId },
            data: { isApproved: newStatus }
        });

        revalidatePath('/admin/reviews');
        if (review.product) {
            revalidatePath(`/product/${review.product.slug}`);
            revalidatePath(`/shop`);
            revalidatePath(`/`);
        }

        return { success: true, message: `Review ${newStatus ? 'approved' : 'hidden'} successfully.` };
    } catch (e) {
        console.error('Toggle review status error:', e);
        return { error: 'Failed to update review status.' };
    }
}
