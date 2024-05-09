import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "../route";

export function middleware(request){
    const {nextUrl} =request;
    const accessToken=request.cookies.get("access_token")?true:false;
    const refreshToken=request.cookies.get("refresh_token")?true:false;
    let isLoggedIn=accessToken && refreshToken; 
   
     const isApiAuthRoute= nextUrl.pathname.startsWith(apiAuthPrefix);
    //  const isPublic=publicRoutes.includes(nextUrl.pathname);
     const isPublic=isPublicRoute(nextUrl.pathname)
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

     function isPublicRoute(url) {
      return publicRoutes.some(route => {
          if (typeof route === 'string') {
            return route === url;
          } else if (route instanceof RegExp) {
              return route.test(url);
          }
          return false;
      });
  }
      return;
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  } 