
from .analyzer import query

from .gemini_client import traite_text

def hybrid_analyse(text):
    analyse_text = query(text)
    confidence = f"{analyse_text['confidence']:.2f}"
    categorie = analyse_text["category"]

    gemeina_output = traite_text(text,categorie)

    resume = gemeina_output["summary"]
    tone = gemeina_output["tone"]
    
    return text, confidence, categorie , resume , tone

# text, confidence, categorie , resume , tone = hybrid_analyse("talk about math")
# print(categorie)
# print("\n")
# print(resume)