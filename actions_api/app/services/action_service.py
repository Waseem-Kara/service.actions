from typing import List
from ..interfaces.action_service_interface import IActionService
from ..interfaces.json_manager_service_interface import IJsonManagerService
import asyncio

# Define constants
JSON_KEY_ACTIONS = "actions"
JSON_KEY_CODEWORD = "codeword"
JSON_KEY_ID = "id"

class ActionService(IActionService):
    def __init__(self, json_manager_service: IJsonManagerService):
        self.json_file_handler = json_manager_service

    async def get_action_id_by_codeword(self, codeword: int) -> str:
        """
        Asynchronously retrieves the action id associated with a given codeword.

        :param codeword: The codeword to search for in the actions array.
        :return: The action id associated with the codeword or None if not found.
        """
        def _search_codeword():
            actions, file_stream = self.json_file_handler.read_items_stream(f'{JSON_KEY_ACTIONS}.item')
            try:
                for action in actions:
                    if action.get(JSON_KEY_CODEWORD) == codeword:
                        return action.get(JSON_KEY_ID, "")
            finally:
                file_stream.close()  # Ensure the file is closed after processing
            return None

        return await asyncio.get_running_loop().run_in_executor(None, _search_codeword)

    async def get_codewords_by_action_id(self, action_id: str) -> List[int]:
        """
        Asynchronously retrieves a list of codewords associated with a given action id.

        :param action_id: The action id to search for in the actions array.
        :return: A list of codewords associated with the action id, or an empty list if none are found.
        """
        def _search_action_id():
            codewords = []
            actions, file_stream = self.json_file_handler.read_items_stream(f'{JSON_KEY_ACTIONS}.item')
            try:
                for action in actions:
                    if action.get(JSON_KEY_ID) == action_id:
                        codewords.append(action.get(JSON_KEY_CODEWORD))
            finally:
                file_stream.close() 
            return codewords

        return await asyncio.get_running_loop().run_in_executor(None, _search_action_id)