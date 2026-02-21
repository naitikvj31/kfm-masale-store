'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'kfm123';

export async function login(formData) {
    const passcode = formData.get('passcode');

    if (passcode === ADMIN_PASSCODE) {
        const cookieStore = await cookies();
        cookieStore.set('admin_token', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });
        return { success: true };
    } else {
        return { success: false, error: 'Invalid passcode' };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_token');
    redirect('/admin/login');
}
