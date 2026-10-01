import { NextRequest, NextResponse } from "next/server";

const PRIVATE_HOSTS = ["private.bettermachine.ai", "192.168.50.32", "100.69.226.55", "localhost", "127.0.0.1"];
const ADMIN_PATH = /^\/internal\/admin/;

export function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl;

  // /internal/admin — only on private hostname
  if (ADMIN_PATH.test(url.pathname)) {
    const isPrivate = PRIVATE_HOSTS.some((h) => host.includes(h));
    if (!isPrivate) {
      return NextResponse.rewrite(new URL("/404-private", req.url));
    }

    // Basic auth check
    const authUser = process.env.ADMIN_BASIC_AUTH_USER;
    const authPass = process.env.ADMIN_BASIC_AUTH_PASS;
    if (authUser && authPass) {
      const header = req.headers.get("authorization") || "";
      const expected = "Basic " + Buffer.from(`${authUser}:${authPass}`).toString("base64");
      if (header !== expected) {
        return new NextResponse("Authentication required", {
          status: 401,
          headers: { "WWW-Authenticate": 'Basic realm="admin"' },
        });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/internal/:path*"],
};
