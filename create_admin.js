const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createAdmin() {
    const email = 'admin@kfmmasale.com';
    const password = 'AnmolSahu@123';

    try {
        let admin = await prisma.user.findFirst({
            where: { email: email }
        });

        if (admin) {
            // If it exists, let's update password
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.user.update({
                where: { email: email },
                data: { password: hashedPassword, role: 'ADMIN', isVerified: true }
            });
            console.log(`Admin user ${email} updated successfully!`);
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            await prisma.user.create({
                data: {
                    name: 'Anmol Sahu (Admin)',
                    email: email,
                    password: hashedPassword,
                    role: 'ADMIN',
                    isVerified: true
                }
            });
            console.log(`Admin user ${email} created successfully!`);
        }

    } catch (error) {
        console.error("Error creating admin:", error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdmin();
