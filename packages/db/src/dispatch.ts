/**
 * Trigger a public-site rebuild after a write that affects public content.
 *
 * Fire-and-forget POST to GitHub's repository_dispatch API. The
 * `deploy-public.yml` workflow listens for `public-content-changed` and
 * rebuilds + rsyncs the static site to Hostinger.
 *
 * Set `BETTERMACHINE_DISPATCH_TOKEN` to a GitHub PAT with `repo:dispatch`
 * scope. Without it, this is a no-op (so local dev doesn't try to call
 * GitHub).
 */

export type DispatchResult =
  | { ok: true; status: number }
  | { ok: false; error: string };

export async function triggerPublicRebuild(
  payload: Record<string, unknown> = {}
): Promise<DispatchResult> {
  const token = process.env.BETTERMACHINE_DISPATCH_TOKEN;
  const repo = process.env.BETTERMACHINE_DISPATCH_REPO || "Better-Machine/bettermachine-website";

  if (!token) {
    return { ok: false, error: "BETTERMACHINE_DISPATCH_TOKEN not set" };
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "bettermachine-internal",
      },
      body: JSON.stringify({
        event_type: "public-content-changed",
        client_payload: payload,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `GitHub ${res.status}: ${text}` };
    }

    return { ok: true, status: res.status };
  } catch (e: any) {
    return { ok: false, error: e?.message || String(e) };
  }
}

/**
 * Fire-and-forget wrapper — call from API handlers after a successful write.
 * Logs failures to console but never throws. We don't want the admin write
 * to fail because GitHub is having a bad day; the deploy can be triggered
 * manually from the Actions tab.
 */
export function dispatchPublicRebuild(
  source: "project" | "agent",
  id: number | string
): void {
  triggerPublicRebuild({ source, id, ts: Date.now() })
    .then((r) => {
      if (!r.ok) {
        console.warn(`[dispatch] public rebuild failed (${source}/${id}): ${r.error}`);
      }
    })
    .catch((e) => {
      console.warn(`[dispatch] unexpected error: ${e?.message || e}`);
    });
}
