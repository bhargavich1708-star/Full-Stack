@echo off
title Square Calculator Launcher
echo ========================================
echo   Launching Square Area Calculator
echo ========================================

echo.
echo [1/2] Starting Spring Boot Backend...
start "Backend - Spring Boot" cmd /k "cd backend && mvn spring-boot:run"

echo.
echo [2/2] Starting React Frontend (Installing dependencies first)...
start "Frontend - React" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ========================================
echo   SUCCESS: Both processes are starting!
echo   - Backend: http://localhost:8080
echo   - Frontend: http://localhost:5173
echo ========================================
echo.
pause
