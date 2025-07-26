from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
from .agent import TravelAgent
import os

agent = TravelAgent()
app = App(token=os.environ.get('SLACK_BOT_TOKEN'))

@app.event('message')
async def handle_message(body, say):
    event = body.get('event', {})
    if 'subtype' in event:
        return
    user_id = event.get('user')
    text = event.get('text', '')
    response = await agent.handle_message(user_id, text)
    await say(response)

def main():
    handler = SocketModeHandler(app, os.environ.get('SLACK_APP_TOKEN'))
    handler.start()

if __name__ == '__main__':
    main()
