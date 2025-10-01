from flask import Flask
from flask_cors import CORS
import os

def create_app():
    app = Flask(__name__)

    # Config desde config.py (está en la raíz del proyecto)
    config_path = os.path.join(os.path.dirname(app.root_path), "config.py")
    app.config.from_pyfile(config_path)

    # Habilitar CORS
    CORS(app)

    # Registrar Blueprints
    from .routes import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix="/api")

    return app
