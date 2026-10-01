export const dynamic = "force-dynamic";

import { getAuditLog } from "@bm/db";

export default async function AdminAuditLog() {
  const entries = await getAuditLog(100);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light">Audit Log</h2>
      <p className="text-sm text-[#A0A0A0]">
        Most recent {entries.length} edits across projects and agents.
      </p>

      <div className="bg-white/[0.03] border border-white/10 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.02] text-xs uppercase tracking-widest text-[#A0A0A0]">
            <tr>
              <th className="text-left p-3">When</th>
              <th className="text-left p-3">Actor</th>
              <th className="text-left p-3">Entity</th>
              <th className="text-left p-3">Action</th>
              <th className="text-left p-3">Fields</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e: any) => {
              let fields: string[] = [];
              if (e.changes) {
                try {
                  const parsed = JSON.parse(e.changes);
                  fields = Object.keys(parsed);
                } catch {}
              }
              return (
                <tr key={e.id} className="border-t border-white/5">
                  <td className="p-3 text-xs text-[#A0A0A0] whitespace-nowrap">
                    {new Date(e.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="p-3 font-mono text-xs">{e.actor}</td>
                  <td className="p-3 text-[#A0A0A0]">
                    {e.entity} #{e.entityId}
                  </td>
                  <td className="p-3">
                    <span className="text-xs uppercase tracking-widest">{e.action}</span>
                  </td>
                  <td className="p-3 text-xs text-[#A0A0A0]">
                    {fields.length > 0 ? fields.join(", ") : "—"}
                  </td>
                </tr>
              );
            })}
            {entries.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[#A0A0A0]">
                  No edits yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
