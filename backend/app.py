from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from agents.supervisor import SupervisorAgent
from agents.govt_scheme_agent import GovtSchemeAgent
from agents.agri_agent import AgriAgent
from agents.mitti_score_agent import MittiScoreAgent
from agents.market_agent import MarketAgent
from agents.water_agent import WaterAgent
from agents.jobs_agent import JobsAgent
from agents.panchayat_agent import PanchayatAgent
from tools.dynamo import get_jobs, get_announcements, put_grievance
from tools.mock_prices import MANDI_PRICES, NEARBY_MANDIS
from tools.mock_weather import WEATHER_DATA
from tools.mitti_formula import DEMO_SCORE, compute_mitti_score
from data.schemes import SCHEMES_DATA, DEMO_JOBS_SEED, DEMO_ANNOUNCEMENTS_SEED

app = FastAPI(title="GramSathi API", version="2.0.0")
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)

# Instantiate agents once
supervisor  = SupervisorAgent()
AGENTS = {
    "govt_scheme": GovtSchemeAgent(),
    "agri":        AgriAgent(),
    "mitti_score": MittiScoreAgent(),
    "market":      MarketAgent(),
    "water":       WaterAgent(),
    "jobs":        JobsAgent(),
    "panchayat":   PanchayatAgent(),
}

class ChatRequest(BaseModel):
    message:  str
    language: str = "hi"
    agent:    Optional[str] = None

class GrievanceRequest(BaseModel):
    category:     str
    title:        str
    description:  str
    urgency:      str = "Medium"
    panchayat_id: str = "DINDORI-NASHIK"

class ScoreRequest(BaseModel):
    land_acres:   float = 2.5
    crops:        list  = ["wheat", "onion"]
    calls_90d:    int   = 12
    schemes:      list  = ["PM-KISAN", "PMFBY"]
    months_active:int   = 18

@app.get("/health")
def health():
    return {"status": "ok", "version": "2.0.0", "agents": list(AGENTS.keys()),
            "model": "claude-3-5-sonnet-20241022-v2:0", "region": "ap-south-1"}

@app.post("/api/chat")
def chat(req: ChatRequest):
    agent_name = req.agent if req.agent in AGENTS else supervisor.route(req.message)
    response = AGENTS[agent_name].ask(req.message, req.language)
    return {"response": response, "agent": agent_name, "language": req.language}

@app.post("/api/call")
def call(req: ChatRequest):
    agent_name = req.agent if req.agent in AGENTS else supervisor.route(req.message)
    response = AGENTS[agent_name].ask(req.message, req.language, max_tokens=150)
    return {"response": response, "agent": agent_name, "language": req.language}

@app.get("/api/agents")
def list_agents():
    return {"agents": [
        {"id": "govt_scheme", "name": "Government Schemes Expert", "emoji": "🏛️"},
        {"id": "agri",        "name": "Agriculture Expert",        "emoji": "🌾"},
        {"id": "mitti_score", "name": "Mitti Credit Score Agent",  "emoji": "📊"},
        {"id": "market",      "name": "Market Price Expert",       "emoji": "💹"},
        {"id": "water",       "name": "Water Resource Agent",      "emoji": "💧"},
        {"id": "jobs",        "name": "Employment Agent",          "emoji": "💼"},
        {"id": "panchayat",   "name": "Gram Panchayat Agent",      "emoji": "🏛️"},
    ]}

@app.get("/api/score/demo")
def score_demo():
    return {"farmer_name": "Ramesh Patil", "district": "Nashik", **DEMO_SCORE}

@app.post("/api/score/compute")
def score_compute(req: ScoreRequest):
    return compute_mitti_score(req.land_acres, req.crops, req.calls_90d,
                               req.schemes, req.months_active)

@app.get("/api/jobs")
def jobs(district: str = "Nashik"):
    return {"jobs": get_jobs(district), "district": district}

@app.get("/api/welfare/schemes")
def schemes(category: str = "all"):
    filtered = SCHEMES_DATA if category == "all" else [s for s in SCHEMES_DATA if s.get("category") == category]
    return {"schemes": filtered, "total": len(filtered)}

@app.get("/api/agri/prices")
def prices():
    return {"prices": MANDI_PRICES, "district": "Nashik",
            "mandis": NEARBY_MANDIS, "source": "Mock Agmarknet"}

@app.get("/api/agri/weather")
def weather():
    return WEATHER_DATA

@app.get("/api/water")
def water(village_id: str = "422001"):
    return {"village": "Dindori, Nashik", "village_id": village_id,
            "overall": "Theek Hai",
            "sources": [
                {"name": "Borewell #1 (Near School)", "level_pct": 72, "trend": "stable",  "last_reported": "Today 8:00 AM"},
                {"name": "Borewell #2 (Main Road)",   "level_pct": 58, "trend": "falling", "last_reported": "Yesterday 6:00 PM"},
                {"name": "Village Pond",               "level_pct": 45, "trend": "falling", "last_reported": "2 days ago"},
            ]}

@app.get("/api/panchayat/announcements")
def announcements(panchayat_id: str = "DINDORI-NASHIK"):
    return {"announcements": get_announcements(panchayat_id), "panchayat_id": panchayat_id}

@app.post("/api/panchayat/grievance")
def grievance(req: GrievanceRequest):
    return put_grievance(req.panchayat_id, req.category, req.title,
                         req.description, req.urgency)

@app.get("/api/demo/preload")
def demo_preload():
    """Preloads all data in one request for fast app start."""
    return {
        "score":   {"farmer_name": "Ramesh Patil", **DEMO_SCORE},
        "prices":  MANDI_PRICES,
        "weather": WEATHER_DATA,
        "announcements": DEMO_ANNOUNCEMENTS_SEED,
        "jobs":    DEMO_JOBS_SEED,
        "schemes_count": len(SCHEMES_DATA),
        "eligible_schemes": 5,
    }
