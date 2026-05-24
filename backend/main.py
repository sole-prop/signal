import sys
import asyncio

if sys.platform == "win32":
    asyncio.set_event_loop_policy(
        asyncio.WindowsSelectorEventLoopPolicy()
    )

import json
import random
from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

app = FastAPI(title="SIGNAL Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 5 fake API endpoints with base characteristics
ENDPOINTS = [
    {"id": "api-auth", "name": "Auth Service", "url": "api.signal.dev/auth"},
    {
        "id": "api-payments",
        "name": "Payments API",
        "url": "api.signal.dev/payments",
    },
    {"id": "api-users", "name": "User Service", "url": "api.signal.dev/users"},
    {"id": "api-search", "name": "Search Index", "url": "api.signal.dev/search"},
    {
        "id": "api-notifs",
        "name": "Notifications",
        "url": "api.signal.dev/notifications",
    },
]

BASE_RESPONSE_TIMES = {
    "api-auth": 45,
    "api-payments": 120,
    "api-users": 38,
    "api-search": 210,
    "api-notifs": 67,
}

uptime_counters = {
    ep["id"]: {"checks": 100, "successes": 98} for ep in ENDPOINTS
}


def generate_endpoint_status(ep: dict) -> dict:
    base_ms = BASE_RESPONSE_TIMES[ep["id"]]
    noise = random.randint(-15, 25)
    response_time = max(10, base_ms + noise)

    roll = random.random()
    if roll < 0.04:
        status = "down"
        uptime_counters[ep["id"]]["checks"] += 1
    elif roll < 0.15:
        status = "degraded"
        uptime_counters[ep["id"]]["checks"] += 1
        uptime_counters[ep["id"]]["successes"] += 1
    else:
        status = "up"
        uptime_counters[ep["id"]]["checks"] += 1
        uptime_counters[ep["id"]]["successes"] += 1

    c = uptime_counters[ep["id"]]
    uptime_pct = round((c["successes"] / c["checks"]) * 100, 2)

    return {
        "id": ep["id"],
        "name": ep["name"],
        "url": ep["url"],
        "status": status,
        "response_time_ms": response_time,
        "uptime_pct": uptime_pct,
        "last_checked": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/health")
def health():
    return {"status": "ok", "service": "SIGNAL"}


@app.get("/api/endpoints")
def get_endpoints():
    return [generate_endpoint_status(ep) for ep in ENDPOINTS]


@app.get("/stream")
async def stream_endpoints():
    async def generator():
        while True:
            data = [generate_endpoint_status(ep) for ep in ENDPOINTS]
            yield f"data: {json.dumps(data)}\n\n"
            await asyncio.sleep(2)

    return StreamingResponse(
        generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001, reload=False)
