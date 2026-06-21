import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function middleware(req) {
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET})

    if (token && req.nextUrl.pathname === "/user-auth") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (!token && req.nextUrl.pathname !== "/user-auth") {
        return NextResponse.redirect(new URL("/user-auth", req.url));
    
    }

    return NextResponse.next();
}

// ye matcher humne isliye banaya hai taki yeh middleware sirf in routes pe hi lage
export const config = {
    matcher: ["/", "/user-auth"]  
}