'use server';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendVerificationEmail } from '@/lib/mail';

const secretKey = process.env.JWT_SECRET || 'super-secret-key-change-this-in-production';
const encodedKey = new TextEncoder().encode(secretKey);

// --- JWT Utilites ---
export async function encrypt(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

export async function decrypt(session) {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get('kfm_consumer_session')?.value;
    if (!session) return null;
    return await decrypt(session);
}

// --- Consumer Authentication ---

export async function loginClient(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        return { error: 'Email and password are required' };
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return { error: 'Invalid email or password' };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return { error: 'Invalid email or password' };
        }

        if (!user.isVerified) {
            return { error: 'Please verify your email before logging in. Check your inbox.' };
        }

        // Create JWT
        const sessionPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        };
        const token = await encrypt(sessionPayload);

        const cookieStore = await cookies();
        cookieStore.set('kfm_consumer_session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 // 7 days
        });

        return { success: true };
    } catch (error) {
        console.error("Login error:", error);
        return { error: 'An unexpected error occurred. Please try again later.' };
    }
}

export async function signupClient(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!name || !email || !password) {
        return { error: 'Name, email, and password are required' };
    }

    // Strict Password Validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
        return { error: 'Password must be at least 8 characters long, contain at least one uppercase letter, and one special character (e.g., @, #, $).' };
    }

    try {
        console.log("--- SIGNUP START ---");
        console.log("Prisma keys available:", prisma ? Object.keys(prisma).filter(k => k.startsWith('user') || !k.startsWith('$')) : "prisma is undefined");

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return { error: 'An account with this email already exists' };
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                isVerified: false // Must verify email first
            }
        });

        // Generate verification token
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        await prisma.verificationToken.create({
            data: {
                email: user.email,
                token,
                type: 'VERIFY_EMAIL',
                expiresAt
            }
        });

        // Send email
        await sendVerificationEmail(user.email, user.name, token);

        return { success: true, message: 'Account created! Please check your email to verify your account before logging in.' };
    } catch (error) {
        console.error("Signup error details:", error);
        return { error: error.message || 'Failed to create account. Please try again.' };
    }
}

export async function verifyEmailClient(token) {
    if (!token) return { error: "Verification token is missing." };

    try {
        const verificationToken = await prisma.verificationToken.findFirst({
            where: { token, type: 'VERIFY_EMAIL' }
        });

        if (!verificationToken) {
            return { error: "Invalid or expired token." };
        }

        if (new Date() > verificationToken.expiresAt) {
            return { error: "This verification link has expired. Please sign up again or request a new link." };
        }

        // Successfully found token, verify the user
        await prisma.user.update({
            where: { email: verificationToken.email },
            data: { isVerified: true }
        });

        // Delete the used token
        await prisma.verificationToken.delete({
            where: { id: verificationToken.id }
        });

        return { success: true, message: "Email verified successfully! You can now log in." };

    } catch (e) {
        console.error("Verification error:", e);
        return { error: "An error occurred during verification. Please try again." };
    }
}

export async function logoutClient() {
    const cookieStore = await cookies();
    cookieStore.delete('kfm_consumer_session');
    redirect('/login');
}
