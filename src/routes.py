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
    user_message = data.get('message')

    if not user_message:
        return jsonify({"error": "Falta el campo 'message' en la petición."}), 400

    print(f"-> Mensaje recibido del frontend: {user_message}")

    bot_response = get_claude_response(user_message)

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