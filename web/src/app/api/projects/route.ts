// GET /api/projects — full project list (PMO source).
// Optional filter: ?owner=ray|liz|woodhouse|eames
// Optional include held: ?includeHeld=true (default false on public host)

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const owner = req.nextUrl.searchParams.get("owner");
  const includeHeld = req.nextUrl.searchParams.get("includeHeld") === "true";

  let rows;
  if (owner) {
    rows = await db.select().from(projects).where(eq(projects.ownerAgent, owner));
  } else {
    rows = await db.select().from(projects);
  }

  if (!includeHeld) {
    rows = rows.filter((p) => p.status !== "held");
  }

  return NextResponse.json({ projects: rows });
}
