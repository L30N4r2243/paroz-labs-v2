from anthropic import Anthropic, APIStatusError
from flask import current_app

def get_claude_response(messages: list[dict]) -> str:
    """
    Formato esperado de messages:
    [
        {"role": "user", "content": "Hola, ¿cómo estás?"},
        {"role": "assistant", "content": "Estoy bien, gracias. ¿Y tú?"}
    ]
    """
    try:
        api_key = current_app.config["ANTHROPIC_API_KEY"]
        model = current_app.config["CLAUDE_MODEL"]
        system_prompt = current_app.config["SYSTEM_PROMPT"]

        client = Anthropic(api_key=api_key)

        response = client.messages.create(
            model=model,
            max_tokens=2000,
            system=system_prompt,
            messages=messages
        )

        return response.content[0].text

    except APIStatusError as e:
        print(f"[Claude API Error] {e}")
        return "Error al conectar con Claude."
    except Exception as e:
        print(f"[Error interno] {e}")
        return "Error interno en el servidor."
