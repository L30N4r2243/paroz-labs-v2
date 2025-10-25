import os
import requests
from flask import current_app

def get_user_information():
    """
    Obtiene información del usuario actual de la API de Calendly
    """
    api_key = current_app.config.get("CALENDLY_API_KEY")
    if not api_key:
        return {"error": "API key de Calendly no configurada."}, 500
    
    url = "https://api.calendly.com/users/me"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status(), 200
        return response.json(), 200
    except requests.exceptions.RequestException as e:
        current_app.logger.error(f"Error de conexión con Calendlly: {e}")
        return {"error": "No se pudo conectar con el servicio de Calendly."}, 503