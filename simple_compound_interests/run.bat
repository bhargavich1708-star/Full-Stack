@echo off
echo Starting Interest Calculator Microservices...
echo Installing root dependencies (concurrently)...
call npm install
echo.
echo Launching all services...
echo Gateway: http://localhost:3000
echo Frontend: http://localhost:5173
echo.
npm start
pause
