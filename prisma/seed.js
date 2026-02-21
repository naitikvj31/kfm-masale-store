const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const productsToSeed = [
    {
        name: 'Masale Special Turmeric Powder',
        desc: 'Premium quality turmeric with high curcumin content, carefully processed for vibrant color and authentic flavor.',
        images: ['/images/products/turme1.jpeg']
    },
    {
        name: 'Masale Tea',
        desc: 'A fragrant blend of select spices crafted to elevate your daily cup of chai with rich, warming notes.',
        images: ['/images/products/tea.jpeg']
    },
    {
        name: 'Tikhalal Chilli Powder',
        desc: 'Bold and fiery red chilli powder made from handpicked chillies for an intense kick in every dish.',
        images: ['/images/products/tikhalal1.jpeg', '/images/products/chilli.jpeg']
    },
    {
        name: 'Kashmiri Mirchi',
        desc: 'Mild heat with deep, natural red color — perfect for gravies, tandoori dishes, and biryanis.',
        images: ['/images/products/Kashmiri.jpeg', '/images/products/kashmiri2.jpeg']
    },
    {
        name: 'Garam Masala',
        desc: 'An aromatic blend of whole spices, stone-ground for everyday Indian cooking with authentic homestyle taste.',
        images: ['/images/products/garam.jpeg']
    },
    {
        name: 'Hing Powder',
        desc: 'Pure asafoetida with a sharp, savory aroma — a tiny pinch transforms your dals and vegetable dishes.',
        images: ['/images/products/hing2.jpeg', '/images/products/hing3.jpeg']
    },
    {
        name: 'Dhaniya Powder',
        desc: 'Finely ground coriander seeds with a citrusy, earthy fragrance — a staple for every Indian kitchen.',
        images: ['/images/products/dhaniya1.jpeg']
    },
    {
        name: 'Coriander Powder',
        desc: 'Premium coriander seeds, roasted and ground fresh for maximum aroma and rich, warm flavor.',
        images: ['/images/products/cori1.jpeg']
    }
];

const variantsTemplate = [
    { size: '50g', priceMultiplier: 0.5 },
    { size: '100g', priceMultiplier: 1.0 },
    { size: '250g', priceMultiplier: 2.2 },
    { size: '500g', priceMultiplier: 4.0 },
    { size: '1kg', priceMultiplier: 7.5 }
];

// Base prices (₹ per 100g) for each product
const basePrices = [45, 60, 55, 70, 65, 90, 40, 42];

async function main() {
    console.log('Clearing existing data...');

    // Clear in order to respect foreign keys
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.variant.deleteMany();
    await prisma.product.deleteMany();

    console.log('Seeding products...');

    for (let i = 0; i < productsToSeed.length; i++) {
        const item = productsToSeed[i];
        const basePrice = basePrices[i];

        const createdProduct = await prisma.product.create({
            data: {
                name: item.name,
                description: item.desc,
                variants: {
                    create: variantsTemplate.map(v => ({
                        size: v.size,
                        price: Math.round(basePrice * v.priceMultiplier),
                        stockQuantity: 100
                    }))
                }
            }
        });

        if (item.images && item.images.length > 0) {
            for (let j = 0; j < item.images.length; j++) {
                await prisma.productImage.create({
                    data: {
                        productId: createdProduct.id,
                        url: item.images[j],
                        sortOrder: j
                    }
                });
            }
        }
    }

    console.log('Seeding finished — 8 products with 5 variants each and corresponding images.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
