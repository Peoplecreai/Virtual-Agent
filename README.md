# Creai Travel Agent

Agente virtual de Creai para gestionar solicitudes de viaje de negocio en Slack de forma natural, conversacional y precisa.

## Características

- Clarifica y amplía solicitudes de viaje (origen, destino, fechas, motivo, preferencias)
- Valida y enriquece opciones de vuelos y hoteles con SerpApi
- Registra solicitudes en Google Sheets
- Almacena y recupera datos de usuario en Firebase
- Soporta human-in-the-loop antes de confirmar (según configuración)
- Mantiene memoria de conversaciones
- Integración directa con Slack (Socket Mode)

## Requisitos

- Node.js >= 16
- Cuenta de proveedor de LLM Google Gemini con API Key
- Cuenta de SerpApi con API Key
- Proyecto Google Cloud con API de Sheets y credenciales de cuenta de servicio
- Proyecto Firebase con credenciales de servicio
- App de Slack configurada en modo Socket Mode

## Instalación

1. Clona este repositorio:
      git clone <repo_url>
   cd creai-travel-agent
   2. Instala dependencias:
      npm install
   3. Crea un fichero `.env` en la raíz con las siguientes variables:
   # Proveedor de LLM Google Gemini
   GEMINI_API_KEY=<tu_gemini_api_key>

   # Slack
   SLACK_BOT_TOKEN=<xoxb-...>
   SLACK_SIGNING_SECRET=<...>
   SLACK_APP_TOKEN=<xapp-...>

   # SerpApi
   SERPAPI_KEY=<tu_serpapi_api_key>

   # Google Sheets
   GOOGLE_SHEET_ID=<tu_sheet_id>

   # Firebase
   FIREBASE_SERVICE_ACCOUNT=<contenido_JSON_o_ruta>
   FIREBASE_DATABASE_URL=<url_firebase>

   # Opcional: puerto para el servidor
   PORT=9000
   4. Compila TypeScript:
      npm run build
   
## Desarrollo

Para arrancar en modo desarrollo con recarga en caliente:
npm run dev

## Despliegue

1. Asegúrate de tener las variables de entorno configuradas.
2. Ejecuta:
      npm start
   3. El servidor escuchará en el puerto configurado (por defecto 9000).

## Uso

- Envía mensajes en cualquier canal donde el bot esté presente.
- El agente clarificará detalles, sugerirá opciones y confirmará antes de reservar.

## Contribuciones

Las contribuciones son bienvenidas. Por favor abre issues o pull requests.

---

Creado con ❤️ usando Gemini y herramientas de código abierto
