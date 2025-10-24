from anthropic import Anthropic, APIStatusError
from flask import current_app

def get_claude_response(messages: list[dict]) -> str:
    """
    Obtiene una respuesta concisa de Claude, optimizada para un chatbot de landing page.
    La concisión se logra con un System Prompt estricto y un bajo max_tokens.
    """
    try:
        api_key = current_app.config["ANTHROPIC_API_KEY"]
        model = current_app.config["CLAUDE_MODEL"]
        
        system_prompt = current_app.config["SYSTEM_PROMPT"]

        client = Anthropic(api_key=api_key)

        # Aumentamos el límite de tokens para permitir respuestas más largas y completas.
        MAX_TOKENS = 2048

        response = client.messages.create(
            model=model,
            max_tokens=MAX_TOKENS,
            system=system_prompt,
            messages=messages
        )

        text_response = response.content[0].text

        return text_response.strip()

    except APIStatusError as e:
        # En un entorno de producción, es mejor solo loggear y retornar un mensaje genérico
        current_app.logger.error(f"[Claude API Error] {e}")
        return "Disculpa, tengo problemas para procesar tu solicitud ahora."
    except Exception as e:
        current_app.logger.error(f"[Error interno] {e}")
        return "Algo inesperado ocurrió en el servidor. Por favor, inténtalo de nuevo."