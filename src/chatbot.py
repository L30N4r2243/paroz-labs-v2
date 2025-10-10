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
        
        base_prompt = current_app.config["SYSTEM_PROMPT"]
        concise_instruction = (
            " Tu única meta es ayudar al usuario a entender el producto. "
            "Responde de forma **extremadamente concisa y directa**. "
            "Nunca uses más de 2 oraciones por respuesta, salvo que sea una lista corta."
        )
        system_prompt = base_prompt + concise_instruction

        client = Anthropic(api_key=api_key)

        MAX_TOKENS_FOR_LANDING = 125 

        response = client.messages.create(
            model=model,
            max_tokens=MAX_TOKENS_FOR_LANDING, 
            system=system_prompt,
            messages=messages
        )

        text_response = response.content[0].text

        if response.stop_reason == 'max_tokens':
            # Buscamos el final de la última oración (., ?, !)
            last_period = text_response.rfind('.')
            last_question = text_response.rfind('?')
            last_exclamation = text_response.rfind('!')
            last_sentence_end = max(last_period, last_question, last_exclamation)

            if last_sentence_end > -1:
                text_response = text_response[:last_sentence_end + 1]
            else:
                # Si no hay oraciones, cortamos en la última palabra para no dejar una palabra a medias.
                last_space = text_response.rfind(' ')
                if last_space != -1:
                    text_response = text_response[:last_space].strip()

        return text_response.strip()

    except APIStatusError as e:
        # En un entorno de producción, es mejor solo loggear y retornar un mensaje genérico
        # current_app.logger.error(f"[Claude API Error] {e}")
        return "Disculpa, tengo problemas para procesar tu solicitud ahora."
    except Exception as e:
        # current_app.logger.error(f"[Error interno] {e}")
        return "Algo inesperado ocurrió en el servidor. Por favor, inténtalo de nuevo."