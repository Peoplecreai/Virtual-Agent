import { App, LogLevel } from '@slack/bolt'
import TravelAgent from './agent'

export function setupSlack(agent: TravelAgent) {
  const { SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET } = process.env

  if (!SLACK_BOT_TOKEN || !SLACK_SIGNING_SECRET) {
    throw new Error('Missing Slack credentials in environment variables')
  }

  const app = new App({
    token: SLACK_BOT_TOKEN,
    signingSecret: SLACK_SIGNING_SECRET,
    // Using Slack Events API via request URL
    logLevel: LogLevel.INFO
  })

  // Listen to any message in channels the bot is in
  app.message(async ({ message, say }) => {
    if ((message as any).subtype) return // ignore bot messages and others
    const userText = (message as any).text as string
    const userId = (message as any).user as string
    try {
      const response = await agent.handleMessage(userId, userText)
      await say(response)
    } catch (err) {
      console.error('Error executing agent:', err)
      await say('Lo siento, hubo un error procesando tu solicitud. Por favor, inténtalo de nuevo.')
    }
  });

  // Start the Slack listener on the port expected by the environment
  ;(async () => {
    const port = process.env.PORT ? Number(process.env.PORT) : 8080
    try {
      await app.start(port)
      console.log(`Slack app is running on port ${port}!`)
    } catch (err) {
      console.error('Failed to start Slack app:', err)
      process.exit(1)
    }
  })()
}
