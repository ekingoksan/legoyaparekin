import {NextResponse} from "next/server"; 
import { cookies } from "next/headers";
import { adminRoutes } from "@/routes/admin/routes";
import { apiRoutes } from "@/routes/api/routes";
  
  export const adminMiddleware = async (next) => {
    try {
      return async(request, _next) => {
        const pathname = request.nextUrl.pathname;

        const adminFiles = [
          "/admin",
        ]
        
        if (adminFiles.some(file => pathname.startsWith(file))) {
          const userCookie = cookies(request.headers).get("user");
    
          if (!userCookie && pathname !== adminRoutes.login) {
              return NextResponse.redirect(`${process.env.SITE_URL}${adminRoutes.login}`)
          }

          // if (!userCookie && pathname === adminRoutes.logout) {
          //     return NextResponse.redirect(`${process.env.SITE_URL}${adminRoutes.login}`)
          // }

          const adminControl = await fetch(`${process.env.SITE_URL}${apiRoutes.adminAuthControl}`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ userToken: userCookie }),
          }).then((res) => res.json());

          // Admin Control
          if (!adminControl.isAdmin && pathname !== adminRoutes.login) {
              return NextResponse.redirect(`${process.env.SITE_URL}${adminRoutes.login}`)
          }
      
          // Admin Control
          if(pathname === adminRoutes.login && adminControl.isAdmin) {
              return NextResponse.redirect(`${process.env.SITE_URL}${adminRoutes.dashboard}`)
          }    
        }

      return next(request, _next);
    };
    } catch (error) {
      console.log("ERROR", error)
    }
  };