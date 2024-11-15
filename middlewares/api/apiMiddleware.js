import { NextResponse } from "next/server";


export const apiMiddleware = (next) => {
    return async (request, _next) => {
        
        const pathname = request.nextUrl.pathname;
        if (pathname.startsWith("/api")) {
            console.log("API Control")
        }

        return next(request, _next);
    };
};