const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating stock quantity for all variants to 5000...');

  const result = await prisma.variant.updateMany({
    data: {
      stockQuantity: 5000
    }
  });

  console.log(`Successfully updated ${result.count} variants.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
