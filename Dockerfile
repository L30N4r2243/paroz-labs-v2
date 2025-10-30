# Imagen base de Python
FROM python:3.10-slim

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos archivos de dependencias
COPY requirements.txt .

# Instalamos dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos el resto del código del backend
COPY . .

# Exponemos el puerto del backend
EXPOSE 5000

# Comando para ejecutar la aplicación Flask
CMD ["python", "run.py"]
