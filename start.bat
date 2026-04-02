@echo off
title CS2 Demo Hub Launcher
echo.
echo  ==============================
echo   CS2 Demo Hub - Starting...
echo  ==============================
echo.

echo [1/2] Starting Backend...
start "CS2 Backend" cmd /k "cd backend && npm run dev"

echo [2/2] Starting Frontend...
start "CS2 Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Waiting for servers to start...
timeout /t 5 /nobreak

echo Opening browser...
start http://localhost:5173

echo.
echo Done! CS2 Demo Hub is running.
echo Backend:  http://localhost:3001
echo Frontend: http://localhost:5173
echo.
pause
