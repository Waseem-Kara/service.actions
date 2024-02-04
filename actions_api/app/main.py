from fastapi import FastAPI
from .controllers import action_controller

app = FastAPI()

app.include_router(action_controller.router)