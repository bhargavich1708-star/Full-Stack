@echo off
echo ==========================================
echo   Starting Cute Spring Login Project...
echo ==========================================

:: Start the Backend
echo [1/2] Starting Spring Boot Backend...
start "Backend - Spring Boot" cmd /k "cd backend && mvn spring-boot:run"

:: Wait a moment for backend to initialize
timeout /t 5 /nobreak > nul

:: Start the Frontend
echo [2/2] Starting React Frontend...
start "Frontend - Vite" cmd /k "cd frontend && npm run dev"

echo.
echo ==========================================
echo   Project is launching!
echo   Backend: http://localhost:8080
echo   Frontend: http://localhost:5173
echo ==========================================
pause
