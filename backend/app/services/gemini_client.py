import os
from google import genai
from google.genai import types
from dotenv import load_dotenv
import json
load_dotenv()
def traite_text(text, category):
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

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

    response = client.models.generate_content(
        model="gemini-2.5-flash",

        config=types.GenerateContentConfig(
            max_output_tokens=300,
            temperature=0.2,
            response_mime_type="application/json"   
        ),

        contents=prompt
    )
    return json.loads(response.text)
