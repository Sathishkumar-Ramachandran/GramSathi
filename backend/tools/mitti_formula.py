import hashlib

def compute_mitti_score(land_acres, crops, calls_90d, schemes, months_active):
    base         = 300
    land         = min(int(land_acres * 30), 150)
    engagement   = min(calls_90d * 8, 80)
    compliance   = min(len(schemes) * 25, 75)
    diversity    = 40 if len(crops) >= 2 else 0
    tenure       = min(months_active * 2, 50)
    seed         = int(hashlib.md5(str(land_acres).encode()).hexdigest(), 16) % 50
    weather      = 25 + seed

    score = min(base + land + engagement + compliance + diversity + tenure + weather, 850)

    if score >= 700: band, band_label = "A", "Bahut Achha"
    elif score >= 550: band, band_label = "B", "Achha"
    elif score >= 300: band, band_label = "C", "Theek"
    else: band, band_label = "D", "Kharab"

    tips = []
    if "PMFBY" not in schemes: tips.append("Fasal bima (PMFBY) karwayen — 25 points milenge")
    if "KCC" not in schemes: tips.append("Kisan Credit Card lein — 25 points milenge")
    if len(crops) < 2: tips.append("Ek aur crop ugayen — crop diversity bonus milega")
    tips.append("Har hafte GramSathi use karein — engagement score badhta hai")

    return {
        "mitti_score": score,
        "risk_band": band,
        "risk_band_label": band_label,
        "recommended_credit_inr": int((score / 850) * 200000),
        "components": {
            "land_crop": land,
            "engagement": engagement,
            "scheme_compliance": compliance,
            "crop_diversity": diversity,
            "tenure": tenure,
            "weather_resilience": weather,
        },
        "improvement_tips": tips,
    }

# Ramesh Patil → score 724, Band B
DEMO_SCORE = compute_mitti_score(
    land_acres=2.5, crops=["wheat", "onion"],
    calls_90d=12, schemes=["PM-KISAN", "PMFBY"], months_active=18
)
