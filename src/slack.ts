import { App, LogLevel } from '@slack/bolt'
import TravelAgent from './agent'

export function setupSlack(agent: TravelAgent) {
  const app = new App({
    token: process.env.SLACK_BOT_TOKEN!,
    signingSecret: process.env.SLACK_SIGNING_SECRET!,
    appToken: process.env.SLACK_APP_TOKEN!,
    socketMode: true,
    logLevel: LogLevel.INFO
  });

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
  (async () => {

    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    await app.start(port);
    console.log(`Slack app is running on port ${port}!`);


    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    await app.start(port);
    console.log(`Slack app is running on port ${port}!`);

    await app.start()
    console.log('Slack app is running!')


  })();
}
