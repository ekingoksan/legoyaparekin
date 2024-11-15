import {
  NextFetchEvent,
  NextRequest,
  NextResponse
} from "next/server";

import { cookies } from "next/headers";

export const authMiddleware = (next) => {
  return async (request, _next) => {
    const pathname = request.nextUrl.pathname;

    // kontrol edilmeyecek dizinler
    const files = [
      "/admin",
      "/api",
      "/_next/static",
      "/images",
      "/favicon.ico",
      "/manifest.json",
      "/robots.txt",
      "/js",
      "/css"
    ]

    // pathname.startsWith files içersinde değilse
    if(!files.some(file => pathname.startsWith(file))) {
      console.log(pathname)
    }
  
    // if (!pathname.startsWith("/admin") && !pathname.startsWith("/api") && !pathname.startsWith("/_next/static") && !pathname.startsWith("/images") && !pathname.startsWith("/favicon.ico") && !pathname.startsWith("/manifest.json") && !pathname.startsWith("/robots.txt") && !pathname.startsWith("/js")) {
    //   console.log("--------- Auth Middleware ---------")
    //   console.log(pathname)
    // }
  };
};