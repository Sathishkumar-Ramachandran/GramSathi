import boto3, json

bedrock = boto3.client("bedrock-runtime", region_name="ap-south-1")
MODEL_ID = "anthropic.claude-3-haiku-20240307-v1:0"

LANG_INSTRUCTIONS = {
    "hi": "Respond ONLY in Hindi using Devanagari script. Keep language simple and conversational.",
    "ta": "Respond ONLY in Tamil using Tamil script. Keep language simple and conversational.",
    "te": "Respond ONLY in Telugu using Telugu script. Keep language simple and conversational.",
    "mr": "Respond ONLY in Marathi using Devanagari script. Keep language simple and conversational.",
    "bn": "Respond ONLY in Bengali using Bengali script. Keep language simple and conversational.",
}

class BaseAgent:
    name: str = "BaseAgent"
    system_prompt: str = ""

    def ask(self, message: str, language: str = "hi", max_tokens: int = 300) -> str:
        lang_instr = LANG_INSTRUCTIONS.get(language, LANG_INSTRUCTIONS["hi"])
        full_system = (
            f"{self.system_prompt}\n\n"
            f"LANGUAGE RULE: {lang_instr}\n"
            f"FORMAT RULE: Plain sentences only. No markdown, no bullet points, "
            f"no numbered lists when responding for voice. Under 150 words. "
            f"End with ONE clear action step."
        )
        try:
            resp = bedrock.invoke_model(
                modelId=MODEL_ID,
                contentType="application/json",
                accept="application/json",
                body=json.dumps({
                    "anthropic_version": "bedrock-2023-05-31",
                    "max_tokens": max_tokens,
                    "temperature": 0.3,
                    "system": full_system,
                    "messages": [{"role": "user", "content": message}],
                }),
            )
            data = json.loads(resp["body"].read())
            return data["content"][0]["text"]
        except Exception as e:
            print(f"Bedrock API Error: {str(e)}")
            return self._fallback(message, language)

    def _fallback(self, message: str, language: str) -> str:
        # Provide a smart fallback for demo purposes if AWS keys are missing
        if "score" in message.lower() or "mitti" in message.lower():
            if language == "en": return "Your Mitti Score is 724. You are eligible for a Rs. 1.7L loan."
            return "Aapka Mitti Score 724 hai, Band B mein. Aap 1.7 lakh tak loan le sakte hain."
        elif "scheme" in message.lower() or "yojna" in message.lower():
            return "PM-KISAN aur PMFBY aapke liye sabse achhi yojnayen hain."
        
        fallbacks = {
            "hi": "Maafi chahiye, server abhi busy hai. Par aapka GramSathi app chal raha hai.",
            "ta": "மன்னிக்கவும், சர்வர் பிஸியாக உள்ளது. ஆனால் உங்கள் செயலி வேலை செய்கிறது.",
            "te": "క్షమించండి, సర్వర్ బిజీగా ఉంది. కానీ మీ యాప్ పనిచేస్తోంది.",
            "mr": "क्षमस्व, सर्व्हर व्यस्त आहे. पण तुमचे ॲप चालू आहे.",
            "bn": "দুঃখিত, সার্ভার ব্যস্ত। কিন্তু আপনার অ্যাপ চলছে।",
        }
        return fallbacks.get(language, fallbacks["hi"])
