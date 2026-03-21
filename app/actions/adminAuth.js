'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function loginAdmin(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        return { error: 'Email and password are required' };
    }

    try {
        // Query the database directly for this an Admin user
        const adminUser = await prisma.user.findFirst({
            where: {
                email: email,
                role: 'ADMIN'
            }
        });

        if (!adminUser) {
            return { error: 'Invalid admin email or password' };
        }

        // Securely compare hashes
        const passwordMatch = await bcrypt.compare(password, adminUser.password);

        if (!passwordMatch) {
            return { error: 'Invalid admin email or password' };
        }

        // Successfully authenticated! Set secure Admin Token
        const cookieStore = await cookies();
        cookieStore.set('admin_token', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 // 7 days
        });

        return { success: true };

    } catch (error) {
        console.error("Admin Login Error:", error);
        return { error: 'Database connection error. Try again.' };
    }
}
