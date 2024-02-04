from app.interfaces.action_service_interface import IActionService

class MockActionService(IActionService):
    async def get_action_id_by_codeword(self, codeword: int) -> str:
        if codeword == 5001:
            return "alert"
        return None

    async def get_codewords_by_action_id(self, action_id: str) -> set:
        if action_id == "alert":
            return {5001}
        return set()