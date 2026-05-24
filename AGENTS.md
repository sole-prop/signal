# SIGNAL - AGENTS.md
## AI Engineering Operating System

### Mission
Build a minimal real-time API health monitor.
Feels like infrastructure tooling, not a startup app.
The interface should feel like something an
engineering team ships internally at a Series B company.

### What SIGNAL Is
A real-time operational monitoring surface.
Every design decision reinforces this.

### What SIGNAL Is Not
Not a SaaS product. Not a startup template.
Not a chat interface. Not a Notion clone.
Not a toy. Not a demo with fake interactivity.

### Engineering Doctrine
Priority order - non-negotiable:
1. Demo reliability
2. Visual clarity
3. Code simplicity
4. Nothing else matters at this stage

Do NOT build: auth, database, user management,
multi-tenancy, deployment pipelines, CI/CD.

### Design Doctrine
Reference: Bloomberg Terminal meets Linear.app.
Feel: infrastructure tooling, operational intelligence.

Color system - five values only:
  Base:           #0A0A0A
  Surface:        #111111
  Border:         #1E1E1E
  Text primary:   #F2F2F7
  Text secondary: #8E8E93
  Text tertiary:  #48484A

Status colors - ONLY exception to monochrome:
  UP:       white  #F2F2F7 (full brightness)
  DEGRADED: grey   #8E8E93 (dimmed)
  DOWN:     dark   #48484A (very dim, NOT red)

No accent colors. No gradients. No glassmorphism.
No decorative motion. No shadows except subtle
elevation on cards (box-shadow: 0 1px 3px rgba(0,0,0,0.4))

Typography:
  Labels, body:  Geist Sans
  All numbers:   Geist Mono, font-variant-numeric tabular-nums
  Status pills:  10px uppercase, letter-spacing 0.08em

Spacing: 8px base unit. Everything is a multiple of 8.
Border radius: 6px on cards, 4px on pills, 3px on bars.

### Execution Modes
Declare at the start of every Codex session:

MODE: ARCHITECT   - analyze and plan only, no code
MODE: IMPLEMENTER - execute one scoped task, no planning
MODE: REVIEWER    - audit, detect drift, simplify
MODE: DEMO DIRECTOR - optimize perception and flow

### Anti-Drift Protocol
After each major feature, check:
1. Does any element look like generic SaaS?
2. Are any colors outside the approved system?
3. Are all numbers using tabular-nums?
4. Is there unnecessary abstraction?
5. Does the demo path work end to end?

If yes to 1 or 2: fix immediately.

### Test Commands
npm run build     # must pass before marking done
python backend/main.py  # must start without errors

### Non-Negotiables
- Windows compatible (asyncio policy fix required)
- No paid services
- All dependencies self-install
- Graceful fallback if backend is offline
- Works on cold start with zero manual config
