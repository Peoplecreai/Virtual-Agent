from slack_bolt.async_app import AsyncApp
import os
from .agent import TravelAgent

agent = TravelAgent()
app = AsyncApp(
    token=os.environ.get("SLACK_BOT_TOKEN"),
    signing_secret=os.environ.get("SLACK_SIGNING_SECRET"),
)

@app.event("message")
async def handle_message(body, say):
    event = body.get("event", {})
    if 'subtype' in event:
        return
    user_id = event.get("user")
    text = event.get("text", "")
    response = await agent.handle_message(user_id, text)
    await say(response)


def main():
    port = int(os.environ.get("PORT", "8080"))
    path = os.environ.get("SLACK_ENDPOINT", "/")
    app.start(port=port, path=path)


if __name__ == "__main__":
    main()
