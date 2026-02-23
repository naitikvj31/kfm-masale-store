import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const products = await prisma.product.findMany({
    select: { name: true, isHotSeller: true, isNewArrival: true }
  });
  console.log(JSON.stringify(products, null, 2));
}
run();
