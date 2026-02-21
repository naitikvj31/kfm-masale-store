const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const p = await prisma.product.findMany({
    include: { variants: true },
    orderBy: { sortOrder: 'asc' }
  });
  p.forEach(prod => {
    console.log(`${prod.name} -> ${prod.variants.length} variants`);
  });
}
main().finally(() => prisma.$disconnect());
