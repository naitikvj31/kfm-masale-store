const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    const products = await prisma.product.findMany({
        include: { variants: true },
        orderBy: { sortOrder: 'asc' }
    });
    console.log("Current DB State:");
    products.forEach(p => {
        console.log(`Product: "${p.name}" - Variants: ${p.variants.length}`);
        if (p.variants.length > 0) {
            console.log("  => " + p.variants.map(v => v.size).join(', '));
        }
    });
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
