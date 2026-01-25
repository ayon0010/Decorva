import NextAuth from "next-auth"

import { NextResponse } from "next/server";
import authConfig from "./lib/auth-config";

const { auth } = NextAuth(authConfig)
export default auth(async function proxy(req) {
    const isLoggedIn = !!req.auth;
    const protectedRoutes = ['/my-account'];
    const pathName = req.nextUrl.pathname;

    if (protectedRoutes.includes(pathName) && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (pathName === '/login' && isLoggedIn) {
        return NextResponse.redirect(new URL('/my-account', req.url))
    }

    // console.log(req.auth, 'auth from middleware');

    // if (!isLoggedIn) {
    //     return NextResponse.redirect(new URL('/login', req.url))
    // }
    return NextResponse.next();
})

export const config = {
    matcher: ['/((?!_next|api/auth).*)']
};
