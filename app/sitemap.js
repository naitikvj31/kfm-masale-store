import { PrismaClient } from '@prisma/client';

export default async function sitemap() {
    const prisma = new PrismaClient();
    const baseUrl = 'https://kfmmasale.com';

    try {
        const products = await prisma.product.findMany({
            where: { isActive: true },
            select: { slug: true, updatedAt: true },
        });

        const productUrls = products.map((product) => ({
            url: `${baseUrl}/product/${product.slug}`,
            lastModified: product.updatedAt,
            changeFrequency: 'weekly',
            priority: 0.8,
        }));

        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1,
            },
            {
                url: `${baseUrl}/login`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.5,
            },
            {
                url: `${baseUrl}/signup`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.5,
            },
            {
                url: `${baseUrl}/checkout`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.5,
            },
            {
                url: `${baseUrl}/privacy-policy`,
                lastModified: new Date(),
                changeFrequency: 'yearly',
                priority: 0.3,
            },
            {
                url: `${baseUrl}/terms-and-conditions`,
                lastModified: new Date(),
                changeFrequency: 'yearly',
                priority: 0.3,
            },
            {
                url: `${baseUrl}/refund-policy`,
                lastModified: new Date(),
                changeFrequency: 'yearly',
                priority: 0.3,
            },
            {
                url: `${baseUrl}/shipping-policy`,
                lastModified: new Date(),
                changeFrequency: 'yearly',
                priority: 0.3,
            },
            // Admin area excluded
            ...productUrls,
        ];
    } catch (error) {
        // Fallback if DB is unavailable during build
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
            },
        ];
    }
}
