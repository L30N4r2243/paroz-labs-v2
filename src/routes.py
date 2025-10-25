from flask import Blueprint, request, jsonify, current_app
from .chatbot import get_claude_response
from .services.calendly import get_user_information, get_event_types

# Usamos un Blueprint para organizar las rutas de forma modular.
api = Blueprint('api', __name__)

@api.route('/api/chat', methods=['POST'])
def chat():
    """
    Endpoint principal para la conversación con el chatbot.
    """
    data = request.get_json()
    messages = data.get("messages", [])

    if not messages:
        return jsonify({"error": "Falta el campo 'messages' en la petición."}), 400

    # Límite de 50 mensajes por sesión
    if len(messages) > 50:
        return jsonify({
            "message": "Has alcanzado el número máximo de mensajes por sesión. Para continuar, por favor inicia una nueva conversación.",
            "sender": "system_message"
        }), 403

    # Pasamos el historial completo de mensajes a Claude
    bot_response = get_claude_response(messages)

    return jsonify({
        "message": bot_response,
        "sender": "claude_bot"
    })

@api.route('/api/status', methods=['GET'])
def status():
    """
    Ruta simple para verificar que la API está operativa.
    """
    return jsonify({
        "status": "OK", 
        "service": "Backend Chatbot API",
        "model": current_app.config.get('CLAUDE_MODEL')
    }), 200

@api.route("/api/calendly-user", methods=["GET"])
def calendly_user():
    """
    Endpoint para obtener la información del usuario de Calendly.
    """
    data, status_code = get_user_information()
    return jsonify(data), status_code

@api.route("/api/calendly-event", methods=["GET"])
def calendly_events():
    """
    Endpoint para obtener los eventos del usuario de Calendly
    """
    data, status_code = get_event_types()
    return jsonify(data), status_code