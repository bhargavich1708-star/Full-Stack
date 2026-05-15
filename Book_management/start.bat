@echo off
TITLE NightWave Books - Starting the Magic
echo ==========================================
echo    Waking up the Night Beach... 🌊🌕
echo ==========================================

:: Check if node_modules exists
if not exist node_modules (
    echo [1/3] Installing magical dependencies...
    cmd /c npm install
) else (
    echo [1/3] Dependencies already present.
)

:: Generate Prisma Client
echo [2/3] Aligning the stars (Prisma)...
cmd /c npx prisma generate

:: Start the Dev Server
echo [3/3] Igniting the bioluminescence...
echo.
echo Your library will be available at http://localhost:3000
echo.
cmd /c npm run dev
