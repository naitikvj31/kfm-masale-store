const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Creating Special Mirch Powder...');

    const product = await prisma.product.create({
        data: {
            name: 'Special Mirch Powder',
            description: 'Handpicked and specially ground premium Kashmiri red chilli powder. Perfect for adding vibrant color and mild heat to your favorite dishes.',
            imageUrl: '/images/products/specmirch.jpeg',
            isActive: true,
            variants: {
                create: [
                    { size: '500g', price: 200, stockQuantity: 100 },
                    { size: '1kg', price: 380, stockQuantity: 100 }
                ]
            },
            images: {
                create: [
                    { url: '/images/products/specmirch.jpeg', sortOrder: 1 }
                ]
            }
        }
    });

    console.log('Created product:', product.name);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
