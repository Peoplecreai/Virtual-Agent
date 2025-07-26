import { OkibiSDK, ToolWithHandler, ConsoleLogger } from '@okibi/a1kit'
import { z } from '@okibi/a1kit'
import { searchFlights, searchHotels } from './serpApi'
import { logRequest } from './googleSheets'
import { saveUser, getUser } from './firebase'

export default async function createTravelAgent(sdk: OkibiSDK) {
  // Tool: search flights
  const flightTool: ToolWithHandler = {
    name: 'searchFlights',
    description: 'Busca opciones de vuelo según origen, destino y fecha',
    parameters: z.object({
      origin: z.string().describe('Ciudad de salida'),
      destination: z.string().describe('Ciudad de destino'),
      date: z.string().optional().describe('Fecha de viaje (YYYY-MM-DD)'),
      preferences: z.string().optional().describe('Preferencias de vuelo')
    }),
    handler: async (params, executionId, sdk) => {
      const result = await searchFlights(params as any)
      return { type: 'success', output: JSON.stringify(result) }
    }
  }

  // Tool: search hotels
  const hotelTool: ToolWithHandler = {
    name: 'searchHotels',
    description: 'Busca opciones de hotel según ubicación y fechas',
    parameters: z.object({
      location: z.string().describe('Ciudad u hotel'),
      checkInDate: z.string().optional().describe('Fecha de check-in (YYYY-MM-DD)'),
      checkOutDate: z.string().optional().describe('Fecha de check-out (YYYY-MM-DD)')
    }),
    handler: async (params, executionId, sdk) => {
      const result = await searchHotels(params as any)
      return { type: 'success', output: JSON.stringify(result) }
    }
  }

  // Tool: log to Google Sheets
  const sheetTool: ToolWithHandler = {
    name: 'logRequest',
    description: 'Registra la solicitud de viaje en Google Sheets',
    parameters: z.object({
      request: z.string().describe('Datos de la solicitud serializados en JSON')
    }),
    handler: async (params, executionId, sdk) => {
      const message = await logRequest(JSON.parse(params.request as string))
      return { type: 'success', output: message }
    }
  }

  // Tool: save user data
  const userSaveTool: ToolWithHandler = {
    name: 'saveUserData',
    description: 'Guarda o actualiza datos del usuario en Firebase',
    parameters: z.object({
      user: z.record(z.unknown()).describe('Objeto con datos de usuario')
    }),
    handler: async (params, executionId, sdk) => {
      const message = await saveUser((params.user as unknown) as Record<string, unknown>)
      return { type: 'success', output: message }
    }
  }

  // Tool: get user data
  const userGetTool: ToolWithHandler = {
    name: 'getUserData',
    description: 'Recupera datos del usuario desde Firebase',
    parameters: z.object({
      userId: z.string().describe('ID del usuario')
    }),
    handler: async (params, executionId, sdk) => {
      const data = await getUser(params.userId as string)
      return { type: 'success', output: JSON.stringify(data) }
    }
  }

  const tools = [
    flightTool,
    hotelTool,
    sheetTool,
    userSaveTool,
    userGetTool,
    sdk.fileCreationTool,
    sdk.addToOutputTool
  ]

  const agent = await sdk.createSimpleAgent(
    'Creai Travel Agent',
    'Agente virtual de Creai para gestionar solicitudes de viaje de negocio en Slack de forma natural, conversacional y precisa',
    {
      tools,
      model: 'gpt-4o',
      systemPrompt: `Eres el agente virtual de Creai, especializado en gestionar solicitudes de viaje de negocio en Slack de forma natural, conversacional y precisa. Cuando recibas una consulta, amplía y clarifica cualquier petición del usuario para asegurar que entiendes exactamente lo que requiere: identifica ciudad de salida, destino, fechas, motivo, preferencias de vuelo/hotel, y cualquier dato relevante, incluso si el mensaje es ambiguo o incompleto. Extrae, valida y confirma todos los datos personales y de viaje, asegurando que sean actuales y completos, y solicita información adicional solo si es indispensable, siempre priorizando la comodidad y experiencia del usuario. Si algún dato es impreciso, ambiguo o falta (por ejemplo, fechas vagas, ciudades no reconocidas, políticas fuera de presupuesto), pregunta de forma clara, contextualizada y personalizada para obtener la información precisa antes de avanzar. Utiliza Google Sheets, Firebase y APIs externas para validar, enriquecer y almacenar datos de forma segura, y adapta tu flujo para evitar redundancias y ofrecer una experiencia personalizada en futuras interacciones. Presenta siempre opciones claras y justificadas, y sólo dentro de la política y presupuesto definidos, explicando cualquier restricción o requerimiento de autorización. Antes de finalizar, muestra un resumen claro y completo, permitiendo modificaciones y confirmación explícita. Respeta la privacidad: nunca muestres datos sensibles fuera de mensajes directos y permite al usuario actualizar o borrar su información en cualquier momento. Después de cada viaje, brinda recomendaciones personalizadas y solicita feedback para mejorar la experiencia futura. Si surge algún error, informa de inmediato, ofrece alternativas y no cierres la conversación hasta que esté resuelto. Tu objetivo es expandir y clarificar la solicitud del usuario en cada paso, asegurando que todas las acciones sean precisas, seguras y completamente alineadas con las necesidades y preferencias expresadas.`,
      enableMemory: true,
      enableHumanInLoop: true,
      logger: new ConsoleLogger()
    }
  )

  return agent
}
