import { App, LogLevel, ExpressReceiver } from '@slack/bolt'
import TravelAgent from './agent'

export function setupSlack(agent: TravelAgent) {
  const { SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET } = process.env

  if (!SLACK_BOT_TOKEN || !SLACK_SIGNING_SECRET) {
    throw new Error('Missing Slack credentials in environment variables')
  }

  const receiver = new ExpressReceiver({
    signingSecret: SLACK_SIGNING_SECRET,

    // Use custom endpoint if provided, otherwise respond on root URL
    endpoints: process.env.SLACK_ENDPOINT || '/',
  })

  receiver.router?.get('/', (_req, res) => res.status(200).send('ok'))

  const app = new App({
    token: SLACK_BOT_TOKEN,
    receiver,
    // Using Slack Events API via request URL
    logLevel: LogLevel.INFO
  })

  // Listen to any message the bot can access (DMs, channels, mentions)
  app.event('message', async ({ event, say }) => {
    if ((event as any).subtype) return; // ignore bot messages and others
    const userText = (event as any).text as string || ''
    const userId = (event as any).user as string
    console.log('Received message from', userId, ':', userText)
    try {
      const response = await agent.handleMessage(userId, userText)
      await say(response)
    } catch (err) {
      console.error('Error executing agent:', err)
      await say('Lo siento, hubo un error procesando tu solicitud. Por favor, inténtalo de nuevo.')
    }
  })

  app.error(async (error) => {
    console.error('Slack app error:', error)
  })

  // Start the Slack listener on the port expected by the environment
  ;(async () => {
    const port = process.env.PORT ? Number(process.env.PORT) : 8080
    try {
      await app.start(port)
      console.log(`Slack app is running on port ${port}!`)
      try {
        await app.client.auth.test()
        console.log('Slack authentication successful')
      } catch (authErr) {
        console.error('Slack authentication failed:', authErr)
      }
    } catch (err) {
      console.error('Failed to start Slack app:', err)
      process.exit(1)
    }
  })()
}
