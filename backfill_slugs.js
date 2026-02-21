const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function generateSlug(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

async function main() {
    console.log('Starting slug backfill...');
    const products = await prisma.product.findMany();

    for (const product of products) {
        if (!product.slug) {
            const slug = generateSlug(product.name);
            console.log(`Updating product ${product.id} ("${product.name}") with slug: ${slug}`);
            await prisma.product.update({
                where: { id: product.id },
                data: { slug }
            });
        }
    }

    console.log('Slug backfill complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
