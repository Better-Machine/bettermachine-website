"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const STATUSES = ["draft", "published", "building", "research", "live", "mvp", "concept", "held"];

export function ProjectEditForm({
  project,
  agents,
  parentCandidates,
}: {
  project: any;
  agents: any[];
  parentCandidates: any[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: project.name,
    slug: project.slug,
    tagline: project.tagline || "",
    description: project.description || "",
    status: project.status,
    ownerAgent: project.ownerAgent || "",
    parentProjectId: project.parentProjectId ? String(project.parentProjectId) : "",
    isPublic: project.isPublic,
    overview: project.overview || "",
    heroImage: project.heroImage || "",
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
        const res = await fetch(`/api/projects/${project.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            parentProjectId: form.parentProjectId ? parseInt(form.parentProjectId) : null,
          }),
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
      <Field label="Name">
        <input
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputCls}
          required
        />
      </Field>

      <Field label="Slug" hint="kebab-case, lowercase, no spaces">
        <input
          value={form.slug}
          onChange={(e) => update("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
          className={`${inputCls} font-mono`}
          required
        />
      </Field>

      <Field label="Tagline">
        <input
          value={form.tagline}
          onChange={(e) => update("tagline", e.target.value)}
          className={inputCls}
          maxLength={200}
        />
      </Field>

      <Field label="Description">
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          rows={3}
          className={inputCls}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Status">
          <select
            value={form.status}
            onChange={(e) => update("status", e.target.value)}
            className={inputCls}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>

        <Field label="Owner">
          <select
            value={form.ownerAgent}
            onChange={(e) => update("ownerAgent", e.target.value)}
            className={inputCls}
          >
            <option value="">— unassigned —</option>
            {agents.map((a) => (
              <option key={a.username} value={a.username}>
                {a.name} (@{a.username})
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Parent project" hint="if this is a spark under a larger project">
        <select
          value={form.parentProjectId}
          onChange={(e) => update("parentProjectId", e.target.value)}
          className={inputCls}
        >
          <option value="">— none —</option>
          {parentCandidates.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.slug})
            </option>
          ))}
        </select>
      </Field>

      <Field label="Hero image URL">
        <input
          value={form.heroImage}
          onChange={(e) => update("heroImage", e.target.value)}
          className={inputCls}
          placeholder="/projects/foo/hero.jpg"
        />
      </Field>

      <Field label="Overview" hint="long-form description shown on detail page">
        <textarea
          value={form.overview}
          onChange={(e) => update("overview", e.target.value)}
          rows={6}
          className={inputCls}
        />
      </Field>

      <label className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={form.isPublic}
          onChange={(e) => update("isPublic", e.target.checked)}
        />
        <span>Public (visible on bettermachine.ai)</span>
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
          href="/internal/admin/projects"
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
