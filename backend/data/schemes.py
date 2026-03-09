# schemes.py

# A concise summary string for the GovtSchemeAgent to know about the available schemes
SCHEMES_SUMMARY = """
1. PM-KISAN: Rs.6,000/year to small/marginal farmers (up to 2 hectares).
2. PMFBY (Fasal Bima): 100% crop loss coverage. Premium 1.5% - 2% for farmers.
3. Kisan Credit Card (KCC): Up to Rs.3 lakh credit at 4% interest.
4. MGNREGA: 100 days of guaranteed wage employment (approx Rs.220-350/day).
5. Ayushman Bharat: Rs.5 lakh health insurance per family per year.
6. PMAY-G (Awas Yojana): Financial assistance for building pucca houses.
7. Soil Health Card: Testing soil quality to recommend proper fertilizers.
8. e-NAM: National Agriculture Market online trading platform.
9. PMKSY (Krishi Sinchayi): Subsidy on drip/sprinkler irrigation systems.
10. PM-KUSUM: Subsidy for setting up standalone solar pumps.
"""

SCHEMES_DATA = [
  {
    "id": "pm-kisan", "name": "PM-KISAN",
    "full_name": "Pradhan Mantri Kisan Samman Nidhi",
    "category": "agriculture",
    "benefit": "Rs.6,000/year in 3 installments of Rs.2,000 each",
    "eligibility": ["Small/marginal farmer family", "Land up to 2 hectares",
                    "Valid Aadhaar", "Bank account linked to Aadhaar"],
    "documents": ["Aadhaar Card", "7/12 land extract (Khasra/Khatauni)",
                  "Bank passbook", "Mobile number"],
    "apply_steps": ["Visit nearest CSC with documents",
                    "CSC operator registers on pmkisan.gov.in",
                    "Get SMS confirmation with registration number",
                    "First installment arrives in 1-2 months"],
    "helpline": "155261", "website": "pmkisan.gov.in",
    "deadline": "Rolling — apply anytime", "eligible_for_demo": True,
  },
  {
    "id": "pmfby", "name": "PMFBY",
    "full_name": "Pradhan Mantri Fasal Bima Yojana",
    "category": "agriculture",
    "benefit": "Covers 100% crop loss. Premium: 2% Kharif, 1.5% Rabi, 5% commercial",
    "eligibility": ["Farmers growing notified crops in notified areas",
                    "Both loanee and non-loanee farmers eligible"],
    "documents": ["Aadhaar", "Bank account", "Land records", "Sowing certificate"],
    "apply_steps": ["Apply BEFORE sowing season (Rabi: Oct-Dec)",
                    "Visit any bank, CSC, or pmfby.gov.in",
                    "Pay small premium (govt pays rest)",
                    "Crop loss: notify within 72 hours via helpline"],
    "helpline": "14447", "website": "pmfby.gov.in",
    "deadline": "Before sowing season", "eligible_for_demo": True,
  },
  {
    "id": "kcc", "name": "Kisan Credit Card",
    "full_name": "Kisan Credit Card Scheme", "category": "finance",
    "benefit": "Revolving credit up to Rs.3 lakh at 4% interest rate",
    "eligibility": ["Individual farmers owning or leasing land",
                    "Sharecroppers and oral lessees", "SHGs of farmers"],
    "documents": ["Aadhaar", "PAN Card", "Land records", "Passport photo"],
    "apply_steps": ["Go to any nationalized bank (SBI, PNB, BOB)",
                    "Fill KCC application form",
                    "Submit land records + Aadhaar",
                    "Bank processes in 2-3 weeks, card delivered"],
    "helpline": "1800-180-1111", "website": "agricoop.gov.in",
    "deadline": "No deadline", "eligible_for_demo": True,
  },
  {
    "id": "mgnrega", "name": "MGNREGA",
    "full_name": "Mahatma Gandhi National Rural Employment Guarantee Act",
    "category": "employment",
    "benefit": "100 days guaranteed work at Rs.220-350/day (Maharashtra: Rs.252/day)",
    "eligibility": ["Any adult in a rural household",
                    "Willing to do unskilled manual work", "No income limit"],
    "documents": ["Aadhaar", "Bank/Post Office account", "Photo"],
    "apply_steps": ["Visit Gram Panchayat office",
                    "Submit Job Card application",
                    "Get Job Card within 15 days",
                    "Demand work in writing — must be provided in 15 days"],
    "helpline": "1800-111-555", "website": "nrega.nic.in",
    "deadline": "No deadline — demand anytime", "eligible_for_demo": True,
  },
  {
    "id": "ayushman", "name": "Ayushman Bharat",
    "full_name": "PM Jan Arogya Yojana", "category": "health",
    "benefit": "Rs.5 lakh health insurance per family per year",
    "eligibility": ["Identified based on SECC 2011 data", "No cap on family size"],
    "documents": ["Aadhaar", "Ration Card", "Mobile number"],
    "apply_steps": ["Check eligibility at CSC or online",
                    "Get e-card created by paying nominal fee at CSC",
                    "Show card at empaneled hospitals for free treatment"],
    "helpline": "14555", "website": "pmjay.gov.in",
    "deadline": "No deadline", "eligible_for_demo": False,
  }
]

DEMO_JOBS_SEED = [
    {"job_id": "J1", "title": "Tractor Driver", "wage": "Rs.600/day", "duration": "15 days", "employer": "Suresh Farms", "phone": "9876543210", "category": "skilled"},
    {"job_id": "J2", "title": "Onion Harvesting", "wage": "Rs.350/day", "duration": "30 days", "employer": "Patil Agro", "phone": "9865432109", "category": "labour"},
    {"job_id": "J3", "title": "Vegetable Sorter", "wage": "Rs.400/day", "duration": "7 days", "employer": "Nashik APMC", "phone": "9854321098", "category": "labour"},
    {"job_id": "J4", "title": "Mason Construction", "wage": "Rs.700/day", "duration": "60 days", "employer": "Desai Const.", "phone": "9843210987", "category": "skilled"},
    {"job_id": "J5", "title": "Drip Installer", "wage": "Rs.550/day", "duration": "20 days", "employer": "JainAgri Systems", "phone": "9832109876", "category": "skilled"}
]

DEMO_ANNOUNCEMENTS_SEED = [
    {"id": "A1", "panchayat_id": "DINDORI-NASHIK", "title": "Gram Sabha Meeting", "category": "Meeting", "date": "18 Jan 2025", "description": "Agenda: MGNREGA works approval and road repairs. All residents must attend at 10 AM."},
    {"id": "A2", "panchayat_id": "DINDORI-NASHIK", "title": "PM-KISAN Camp", "category": "Camp", "date": "20 Jan 2025", "description": "Special camp at Talathi office for PM-KISAN e-KYC and new registration."},
    {"id": "A3", "panchayat_id": "DINDORI-NASHIK", "title": "Main Road Repair", "category": "Works", "date": "22 Jan 2025", "description": "Repair work starting on Km 0-2.5. Contractor: Patil Construction. Heavy vehicles restricted."}
]
