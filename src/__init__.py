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

    # Inicializar CORS con orígenes específicos para las rutas de la API
    CORS(app)

    # Registrar los Blueprints (módulos de rutas)
    from .routes import api as api_blueprint
    app.register_blueprint(api_blueprint)

    return app