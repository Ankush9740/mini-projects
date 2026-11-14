@echo off
title GHIBLI WORLDS - Launcher
cd /d "%~dp0"

echo ========================================================
echo   GHIBLI WORLDS - A Magical Studio Ghibli Universe
echo ========================================================
echo   Starting local web server on http://localhost:8000 ...

netstat -ano | findstr :8000 | findstr LISTENING >nul
if %errorlevel% neq 0 (
    start /B python -m http.server 8000 --bind 127.0.0.1 >nul 2>&1
    timeout /t 1 /nobreak >nul
)

echo   Launching website with sound enabled by default...
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --autoplay-policy=no-user-gesture-required http://localhost:8000/
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --autoplay-policy=no-user-gesture-required http://localhost:8000/
) else if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --autoplay-policy=no-user-gesture-required http://localhost:8000/
) else (
    start http://localhost:8000/
)

echo   Ready! Website is running and playing music.
exit

