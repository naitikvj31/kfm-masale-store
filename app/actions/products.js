'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function createProduct(formData) {
    const name = formData.get('name');
    const description = formData.get('description');
    const imageUrl = formData.get('imageUrl') || null;

    if (!name) return { error: 'Name is required' };

    try {
        const product = await prisma.product.create({
            data: {
                name,
                description,
                imageUrl,
            },
        });

        revalidatePath('/admin/products');
        redirect(`/admin/products/${product.id}`);
    } catch (error) {
        if (error.message.includes('NEXT_REDIRECT')) throw error;
        return { error: 'Failed to create product' };
    }
}

export async function updateProduct(id, formData) {
    const name = formData.get('name');
    const description = formData.get('description');
    const imageUrl = formData.get('imageUrl') || null;

    if (!name) return { error: 'Name is required' };

    try {
        await prisma.product.update({
            where: { id: parseInt(id) },
            data: { name, description, imageUrl },
        });

        revalidatePath('/admin/products');
        revalidatePath(`/admin/products/${id}`);
        revalidatePath('/'); // Homepage catalog
        return { success: true };
    } catch (error) {
        return { error: 'Failed to update product' };
    }
}

export async function deleteProduct(id) {
    try {
        await prisma.product.delete({
            where: { id: parseInt(id) },
        });
        revalidatePath('/admin/products');
        revalidatePath('/');
        redirect('/admin/products');
    } catch (error) {
        if (error.message.includes('NEXT_REDIRECT')) throw error;
        return { error: 'Failed to delete product' };
    }
}

export async function createVariant(productId, formData) {
    const size = formData.get('size');
    const price = parseFloat(formData.get('price'));

    let discountPrice = null;
    const discountRaw = formData.get('discountPrice');
    if (discountRaw && discountRaw.trim() !== '') {
        const parsed = parseFloat(discountRaw);
        if (!isNaN(parsed) && parsed > 0) {
            discountPrice = parsed;
        }
    }

    const stockQuantity = parseInt(formData.get('stockQuantity'), 10);

    if (!size || isNaN(price)) return { error: 'Size and valid price are required' };

    try {
        await prisma.variant.create({
            data: {
                productId: parseInt(productId),
                size,
                price,
                discountPrice,
                stockQuantity: isNaN(stockQuantity) ? 0 : stockQuantity,
            },
        });

        revalidatePath(`/admin/products/${productId}`);
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { error: 'Failed to create variant' };
    }
}

export async function updateVariant(variantId, productId, formData) {
    const size = formData.get('size');
    const price = parseFloat(formData.get('price'));

    let discountPrice = null;
    const discountRaw = formData.get('discountPrice');
    if (discountRaw && discountRaw.trim() !== '') {
        const parsed = parseFloat(discountRaw);
        if (!isNaN(parsed) && parsed > 0) {
            discountPrice = parsed;
        }
    }

    const stockQuantity = parseInt(formData.get('stockQuantity'), 10);

    try {
        await prisma.variant.update({
            where: { id: parseInt(variantId) },
            data: {
                size,
                price,
                discountPrice,
                stockQuantity: isNaN(stockQuantity) ? 0 : stockQuantity,
            },
        });

        revalidatePath(`/admin/products/${productId}`);
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { error: 'Failed to update variant' };
    }
}

export async function deleteVariant(variantId, productId) {
    try {
        await prisma.variant.delete({
            where: { id: parseInt(variantId) },
        });
        revalidatePath(`/admin/products/${productId}`);
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { error: 'Failed to delete variant' };
    }
}

export async function toggleProductActive(id) {
    try {
        const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
        if (!product) return { error: 'Product not found' };

        await prisma.product.update({
            where: { id: parseInt(id) },
            data: { isActive: !product.isActive },
        });

        revalidatePath('/admin/products');
        revalidatePath(`/admin/products/${id}`);
        revalidatePath('/');
        return { success: true, isActive: !product.isActive };
    } catch (error) {
        return { error: 'Failed to toggle product status' };
    }
}

export async function addProductImage(productId, formData) {
    const url = formData.get('url');
    if (!url) return { error: 'Image URL is required' };

    try {
        const lastImage = await prisma.productImage.findFirst({
            where: { productId: parseInt(productId) },
            orderBy: { sortOrder: 'desc' }
        });

        await prisma.productImage.create({
            data: {
                productId: parseInt(productId),
                url,
                sortOrder: (lastImage?.sortOrder || 0) + 1
            }
        });

        revalidatePath(`/admin/products/${productId}`);
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { error: 'Failed to add image' };
    }
}

export async function deleteProductImage(imageId, productId) {
    try {
        await prisma.productImage.delete({
            where: { id: parseInt(imageId) }
        });

        revalidatePath(`/admin/products/${productId}`);
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { error: 'Failed to delete image' };
    }
}

export async function updateProductSortOrder(productId, direction) {
    try {
        // Get all products ordered by sortOrder, then ID
        const products = await prisma.product.findMany({
            orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
            select: { id: true }
        });

        const currentIndex = products.findIndex(p => p.id === parseInt(productId));
        if (currentIndex === -1) return { error: 'Product not found' };

        const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        if (swapIndex < 0 || swapIndex >= products.length) return { error: 'Cannot move further' };

        // Swap elements in the array
        const temp = products[currentIndex];
        products[currentIndex] = products[swapIndex];
        products[swapIndex] = temp;

        // Rewrite all sort orders to ensure clean 0..N sequence
        await prisma.$transaction(
            products.map((p, index) =>
                prisma.product.update({
                    where: { id: p.id },
                    data: { sortOrder: index }
                })
            )
        );

        revalidatePath('/admin/products');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { error: 'Failed to reorder product' };
    }
}
