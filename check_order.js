const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const order = await prisma.order.findUnique({
        where: { id: 1 }
    });
    console.log(order);
}
main().catch(console.error).finally(() => prisma.$disconnect());
