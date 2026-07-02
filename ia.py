from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analizar_cv(cv_texto: str) -> str:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": """Eres un experto en recursos humanos y reclutamiento. 
                Tu tarea es analizar CVs y dar retroalimentación detallada y constructiva.
                Siempre responde en español y estructura tu respuesta así:
                
                1. PUNTOS FUERTES
                2. ÁREAS DE MEJORA  
                3. PUESTOS RECOMENDADOS
                4. SUGERENCIAS CONCRETAS"""
            },
            {
                "role": "user",
                "content": f"Por favor analiza este CV:\n\n{cv_texto}"
            }
        ]
    )
    return response.choices[0].message.content