from flask import Flask
from flask_cors import CORS
import os

def create_app():
    """
    Application Factory: crea y configura la instancia de la aplicación Flask.
    """
    app = Flask(__name__)

    # Cargar la configuración desde el archivo config.py en la raíz
    config_path = os.path.join(os.path.dirname(app.root_path), 'config.py')
    app.config.from_pyfile(config_path)

    # Inicializar CORS con orígenes específicos para las rutas de la API y soporte de preflight
    configured_origins = app.config.get("CORS_ORIGINS", ["*"])

    # Normalizar a lista de strings
    if isinstance(configured_origins, str):
        configured_origins = [o.strip() for o in configured_origins.split(",") if o.strip()]

    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": configured_origins or ["*"],
                "methods": ["GET", "POST", "OPTIONS"],
                "allow_headers": ["Content-Type", "Authorization"],
                "max_age": 86400,
            }
        },
        supports_credentials=False,
    )

    # Registrar los Blueprints (módulos de rutas)
    from .routes import api as api_blueprint
    app.register_blueprint(api_blueprint)

    return app