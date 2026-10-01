export const dynamic = "force-dynamic";

import { getAllProjects, getAllAgents } from "@/lib/db/queries";
import Link from "next/link";

export default async function AdminProjectsList() {
  const [projects, agents] = await Promise.all([getAllProjects(), getAllAgents()]);

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-light">Projects</h2>
        <span className="text-xs text-[#A0A0A0]">{projects.length} total</span>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.02] text-xs uppercase tracking-widest text-[#A0A0A0]">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Slug</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Owner</th>
              <th className="text-left p-4">Public</th>
              <th className="text-left p-4">Updated</th>
              <th className="text-right p-4"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-[#A0A0A0] font-mono text-xs">{p.slug}</td>
                <td className="p-4">
                  <span className="text-xs uppercase tracking-widest">{p.status}</span>
                </td>
                <td className="p-4 text-[#A0A0A0]">{p.ownerAgent || "—"}</td>
                <td className="p-4">{p.isPublic ? "yes" : "no"}</td>
                <td className="p-4 text-[#A0A0A0] text-xs">
                  {new Date(p.updatedAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <Link
                    href={`/internal/admin/projects/${p.id}`}
                    className="text-[#B87333] hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
