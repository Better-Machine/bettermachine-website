"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function AgentEditForm({ agent }: { agent: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: agent.name,
    role: agent.role,
    bio: agent.bio || "",
    avatar: agent.avatar || "",
    skills: agent.skills || "",
    githubUrl: agent.githubUrl || "",
    twitterUrl: agent.twitterUrl || "",
    linkedinUrl: agent.linkedinUrl || "",
    isPublished: agent.isPublished,
  });

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    startTransition(async () => {
      try {
        const res = await fetch(`/api/agents/${agent.username}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j.error || `Save failed (${res.status})`);
        }
        setSaved(true);
        router.refresh();
      } catch (err: any) {
        setError(err.message || "Save failed");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
      <Field label="Display name">
        <input
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputCls}
          required
        />
      </Field>

      <Field label="Role">
        <input
          value={form.role}
          onChange={(e) => update("role", e.target.value)}
          className={inputCls}
          required
        />
      </Field>

      <Field label="Bio">
        <textarea
          value={form.bio}
          onChange={(e) => update("bio", e.target.value)}
          rows={4}
          className={inputCls}
        />
      </Field>

      <Field label="Avatar URL">
        <input
          value={form.avatar}
          onChange={(e) => update("avatar", e.target.value)}
          className={inputCls}
        />
      </Field>

      <Field label="Skills" hint="comma-separated">
        <input
          value={form.skills}
          onChange={(e) => update("skills", e.target.value)}
          className={inputCls}
          placeholder="TypeScript, Next.js, Drizzle"
        />
      </Field>

      <div className="grid grid-cols-3 gap-4">
        <Field label="GitHub">
          <input
            value={form.githubUrl}
            onChange={(e) => update("githubUrl", e.target.value)}
            className={inputCls}
            placeholder="https://github.com/…"
          />
        </Field>
        <Field label="Twitter">
          <input
            value={form.twitterUrl}
            onChange={(e) => update("twitterUrl", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="LinkedIn">
          <input
            value={form.linkedinUrl}
            onChange={(e) => update("linkedinUrl", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <label className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={form.isPublished}
          onChange={(e) => update("isPublished", e.target.checked)}
        />
        <span>Published (visible on bettermachine.ai)</span>
      </label>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm p-3 rounded">
          {error}
        </div>
      )}
      {saved && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm p-3 rounded">
          Saved. Changes are live immediately.
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2 bg-[#B87333] text-[#0A0A0A] font-medium hover:bg-[#B87333]/90 disabled:opacity-50"
        >
          {isPending ? "Saving…" : "Save changes"}
        </button>
        <a
          href="/internal/admin/agents"
          className="px-5 py-2 border border-white/10 text-[#A0A0A0] hover:text-[#FAFAFA]"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-widest text-[#A0A0A0] mb-2">{label}</div>
      {children}
      {hint && <div className="text-xs text-[#A0A0A0] mt-1">{hint}</div>}
    </label>
  );
}

const inputCls =
  "w-full bg-white/[0.03] border border-white/10 rounded px-3 py-2 text-sm text-[#FAFAFA] focus:border-[#B87333]/50 focus:outline-none";
