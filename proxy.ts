import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    // Check if we are protecting the specific route
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const adminToken = request.cookies.get('admin_token')

        // If cookie is missing or invalid (simple check), redirect to login
        if (!adminToken || adminToken.value !== 'authenticated') {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
