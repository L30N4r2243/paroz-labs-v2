from anthropic import Anthropic, APIStatusError
from flask import current_app

def get_claude_response(messages: list[dict]) -> str:
    try:
        api_key = current_app.config["ANTHROPIC_API_KEY"]
        model = current_app.config["CLAUDE_MODEL"]
        system_prompt = current_app.config["SYSTEM_PROMPT"]

        client = Anthropic(api_key=api_key)

        input_length = sum(len(m.get("content", "")) for m in messages)
        max_output = 350 if input_length < 1000 else 600


        response = client.messages.create(
            model=model,
            max_tokens=max_output,
            system=system_prompt,
            messages=messages
        )

        text_response = response.content[0].text

        # Si la respuesta fue cortada, la manejamos de forma más conversacional.
        if response.stop_reason == 'max_tokens':
            # Intentamos cortar en el final de la última oración completa.
            last_period = text_response.rfind('.')
            last_question = text_response.rfind('?')
            last_exclamation = text_response.rfind('!')
            last_sentence_end = max(last_period, last_question, last_exclamation)

            if last_sentence_end > -1:
                text_response = text_response[:last_sentence_end + 1]
            else:
                # Si no hay oraciones completas, cortamos en la última palabra.
                last_space = text_response.rfind(' ')
                if last_space != -1:
                    text_response = text_response[:last_space].strip()
            
            # Añadimos una invitación para continuar la conversación.
            text_response += "\n\n(Vaya, parece que me extendí un poco. Si quieres, solo dime **'continúa'** y sigo con la idea)."

        return text_response

    except APIStatusError as e:
        print(f"[Claude API Error] {e}")
        return "Error al conectar con Claude."
    except Exception as e:
        print(f"[Error interno] {e}")
        return "Error interno en el servidor."
