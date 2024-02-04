import json
from typing import List
import ijson
from ..interfaces.action_service_interface import IActionService
import asyncio
from concurrent.futures import ThreadPoolExecutor

# Define constants
JSON_KEY_ACTIONS = "actions"
JSON_KEY_CODEWORD = "codeword"
JSON_KEY_ID = "id"
FILE_PATH = 'app/data/MOCK_DATA.json'

class ActionService(IActionService):
    def __init__(self, filepath: str = FILE_PATH):
        self.filepath = filepath

    async def get_action_id_by_codeword(self, codeword: int) -> str:
        """
        Asynchronously retrieves the action id associated with a given codeword.

        :param codeword: The codeword to search for in the actions array.
        :return: The action id associated with the codeword or None if not found.
        """
        def _search_codeword():
            with open(self.filepath, 'rb') as file:
                actions = ijson.items(file, f'{JSON_KEY_ACTIONS}.item')
                for action in actions:
                    if action.get(JSON_KEY_CODEWORD) == codeword:
                        return action.get(JSON_KEY_ID, "")
            return None

        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(None, _search_codeword)

    async def get_codewords_by_action_id(self, action_id: str) -> List[int]:
        """
        Asynchronously retrieves a list of codewords associated with a given action id.

        :param action_id: The action id to search for in the actions array.
        :return: A list of codewords associated with the action id, or an empty list if none are found.
        """
        def _search_action_id():
            codewords = []
            with open(self.filepath, 'rb') as file:
                actions = ijson.items(file, f'{JSON_KEY_ACTIONS}.item')
                for action in actions:
                    if action.get(JSON_KEY_ID) == action_id:
                        codewords.append(action.get(JSON_KEY_CODEWORD))
            return codewords

        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(None, _search_action_id)