'use server';

import { prisma } from '@/lib/db';
import { getSession } from '@/app/actions/auth';
import { revalidatePath } from 'next/cache';

export async function submitReview(productId, data) {
    try {
        const session = await getSession();
        if (!session) {
            return { error: 'You must be logged in to submit a review.' };
        }

        const userId = session.id;

        // Verify if user has actually purchased this product
        const hasPurchased = await prisma.orderItem.findFirst({
            where: {
                variant: { productId },
                order: {
                    userId,
                    status: { in: ['Delivered', 'Shipped', 'Processing', 'Pending'] } // Or just restrict to Delivered if strict
                }
            }
        });

        if (!hasPurchased) {
            return { error: 'You can only review products you have purchased.' };
        }

        // Check if user already reviewed this product
        const existingReview = await prisma.review.findFirst({
            where: { productId, userId }
        });

        if (existingReview) {
            return { error: 'You have already submitted a review for this product.' };
        }

        // Create review
        await prisma.review.create({
            data: {
                productId,
                userId,
                rating: parseInt(data.rating, 10),
                title: data.title || null,
                comment: data.comment,
                isApproved: true // Auto-approve for now, or false if you want strict moderation
            }
        });

        revalidatePath(`/product/[slug]`, 'page');
        revalidatePath(`/`, 'page');
        revalidatePath(`/shop`, 'page');

        return { success: true, message: 'Review submitted successfully!' };
    } catch (e) {
        console.error('Review submission error:', e);
        return { error: 'Failed to submit review. Please try again later.' };
    }
}
