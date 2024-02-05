from abc import ABC, abstractmethod

class IJsonManagerService(ABC):
    def __init__(self, filepath: str):
        self.filepath = filepath

    @abstractmethod
    async def read_items_stream(self, prefix: str) -> str:
        pass