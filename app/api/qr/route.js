import QRCode from 'qrcode';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const upiLink = searchParams.get('upi');

    if (!upiLink) {
        return new NextResponse('Missing upi parameter', { status: 400 });
    }

    try {
        const qrBuffer = await QRCode.toBuffer(upiLink, {
            errorCorrectionLevel: 'H',
            margin: 1,
            color: {
                dark: '#2B5E2E', // Matches our primary brand color
                light: '#ffffff'
            }
        });

        return new NextResponse(qrBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=86400', // Cache for 1 day
            },
        });
    } catch (err) {
        return new NextResponse('Failed to generate QR', { status: 500 });
    }
}
