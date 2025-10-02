from flask import Blueprint, request, jsonify, current_app
from .chatbot import get_claude_response

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