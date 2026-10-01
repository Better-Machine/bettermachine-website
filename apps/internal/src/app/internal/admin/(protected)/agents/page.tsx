export const dynamic = "force-dynamic";

import { getAllAgents } from "@bm/db";
import Link from "next/link";

export default async function AdminAgentsList() {
  const agents = await getAllAgents();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light">Agents</h2>
      <div className="bg-white/[0.03] border border-white/10 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.02] text-xs uppercase tracking-widest text-[#A0A0A0]">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Username</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Published</th>
              <th className="text-right p-4"></th>
            </tr>
          </thead>
          <tbody>
            {agents.map((a) => (
              <tr key={a.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                <td className="p-4 font-medium">{a.name}</td>
                <td className="p-4 text-[#A0A0A0] font-mono text-xs">{a.username}</td>
                <td className="p-4 text-[#A0A0A0]">{a.role}</td>
                <td className="p-4">{a.isPublished ? "yes" : "draft"}</td>
                <td className="p-4 text-right">
                  <Link href={`/internal/admin/agents/${a.id}`} className="text-[#B87333] hover:underline">
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
