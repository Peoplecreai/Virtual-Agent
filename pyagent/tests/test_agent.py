import asyncio
from pyagent.agent import TravelAgent

class DummyChat:
    def __init__(self):
        self.last = None
    def send_message(self, text):
        self.last = text
        class Resp:
            text = 'ok'
        return Resp()

def test_handle_message(monkeypatch):
    monkeypatch.setattr(TravelAgent, '_create_chat', lambda self: DummyChat())
    monkeypatch.setenv('GEMINI_API_KEY', 'test-key')
    agent = TravelAgent()
    text = asyncio.run(agent.handle_message('u1', 'hola'))
    assert text == 'ok'
