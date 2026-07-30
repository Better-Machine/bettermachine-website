# Ad-Hoc Eames Review Process

**Status:** Draft — pending Erik approval  
**Created:** 2026-07-30  
**Purpose:** Trigger Eames review of completed work that doesn't fit the standard PR fix pipeline.

---

## When to Use

- Post-build review of a deployed product (e.g., "review the website")
- Audit of existing infrastructure or code
- "Does this look right?" or "evaluate readiness" requests
- Anything that doesn't involve a PR branch needing Eames audit + merge

## How It Works

### Step 1: Write the BMHS Spec

Same format as PR specs — all 5 mandatory sections:

1. **Context** — what was done, why
2. **Scope** — what to review
3. **Acceptance Criteria** — what "good" looks like
4. **File/URL Boundaries** — where to find the work
5. **Don't-Do List** — what to avoid

Plus:
- `**Owner:** liz` or `**Owner:** ray`
- `**Request Type:** ad-hoc-review`
- `**URL:** https://bettermachine.ai` (or wherever applicable)

### Step 2: Copy to GX-10 Inbox

```bash
scp /path/to/spec.md erik-ross@192.168.50.30:/home/erik-ross/.openclaw/workspace/inbox/<spec-name>.md
```

### Step 3: Validate with Eames Watcher

```bash
ssh erik-ross@192.168.50.30 \
  "python3 /opt/gx10-dev-pod/fleet-maintenance/eames-watcher/eames_watcher.py \
   /home/erik-ross/.openclaw/workspace/inbox/<spec-name>.md"
```

Output should be `READY`. If `AMBIGUOUS`, fix missing sections and repeat.

### Step 4: Trigger Dispatcher (optional)

```bash
# Remove any stale skip file
ssh erik-ross@192.168.50.30 \
  "rm -f /home/erik-ross/.openclaw/workspace/inbox/.processed/<spec-name>.dispatch-skipped.json"
```

The dispatcher will pick it up and create `dispatch.json`. But for ad-hoc reviews, the dispatcher's standard flow (owner-verdict → Eames audit → pr-gate) won't process it — that pipeline is for PR fix workflows.

### Step 5: Invoke Eames Directly

For ad-hoc reviews, call the Eames persona directly via GX-10's inference endpoint:

```bash
curl -s http://192.168.50.30:8083/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3.6-35b-eames",
    "messages": [
      {"role": "system", "content": "[SYSTEM] You are Eames, the quality auditor for Better Machine. You are adversarial, thorough, and precise. You find bugs that others miss. You score work on an A-F scale with specific reasons."},
      {"role": "user", "content": "<spec content + what to review + any known issues>"}
    ],
    "max_tokens": 10000,
    "stream": false
  }'
```

**Tips:**
- Keep the prompt focused — list known issues and ask Eames to confirm/expand
- The persona endpoint has a timeout; if the response is too long, split into follow-up calls
- For complex reviews, send the full spec content as the user message

### Step 6: Process Findings

Eames returns findings categorized by severity. Convert to action items:

| Severity | Action |
|----------|--------|
| FAIL Critical | Immediate fix — do not ship until resolved |
| FAIL High | Fix before next deployment |
| FAIL Medium | Fix on next maintenance window |
| WARN | Owner decides: fix or accept. Document decision. |
| PASS | No action needed |

Report results to Erik with:
1. Verdict (PASS / WARN / FAIL)
2. List of findings by severity
3. Recommended actions with priorities

## Output Format

```
## Eames Ad-Hoc Review: <Spec Title>
**Date:** 2026-07-30
**Verdict:** FAIL (2 FAILs, 0 WARNs)
**Score:** C+

### FAIL
1. **OG image /og-image.png returns 404** (High)
   - Location: web/src/app/layout.tsx:18
   - Impact: Social sharing shows broken image
   - Fix: Create web/public/og-image.png (1200x630)

### PASS
1. All project pages render correctly
2. Contact form uses Formspree (static-compatible)
3. Activity feed populates real entries
```

## Notes

- This is a lightweight process — no owner-verdict.json, no pr-gate.json
- The result is a text report, not a pipeline artifact
- Eames can be invoked from any agent or by Erik directly
- For PR fix workflows, continue using the standard pipeline (dispatcher → verdict → audit → pr-gate)
- For recurring reviews (weekly quality gates), this can be automated as a cron job

## Examples

- Website post-build review: `2026-07-29-website-build-v0.2.md`
- Dream cycle v2 PR review: `2026-07-24-dream-cycle-v2-pr-review.md`
