import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const { password } = await req.json();
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

        if (password === adminPassword) {
            // Set simple auth cookie for middleware to check
            const cookieStore = cookies();
            (await cookieStore).set('admin_token', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 // 1 day
            });

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
