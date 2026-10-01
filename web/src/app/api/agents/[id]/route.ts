import { NextRequest, NextResponse } from "next/server";
import { getAgentByUsername, updateAgent } from "@/lib/db/queries";

function getActor(req: NextRequest): string {
  const auth = req.headers.get("authorization") || "";
  const decoded = Buffer.from(auth.replace(/^Basic\s+/, ""), "base64").toString();
  return decoded.split(":")[0] || "admin";
}

function ensurePrivate(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const allowed = ["private.bettermachine.ai", "192.168.50.32", "100.69.226.55", "localhost", "127.0.0.1"];
  if (!allowed.some((h) => host.includes(h))) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  return null;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const gate = ensurePrivate(req);
  if (gate) return gate;
  const { id } = await params;
  const agent = await getAgentByUsername(id);
  if (!agent) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(agent);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const gate = ensurePrivate(req);
  if (gate) return gate;
  const { id } = await params;
  const body = await req.json();

  // Resolve agent by username first
  const existing = await getAgentByUsername(id);
  if (!existing) return NextResponse.json({ error: "not found" }, { status: 404 });

  const allowed: Record<string, true> = {
    name: true, role: true, bio: true, avatar: true, skills: true,
    githubUrl: true, twitterUrl: true, linkedinUrl: true, isPublished: true,
  };
  const patch: Record<string, any> = {};
  for (const k of Object.keys(body)) {
    if (allowed[k]) patch[k] = body[k];
  }

  try {
    const updated = await updateAgent(existing.id, patch, getActor(req), req.headers.get("x-forwarded-for") || undefined);
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
