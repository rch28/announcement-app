import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "../route";

export function middleware(request){
    const {nextUrl} =request;
    const isLoggedIn=request.cookies.get("access_token")?true:false;
    
     const isApiAuthRoute= nextUrl.pathname.startsWith(apiAuthPrefix);
     const isPublic=publicRoutes.includes(nextUrl.pathname);
     const isAuthRoute=authRoutes.includes(nextUrl.pathname);
     if(isApiAuthRoute){
         return;
        }
     
     if(isAuthRoute){
       if(isLoggedIn){
         return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
       }
       return;
     }
     if(!isLoggedIn && !isPublic){
       return Response.redirect(new URL("/auth/login", nextUrl));
     }
      return;
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  } 