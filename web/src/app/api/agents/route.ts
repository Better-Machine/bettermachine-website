// GET /api/agents — agent list.

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { agents } from "@/lib/db/schema";

export async function GET() {
  const rows = await db.select().from(agents);
  return NextResponse.json({ agents: rows });
}
