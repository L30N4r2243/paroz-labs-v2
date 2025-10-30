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
        response.raise_for_status()
        return response.json(), 200
    except requests.exceptions.RequestException as e:
        current_app.logger.error(f"Error de conexión con Calendlly: {e}")
        return {"error": "No se pudo conectar con el servicio de Calendly."}, 503

def get_event_types():
    """
    Obtiene los tipos de eventos de un usuario de la API de Calendly
    """
    user_data, status_code = get_user_information()
    if status_code != 200:
        return user_data, status_code
    
    user_uri = user_data.get("resource", {}).get("uri")
    if not user_uri:
        return {"error": "No se pudo obtener el URI del usuario de Calendly."}, 500
    
    api_key = current_app.config.get("CALENDLY_API_KEY")
    url = f"https://api.calendly.com/event_types?user={user_uri}"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json(), 200
    except requests.exceptions.RequestException as e:
        current_app.logger.error(f"Error al obtener los tipos de evento de Calendly: {e}")
        return {"error": "No se pudo obtener los tipos de evento de Calendly."}, 503
    
def create_scheduling_link(event_type_uri: str, user_name: str, user_email: str):
    """
    Crea un enlace de programación de un solo uso para un tipo de evento específico.
    """
    api_key = current_app.config.get("CALENDLY_API_KEY")
    if not api_key:
        return {"error": "API key de Calendly no configurada."}, 500
    
    url = "https://api.calendly.com/scheduling_links"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "max_event_count": 1,
        "owner": event_type_uri,
        "owner_type": "EventType",
        "prefill": {
            "name": user_name,
            "email": user_email
        }
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        booking_url = response.json().get("resource", {}).get("booking_url")
        if not booking_url:
            return {"error": "No se pudo obtener la URL de reserva del recurso."}, 500
        return {"booking_url": booking_url}, 200
    except requests.exceptions.RequestException as e:
        current_app.logger.error(f"Error al crear el enlace de programación de Calendly: {e}")
        error_details = e.response.json() if e.response else str(e)
        return {"error": "No se pudo crear el enlace de programación.", "details": error_details}, 503