
import os
import sys

# Añadir el directorio raíz del proyecto (padre de 'src') a la ruta de Python
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from src import create_app

def main():
    """
    Punto de entrada principal para ejecutar la aplicación.
    """
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    # debug=False para un entorno de producción, True para desarrollo.
    app.run(host='0.0.0.0', port=port, debug=False)

if __name__ == '__main__':
    main()
