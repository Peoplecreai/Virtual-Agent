import pytest
from pyagent.agent import TravelAgent

class DummyChat:
    def __init__(self):
        self.last = None
    async def send_message(self, text):
        self.last = text
        class Resp:
            text = 'ok'
        return Resp()

class DummyModel:
    def __init__(self, *args, **kwargs):
        pass
    def start_chat(self, history=None):
        return DummyChat()

@pytest.mark.asyncio
async def test_handle_message(monkeypatch):
    monkeypatch.setattr('pyagent.agent.GenerativeModel', DummyModel)
    agent = TravelAgent()
    text = await agent.handle_message('u1', 'hola')
    assert text == 'ok'
