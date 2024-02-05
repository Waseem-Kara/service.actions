@echo off
SETLOCAL

:: Store the directory of the batch file in a variable
SET "BASEPATH=%~dp0"

:: Navigate to the FastAPI backend directory relative to the batch file and start it
cd /d "%BASEPATH%actions_api"
call pip install -r requirements.txt
start call python app\main.py

:: Navigate to the React frontend directory relative to the batch file and start it
cd /d "%BASEPATH%ui\actions-ui"
call npm install
start call npm start

ENDLOCAL