from abc import ABC, abstractmethod

class IActionService(ABC):

    @abstractmethod
    async def get_action_id_by_codeword(self, codeword: int) -> str:
        pass

    @abstractmethod
    async def get_codewords_by_action_id(self, action_id: str) -> list:
        pass