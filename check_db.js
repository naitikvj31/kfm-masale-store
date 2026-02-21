const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const products = await prisma.product.findMany({
    include: { variants: true },
    orderBy: { sortOrder: 'asc' }
  });
  products.forEach(p => {
    console.log(`Product: ${p.name} - Variants: ${p.variants.length}`);
  });
}
main().catch(console.error).finally(() => prisma.$disconnect());
