import os
import requests
from dotenv import load_dotenv  
# from gemini_client import traite_text
load_dotenv()

API_URL = "https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli"

def query(text):
    hf_token = os.getenv("HF_TOKEN")
    labels = [
    "sports",
    "technology",
    "music",
    "movies",
    "education",
    "health",
    "finance",
    "travel",
    "food",
    "fashion",
    "politics",
    "science",
    "gaming",
    "business",
    "environment",
    "art",
    "literature",
    "automotive",
    "news",
    "lifestyle"
]

    payload = ({
    "inputs": text,
    "parameters": {"candidate_labels": labels},
    })
    headers = {
        "Authorization": f"Bearer {hf_token}"
    }
    response = requests.post(API_URL, headers=headers, json=payload)
    result = response.json()
    top_label = result[0]["label"]
    top_score = result[0]["score"]

    return {
        "category": top_label,
        "confidence": top_score
    }
