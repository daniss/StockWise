import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

interface User {
    id: string;
    name: string;
    email: string;
}

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const isLoginPage = req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register';
    if (isLoginPage && token) {
        console.log('redirecting to dashboard');
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (!token && !isLoginPage) {
        console.log('redirecting to login');
        return NextResponse.redirect(new URL('/login', req.url));
    }
    if (!token) {
        return NextResponse.next();
    }
    const response = await axios.get('http://localhost:8080/auth/verify', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (response.status !== 201) {
        console.log('invalid token');
        // clear the token
        const response = NextResponse.redirect(new URL('/login', req.url));
        response.cookies.set('token', '', { expires: new Date(0) });
        return response;
        // return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/register"],
};