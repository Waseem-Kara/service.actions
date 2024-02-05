from .services.action_service import ActionService
from .services.json_manager_service import JsonManagerService

# This function now correctly provides all dependencies required by ActionService
def get_action_service():
    # Initialize the JSONFileHandler with the path to your JSON file
    json_manager_service = JsonManagerService(filepath='app/data/actions.json')
    # Pass the json_file_handler instance when creating ActionService
    return ActionService(json_manager_service)