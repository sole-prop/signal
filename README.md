# SIGNAL

```text
   _______  ________   _______   _   __   ______    __
  / ___/ / / / __/ /  / ___/ /  / | / /  / __/ /   / /
 (__  ) /_/ / _// _ \/ /__/ /__/  |/ /  / _// /__ / /
/____/\____/_/ /_.__/\___/____/_/|_/  /_/ /____//_/
```

Minimal real-time API health monitor for local demos, internal tooling
practice, and fast validation of an event-stream dashboard stack.

## Overview

SIGNAL simulates five API services and streams status updates every 2 seconds.
The UI is intentionally monochrome and operational: response times, uptime,
connection state, and per-endpoint health in one screen.

## Features

- Real-time endpoint updates over Server-Sent Events
- FastAPI backend with Windows-safe asyncio setup
- Next.js 16 dashboard with graceful offline fallback
- Monochrome infra-tooling visual system with Geist Sans and Geist Mono
- Cold-start friendly: no auth, no database, no paid services

## Stack

- Backend: FastAPI, Uvicorn
- Frontend: Next.js 16, TypeScript, React 19
- Streaming: Server-Sent Events
- Styling: Tailwind-enabled app shell with inline governed UI styles

## Project Structure

```text
signal/
|-- AGENTS.md
|-- README.md
|-- backend/
|   |-- main.py
|   `-- requirements.txt
|-- dashboard/
|   |-- package.json
|   `-- src/
|       |-- app/
|       |-- components/
|       |-- hooks/
|       |-- lib/
|       `-- types/
`-- .agents/
    `-- skills/
        `-- signal-design/
            `-- SKILL.md
```

## Run Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Runs on `http://localhost:8001`

### Frontend

```bash
cd dashboard
npm install
npm run dev
```

Runs on `http://localhost:3000`

## API Routes

- `GET /health` - backend heartbeat
- `GET /api/endpoints` - current snapshot of all endpoints
- `GET /stream` - live SSE feed

## Demo Notes

- Status values rotate between `up`, `degraded`, and `down`
- Uptime percentages evolve over time from rolling counters
- If the backend is offline, the dashboard shows a direct recovery hint

## Build

```bash
cd dashboard
npm run build
```

## Repo

[github.com/sole-prop/signal](https://github.com/sole-prop/signal)

## Built With

OpenAI Codex, guided by the local `AGENTS.md` doctrine.
