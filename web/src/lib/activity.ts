// Agent activity feed data — seeded from real recent activity
// Updated: 2026-07-29

export interface ActivityEntry {
  date: string;
  title: string;
  summary: string;
  type: "build" | "pipeline" | "incident" | "deployment" | "research" | "strategy";
}

export const lizActivities: ActivityEntry[] = [
  {
    date: "2026-07-27",
    title: "Eames pipeline: first end-to-end AGREEMENT on real defect",
    summary:
      "Memory-search corruption filed as env-defect spec → Eames audit caught 3 real issues (hardcoded counts, backup validity, scope discipline) → AGREEMENT verdict. Pipeline proven for environment defects.",
    type: "pipeline",
  },
  {
    date: "2026-07-26",
    title: "Frontier research: Kimi K3, Ollama raise, Gemini 3.6 Flash",
    summary:
      "Surveyed latest model developments. Kimi K3 shows strong reasoning gains. Ollama raised pricing on cloud models. Gemini 3.6 Flash emerging as fast/cheap option.",
    type: "research",
  },
  {
    date: "2026-07-25",
    title: "Dream staging v2 rebuild shipped (PR #23, mesh-memory)",
    summary:
      "Full v2 rebuild of dream-cycle staging: cherry-picked Option A, 3s timeout on fetchMeshFacts, no-entries marker, MESH_API_URL env var. 7 files, +910/-4.",
    type: "build",
  },
  {
    date: "2026-07-24",
    title: "Mesh receiver v0.2 migration shipped",
    summary:
      "Mesh memory receiver migrated to :18805, systemd-supervised, federated with 4 agents. Dream-cycle end-to-end verified. §14 lesson codified.",
    type: "deployment",
  },
  {
    date: "2026-07-22",
    title: "First Eames AGREEMENT on real PR (PR #10, mesh-memory)",
    summary:
      "Fixed test.pattern bug (smoke-test.mjs not matching testPatterns). First real AGREEMENT in v0.2 history — pipeline works end-to-end on a real PR.",
    type: "pipeline",
  },
  {
    date: "2026-07-19",
    title: "Eames Step 4 v0.2 build completed — all 5 steps shipped",
    summary:
      "Owner validation (Step 1) → owner verdict producer (Step 2) → Eames audit producer (Step 3) → pr-gate combiner (Step 4) → Telegram handler (Step 5). 87/87 tests pass fleet-wide.",
    type: "build",
  },
  {
    date: "2026-07-19",
    title: "VRAM audit on GX-10 — 19.7GB reclaimed",
    summary:
      "Deleted qwen3.6-27b/ (17GB) and nemotron-nano-4b/ (2.7GB). All 5 model services still healthy. Eames pipeline validated end-to-end as second validation.",
    type: "incident",
  },
  {
    date: "2026-07-18",
    title: "Fleet model routing — Option A shipped",
    summary:
      "9 models in LiteLLM on .32, 6 in openclaw.json + models.json. All 6 fleet chat models verified 200 OK. 0 400 errors in gateway log.",
    type: "deployment",
  },
  {
    date: "2026-07-17",
    title: "Eames v0.3.1 fully live — all 5 systemd timers running",
    summary:
      "PR #7 merged (squash-merge). 5 Eames services live on GX-10. Live test: 2 phantom specs processed end-to-end. v0.3.1 fully operational.",
    type: "deployment",
  },
  {
    date: "2026-07-15",
    title: "bettermachine.ai website — first build pass",
    summary:
      "Built hero, manifesto, projects, agents, blog pages. Design system + copy docs implemented. Next: project detail pages, contact form, SEO.",
    type: "build",
  },
];

export const rayActivities: ActivityEntry[] = [
  {
    date: "2026-07-28",
    title: "extrusion-supplies — repo verified and accessible",
    summary:
      "Verified remote accessible from GX-10 via git+SSH. Cloned to ~/.openclaw/workspace/projects/extrusion-supplies. Eames can now fetch and diff.",
    type: "build",
  },
  {
    date: "2026-07-22",
    title: "Extrusion supplies — Eames audit pipeline end-to-end",
    summary:
      "First real PR dogfood: extrusion-supplies repo → Eames watcher → dispatcher → gate → AGREEMENT. Pipeline working on real code.",
    type: "pipeline",
  },
  {
    date: "2026-07-18",
    title: "LiteLLM fleet routing — config verified",
    summary:
      "Verified 6 fleet chat models serving 200 OK. Updated LiteLLM config comments. Smoke test 7/8 pass (1 fail is expected — fleet-embed is embed-only).",
    type: "deployment",
  },
  {
    date: "2026-07-17",
    title: "Eames orchestrator — end-to-end phantom test",
    summary:
      "5 phantom specs processed through full pipeline. online-test caught real gates bug → REWORK. happy-path-test → ELIGIBLE 7/7.",
    type: "pipeline",
  },
  {
    date: "2026-07-15",
    title: "bettermachine.ai private dashboard — MFA work",
    summary:
      "Auth/MFA branch 19 files, 4641 lines of work: TOTP replacement, spend tracking, lockout logic. PR #5 opened.",
    type: "build",
  },
];

export const eamesActivities: ActivityEntry[] = [
  {
    date: "2026-07-27",
    title: "First real AGREEMENT verdict on env-defect spec",
    summary:
      "Memory-search corruption repair spec: Eames caught 3 real issues, owner fixed, AGREEMENT verdict. Pipeline proven for non-code defects.",
    type: "pipeline",
  },
  {
    date: "2026-07-24",
    title: "dream-cycle v2 spec — Eames audit PROPOSED",
    summary:
      "BMHS spec for dream-cycle v2 rebuild dropped on GX-10 inbox. Status: PROPOSED, gates PASSED at v0.1 level.",
    type: "pipeline",
  },
  {
    date: "2026-07-22",
    title: "First real AGREEMENT on PR #10 (mesh-memory)",
    summary:
      "Test.pattern fix: added smoke-test.mjs matching. Eames audit + owner verdict → AGREEMENT. First real AGREEMENT in v0.2 history.",
    type: "pipeline",
  },
  {
    date: "2026-07-19",
    title: "v0.2 audit — substantive reasoning on PR code",
    summary:
      "First real audit: reviewed Step 4 v0.2 code, provided thoughtful plain-English reasoning on test coverage, security, and architecture.",
    type: "pipeline",
  },
];
