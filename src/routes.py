from flask import Blueprint, request, jsonify, current_app
from .chatbot import get_claude_response
from .services.calendly import get_user_information, get_event_types, create_scheduling_link

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

@api.route("/api/calendly-create-link", methods=["POST"])
def calendly_create_link():
    """
    Endpoint para crear un enlace de reserva de un solo uso
    Espera un JSON con: event_type_uri, user_name, user_email
    """
    data = request.get_json()
    event_type_uri = data.get("event_type_uri")
    user_name = data.get("user_name")
    user_email = data.get("user_email")

    if not all([event_type_uri, user_name, user_email]):
        return jsonify({"error": "Faltan campos 'event_type_uri', 'user_name' o 'user_email'."}), 400
    
    result, status_code = create_scheduling_link(event_type_uri, user_name, user_email)

    return jsonify(result), status_code