const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const prisma = new PrismaClient();

async function testSignup() {
    try {
        console.log("Starting debug signup...");
        const password = "TestPassword@123";
        const email = "testdebug@example.com";
        const name = "Test User";

        console.log("1. Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("2. Creating User in DB...");
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                isVerified: false
            }
        });
        console.log("User created:", user.id);

        console.log("3. Generating Token...");
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        console.log("4. Creating Verification Token in DB...");
        await prisma.verificationToken.create({
            data: {
                email: user.email,
                token,
                type: 'VERIFY_EMAIL',
                expiresAt
            }
        });
        console.log("Token created successfully.");

        console.log("Done.");
    } catch (e) {
        console.error("DEBUG ERROR:", e);
    } finally {
        await prisma.$disconnect();
    }
}

testSignup();
