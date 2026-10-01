import { NextRequest, NextResponse } from "next/server";
import { getProjectById, updateProject, dispatchPublicRebuild } from "@bm/db";

function getActor(req: NextRequest): string {
  // Basic auth user from header (we already validated in proxy.ts)
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
  const project = await getProjectById(parseInt(id));
  if (!project) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const gate = ensurePrivate(req);
  if (gate) return gate;
  const { id } = await params;
  const body = await req.json();

  const allowed: Record<string, true> = {
    name: true, slug: true, tagline: true, description: true, status: true,
    heroImage: true, overview: true, metrics: true, techStack: true,
    ownerAgent: true, parentProjectId: true, isPublic: true, publishedAt: true,
  };
  const patch: Record<string, any> = {};
  for (const k of Object.keys(body)) {
    if (allowed[k]) patch[k] = body[k];
  }

  try {
    const updated = await updateProject(parseInt(id), patch, getActor(req), req.headers.get("x-forwarded-for") || undefined);
    // Public content changed — kick off a public-site rebuild (fire-and-forget).
    dispatchPublicRebuild("project", parseInt(id));
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
