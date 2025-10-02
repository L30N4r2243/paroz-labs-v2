from anthropic import Anthropic, APIStatusError
from flask import current_app

def get_claude_response(messages: list[dict]) -> str:
    try:
        api_key = current_app.config["ANTHROPIC_API_KEY"]
        model = current_app.config["CLAUDE_MODEL"]
        system_prompt = current_app.config["SYSTEM_PROMPT"]

        client = Anthropic(api_key=api_key)

        response = client.messages.create(
            model=model,
            max_tokens=300,  # Límite que puede causar el corte
            system=system_prompt,
            messages=messages
        )

        text_response = response.content[0].text

        # Si la respuesta fue cortada, la truncamos a la última palabra completa.
        if response.stop_reason == 'max_tokens':
            last_space = text_response.rfind(' ')
            if last_space != -1:
                text_response = text_response[:last_space].strip() + "..."

        return text_response

    except APIStatusError as e:
        print(f"[Claude API Error] {e}")
        return "Error al conectar con Claude."
    except Exception as e:
        print(f"[Error interno] {e}")
        return "Error interno en el servidor."
