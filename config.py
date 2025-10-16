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

# --- Cargar el System Prompt desde Claude.md ---
def load_system_prompt(file_path="Claude.md"):
    try:
        # La ruta es relativa a la raíz del proyecto, donde se ejecuta el config.py
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        print(f"ADVERTENCIA: No se encontró el archivo '{file_path}'. Usando prompt por defecto.")
        return ("Eres un asistente de backend amigable y experto en APIs, Python, Flask y la integración con "
                "frontends como Next.js/TypeScript. Responde de forma técnica, concisa y profesional.")

# Configuraciones del Chatbot:
CLAUDE_MODEL = os.getenv("CLAUDE_MODEL", "claude-haiku-4-5-20251001") # Modelo rápido y eficiente
SYSTEM_PROMPT_FILE = os.getenv("SYSTEM_PROMPT_FILE")

if not SYSTEM_PROMPT_FILE:
    raise ValueError(
        "La variable de entorno SYSTEM_PROMPT_FILE no está configurada. "
        "Por favor, añádela a tu archivo .env."
    )

SYSTEM_PROMPT = load_system_prompt(SYSTEM_PROMPT_FILE)