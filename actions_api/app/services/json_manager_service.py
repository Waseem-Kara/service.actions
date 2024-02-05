import ijson
from ..interfaces.json_manager_service_interface import IJsonManagerService

class JsonManagerService(IJsonManagerService):
    def __init__(self, filepath: str):
        self.filepath = filepath

    def read_items_stream(self, prefix: str):        
        file_stream = open(self.filepath, 'rb')
        return ijson.items(file_stream, prefix), file_stream