@echo off
start "SASS Watch" cmd /k "npm run sass"
timeout /t 1 /nobreak >nul
start "Live Server" cmd /k "npm start"

