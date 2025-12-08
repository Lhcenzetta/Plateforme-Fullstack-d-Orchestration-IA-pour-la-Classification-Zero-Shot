import os
import google.generativeai as genai
from google.generativeai import types
from dotenv import load_dotenv
import json
load_dotenv()
def traite_text(text, category):
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    model = genai.GenerativeModel("gemini-2.5-flash")

    prompt = f"""
    You are an AI specialized in contextual summarization.

    You MUST return ONLY valid JSON. 
    No explanations, no markdown, no extra text.

    JSON FORMAT:
    {{
        "summary": "string",
        "tone": "positive | negative | neutral",
        "category": "{category}"
    }}

    USER TEXT:
    {text}
    """

    response = model.generate_content(
        prompt,
        generation_config=types.GenerationConfig(
            max_output_tokens=300,
            temperature=0.2,
            response_mime_type="application/json"   
        )
    )
    return json.loads(response.text)
