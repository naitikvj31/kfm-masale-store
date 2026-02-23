import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Clearing old product catalog...');
    await prisma.product.deleteMany({});

    console.log('Inserting new exact catalog...');

    const products = [
        {
            name: 'Turmeric Powder',
            slug: 'turmeric-powder',
            description: 'Pure, organic turmeric powder.',
            isHotSeller: false,
            isNewArrival: false,
            variants: [
                { size: '500g', price: 170 },
                { size: '1kg', price: 320 }
            ]
        },
        {
            name: 'Tea Masale',
            slug: 'tea-masale',
            description: 'Aromatic and refreshing tea mix.',
            isHotSeller: false,
            isNewArrival: true,
            variants: [
                { size: '50g', price: 74, discountPrice: 60 }
            ]
        },
        {
            name: 'Tikhalal Chilli Powder',
            slug: 'tikhalal-chilli-powder',
            description: 'Spicy and vibrant chilli powder.',
            isHotSeller: false,
            isNewArrival: false,
            variants: [
                { size: '1kg', price: 430, discountPrice: 400 }
            ]
        },
        {
            name: 'Kashmiri Mirchi',
            slug: 'kashmiri-mirchi',
            description: 'Mildly spicy with a rich red color.',
            isHotSeller: false,
            isNewArrival: false,
            variants: [
                { size: '100g', price: 120 }
            ]
        },
        {
            name: 'Garam Masala',
            slug: 'garam-masala',
            description: 'Authentic Indian spice blend.',
            isHotSeller: false,
            isNewArrival: false,
            variants: [
                { size: '100g', price: 100 }
            ]
        },
        {
            name: 'Hing Powder',
            slug: 'hing-powder',
            description: 'Strong, aromatic asafoetida.',
            isHotSeller: true,
            isNewArrival: false,
            variants: [
                { size: '50g', price: 120 },
                { size: '100g', price: 200 }
            ]
        },
        {
            name: 'Dhaniya Powder',
            slug: 'dhaniya-powder',
            description: 'Freshly ground coriander powder.',
            isHotSeller: true,
            isNewArrival: false,
            variants: [
                { size: '500g', price: 130 },
                { size: '1kg', price: 260, discountPrice: 250 }
            ]
        },
        {
            name: 'Special mirch powder',
            slug: 'special-mirch-powder',
            description: 'Our special blend of spicy red chilli.',
            isHotSeller: true,
            isNewArrival: false,
            variants: [
                { size: '500g', price: 190 },
                { size: '1kg', price: 380, discountPrice: 360 }
            ]
        }
    ];

    for (const p of products) {
        await prisma.product.create({
            data: {
                name: p.name,
                slug: p.slug,
                description: p.description,
                isHotSeller: p.isHotSeller,
                isNewArrival: p.isNewArrival,
                variants: {
                    create: p.variants.map(v => ({
                        size: v.size,
                        price: v.price,
                        discountPrice: v.discountPrice || null,
                        stockQuantity: 100
                    }))
                }
            }
        });
        console.log(`- Added ${p.name}`);
    }

    console.log('Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
