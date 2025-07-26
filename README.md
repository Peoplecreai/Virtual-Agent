# Creai Travel Agent

Agente virtual de Creai para gestionar solicitudes de viaje de negocio en Slack de forma natural, conversacional y precisa. Utiliza la nueva librería **@google/genai** para interactuar con el API de Gemini.

## Características

- Clarifica y amplía solicitudes de viaje (origen, destino, fechas, motivo, preferencias)
- Valida y enriquece opciones de vuelos y hoteles con SerpApi
- Registra solicitudes en Google Sheets
- Almacena y recupera datos de usuario en Firebase
- Soporta human-in-the-loop antes de confirmar (según configuración)
- Mantiene memoria de conversaciones
- Integración con Slack mediante Events API

## Requisitos

- Python >= 3.11
- Cuenta de proveedor de LLM Google Gemini con API Key
- Cuenta de SerpApi con API Key
- Proyecto Google Cloud con API de Sheets y credenciales de cuenta de servicio
- Proyecto Firebase configurado con GOOGLE_APPLICATION_CREDENTIALS para las credenciales de servicio
- App de Slack configurada con un Request URL para Events API

## Instalación

1. Clona este repositorio:
      git clone <repo_url>
      cd creai-travel-agent
2. Instala dependencias de Python:
      pip install -r requirements.txt
3. Crea un fichero `.env` en la raíz con las siguientes variables:
   # Proveedor de LLM Google Gemini
   GEMINI_API_KEY=<tu_gemini_api_key>
   # Opcional: modelo de Gemini a utilizar
   GEMINI_MODEL=gemini-pro

   # Slack
   SLACK_BOT_TOKEN=<xoxb-...>
   SLACK_SIGNING_SECRET=<...>
   SLACK_ENDPOINT=/  # opcional, ruta para Events API

   # SerpApi
   SERPAPI_KEY=<tu_serpapi_api_key>

   # Google Sheets
   GOOGLE_SHEET_ID=<tu_sheet_id>

   # Firebase
   # Para desarrollo local, define la ruta al archivo de cuenta de servicio
   GOOGLE_APPLICATION_CREDENTIALS=<ruta_al_json>

   # Opcional: puerto para el servidor (desarrollo local)
   PORT=8080  # opcional
   
## Desarrollo

Para arrancar en modo desarrollo ejecuta:
```bash
python -m pyagent
```

## Pruebas

El proyecto incluye pruebas de Node.js heredadas y se mantienen para referencia.
Para lanzarlas ejecuta:

```bash
npm test
```

Asegúrate de haber instalado previamente las dependencias de Node si deseas ejecutar estas pruebas.

## Despliegue

1. Asegúrate de tener las variables de entorno configuradas.
2. Ejecuta:
```bash
python -m pyagent
```
3. El servidor escuchará en el puerto configurado (por defecto 8080).

## Uso

- Envía mensajes en cualquier canal donde el bot esté presente.
- El agente clarificará detalles, sugerirá opciones y confirmará antes de reservar.

## Contribuciones

Las contribuciones son bienvenidas. Por favor abre issues o pull requests.

---

Creado con ❤️ usando Gemini y herramientas de código abierto
