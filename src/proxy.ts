import NextAuth from "next-auth"

import { NextResponse } from "next/server";
import authConfig from "./lib/auth-config";

const { auth } = NextAuth(authConfig)
export default auth(async function proxy(req) {
    const isLoggedIn = !!req.auth;
    console.log(isLoggedIn);
    
    // console.log(req.auth, 'auth from middleware');

    // if (!isLoggedIn) {
    //     return NextResponse.redirect(new URL('/login', req.url))
    // }
    return NextResponse.next();
})

export const config = {
    matcher: ['/((?!_next|api/auth).*)']
};
