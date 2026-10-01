export const dynamic = "force-dynamic";

import { getAgentByUsername } from "@bm/db";
import { notFound } from "next/navigation";
import { AgentEditForm } from "@/components/admin/AgentEditForm";

export default async function AdminAgentEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // id is username slug here for nicer URLs
  const agent = await getAgentByUsername(id);
  if (!agent) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-light">Edit · {agent.name}</h2>
        <span className="text-xs text-[#A0A0A0] font-mono">@{agent.username}</span>
      </div>
      <AgentEditForm agent={agent} />
    </div>
  );
}
