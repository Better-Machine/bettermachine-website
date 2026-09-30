// Hostname-based route gating. Defense-in-depth: Cloudflare already
// routes by hostname, but if the build artifact is ever served on the
// public hostname, the private routes must not render.
//
// Private routes: /pmo, /internal, /api/pmo
// Private hosts: private.bettermachine.ai, 192.168.50.32

import { NextRequest, NextResponse } from "next/server";

const PRIVATE_HOSTS = ["private.bettermachine.ai", "192.168.50.32"];
const PRIVATE_PATHS = ["/pmo", "/internal", "/api/pmo"];

export function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";
  let path = req.nextUrl.pathname;
  // Strip trailing slash for matching so we don't double-trigger.
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  const isPrivatePath = PRIVATE_PATHS.some((p) => path === p || path.startsWith(`${p}/`));
  if (!isPrivatePath) return NextResponse.next();

  const onPrivateHost = PRIVATE_HOSTS.some((h) => host.includes(h));
  if (!onPrivateHost) {
    // Rewrite to a 404 page rather than 403 so the route shape doesn't leak.
    return NextResponse.rewrite(new URL("/_private-blocked", req.url));
  }
  return NextResponse.next();
}

export const config = {
  // Match with optional trailing slash.
  matcher: ["/pmo/:path*", "/pmo", "/internal/:path*", "/internal", "/api/pmo/:path*", "/api/pmo"],
};
