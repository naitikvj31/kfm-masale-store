'use server';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-super-secret-key-for-kfm';
const key = new TextEncoder().encode(JWT_SECRET);

// Hardcoded for now per requirements
const STATIC_USER = {
    id: 1,
    email: 'natsvijay656@gmail.com',
    password: 'Naitik@123',
    name: 'Naitik Vijay',
};

// 1. Core Cryptography functions
export async function encrypt(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d') // Session lasts 7 days
        .sign(key);
}

export async function decrypt(input) {
    try {
        const { payload } = await jwtVerify(input, key, { algorithms: ['HS256'] });
        return payload;
    } catch (error) {
        return null;
    }
}

// 2. Session Management
export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get('kfm_consumer_session')?.value;
    if (!session) return null;
    return await decrypt(session);
}

// 3. User Login Action
export async function loginClient(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        return { error: 'Email and password are required' };
    }

    if (email === STATIC_USER.email && password === STATIC_USER.password) {
        // Create JWT & Set Cookie
        const sessionPayload = {
            id: STATIC_USER.id,
            email: STATIC_USER.email,
            name: STATIC_USER.name,
            role: 'customer'
        };
        const token = await encrypt(sessionPayload);

        const cookieStore = await cookies();
        cookieStore.set('kfm_consumer_session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
        });

        return { success: true };
    } else {
        return { error: 'Invalid email or password' };
    }
}

// 4. User Signup Action (Mock)
export async function signupClient(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!name || !email || !password) {
        return { error: 'All fields are required' };
    }

    // Usually we would hash password & save to Prisma DB here.
    // For now, instantly log them in as the static user.
    const sessionPayload = {
        id: STATIC_USER.id,
        email: email,
        name: name,
        role: 'customer'
    };
    const token = await encrypt(sessionPayload);

    const cookieStore = await cookies();
    cookieStore.set('kfm_consumer_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60
    });

    return { success: true };
}

// 5. Logout Action
export async function logoutClient() {
    const cookieStore = await cookies();
    cookieStore.delete('kfm_consumer_session');
    redirect('/login');
}
