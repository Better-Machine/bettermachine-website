import { NextRequest, NextResponse } from "next/server";
import { getAuditLog } from "@bm/db";

function ensurePrivate(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const allowed = ["private.bettermachine.ai", "192.168.50.32", "100.69.226.55", "localhost", "127.0.0.1"];
  if (!allowed.some((h) => host.includes(h))) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  return null;
}

export async function GET(req: NextRequest) {
  const gate = ensurePrivate(req);
  if (gate) return gate;
  const entries = await getAuditLog(100);
  return NextResponse.json(entries);
}
