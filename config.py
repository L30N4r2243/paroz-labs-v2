# config.py
import os
from dotenv import load_dotenv

# Cargar las variables del archivo .env
load_dotenv()

# Obtener la clave de Anthropic.
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")

# **IMPORTANTE:** Si la clave falta, el servidor no debe iniciarse.
if not ANTHROPIC_API_KEY:
    raise ValueError(
        "La clave ANTHROPIC_API_KEY no está configurada en el archivo .env. "
        "Por favor, revisa tu archivo .env."
    )

# Configuraciones del Chatbot:
CLAUDE_MODEL = "claude-3-haiku-20240307" # Modelo rápido y eficiente
SYSTEM_PROMPT = (
    "Eres un asistente de backend amigable y experto en APIs, Python, Flask y la integración con "
    "frontends como Next.js/TypeScript. Responde de forma técnica, concisa y profesional."
)