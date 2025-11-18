import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { checkServerSession } from "./lib/api/serverApi";
import { parse } from "cookie";

const privateRoutes = ['/profile', "/profile/edit", "/stories/create", "/stories/edit"];
const publicRoutes = ['/auth/register', '/auth/login', "/travellers", "/stories/:path*"];

export async function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname)
  const cookieStore = await cookies()
  const { pathname } = request.nextUrl
  const accessToken = cookieStore.get("accessToken")?.value
  const refreshToken = cookieStore.get("refreshToken")?.value
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  if (!accessToken) {
    if (refreshToken) {
      const res = await checkServerSession()
      const resCookie = res?.headers?.['set-cookie']
      if (resCookie) {
        const cookieArray = Array.isArray(resCookie) ? resCookie : [resCookie]
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr)
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed['Max-Age']),
          }
          if (parsed.accessToken) NextResponse.next().cookies.set("accessToken", parsed.accessToken, options)
          if (parsed.refreshToken) NextResponse.next().cookies.set("refreshToken", parsed.refreshToken, options)
        }

        if (isPublicRoute) {
          return NextResponse.redirect(new URL("/", request.url), {
            headers: {
              Cookie: cookieStore.toString()
            }
          })
        }
        if (isPrivateRoute) {
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString()
            }
          })
        }
      }
    }
    if (isPublicRoute) {
      return NextResponse.next()
    }
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }
  if (isPrivateRoute) {
    return NextResponse.next()
  }
  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/auth/login', '/auth/register', "/stories/:path*", "/travellers/:path*"],
};