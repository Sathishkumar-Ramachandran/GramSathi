from agents import BaseAgent

INTENT_MAP = {
    "govt_scheme": "govt_scheme",
    "agriculture": "agri",
    "mitti_score": "mitti_score",
    "market_price": "market",
    "water": "water",
    "jobs": "jobs",
    "panchayat": "panchayat",
    "weather": "agri",
    "general": "govt_scheme",
}

SUPERVISOR_SYSTEM = """
You are a message routing classifier for GramSathi rural AI assistant.
Your ONLY job: output exactly ONE category label for the user's message.

Categories and examples:
  govt_scheme  → PM-KISAN, yojana, subsidy, scheme, sarkar se paisa, PM Fasal Bima,
                 Ayushman Bharat, Kisan Credit Card, PMAY, eligibility for schemes
  agriculture  → crop advice, pest, irrigation, fertilizer, seed, soil, sowing,
                 harvest, fasal, kheti, keede, sinchai, khaad, beej, katai
  mitti_score  → credit score, loan, bank, borrowing, Mitti Score, CIBIL, karz
  market_price → mandi price, bhav, where to sell, which mandi, rate, commodity price
  water        → borewell, paani, water level, village water, irrigation source, sukha
  jobs         → naukri, kaam, daily wage, rozgar, employment, MGNREGA demand
  panchayat    → gram sabha, announcement, grievance, sarpanch, village admin, road,
                 bijli complaint, meeting, budget

Respond with EXACTLY ONE word — the category name. Nothing else.
"""

class SupervisorAgent(BaseAgent):
    name = "SupervisorAgent"
    system_prompt = SUPERVISOR_SYSTEM

    def route(self, message: str) -> str:
        result = self.ask(message, language="en", max_tokens=10).strip().lower()
        result = result.split()[0] if result else "govt_scheme"
        return INTENT_MAP.get(result, "govt_scheme")
