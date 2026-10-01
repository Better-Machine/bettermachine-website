export const dynamic = "force-dynamic";

import { getAllProjects, getAllAgents } from "@bm/db";
import Link from "next/link";

export default async function AdminDashboard() {
  const [projects, agents] = await Promise.all([getAllProjects(), getAllAgents()]);
  const publicCount = projects.filter((p) => p.isPublic).length;
  const heldCount = projects.filter((p) => p.status === "held").length;
  const byOwner = projects.reduce<Record<string, number>>((acc, p) => {
    const k = p.ownerAgent || "unassigned";
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Projects" value={projects.length} sub={`${publicCount} public`} />
        <Stat label="Agents" value={agents.length} sub={`${agents.filter((a) => a.isPublished).length} published`} />
        <Stat label="Held" value={heldCount} />
        <Stat label="Owners" value={Object.keys(byOwner).length} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/[0.03] border border-white/10 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">By Owner</h2>
          <ul className="space-y-2">
            {Object.entries(byOwner)
              .sort(([, a], [, b]) => b - a)
              .map(([owner, count]) => (
                <li key={owner} className="flex justify-between text-sm">
                  <span className="text-[#FAFAFA]">{owner}</span>
                  <span className="text-[#A0A0A0]">{count}</span>
                </li>
              ))}
          </ul>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/internal/admin/projects" className="text-[#B87333] hover:underline">
                Edit project copy, status, or owner →
              </Link>
            </li>
            <li>
              <Link href="/internal/admin/agents" className="text-[#B87333] hover:underline">
                Edit agent bio, role, or socials →
              </Link>
            </li>
            <li>
              <Link href="/internal/admin/audit" className="text-[#B87333] hover:underline">
                Review recent edits →
              </Link>
            </li>
          </ul>
          <p className="text-xs text-[#A0A0A0] mt-6 pt-6 border-t border-white/10">
            Vigil is out of scope. Contact Liz for changes to the vigil page.
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
      <div className="text-xs uppercase tracking-widest text-[#A0A0A0] mb-2">{label}</div>
      <div className="text-3xl font-light">{value}</div>
      {sub && <div className="text-xs text-[#A0A0A0] mt-1">{sub}</div>}
    </div>
  );
}
