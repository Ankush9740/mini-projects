# GHIBLI WORLDS - PowerShell Launcher
$ErrorActionPreference = 'SilentlyContinue'

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  GHIBLI WORLDS - A Magical Studio Ghibli Universe" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan

# Check if port 8000 is listening
$portActive = Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue
if (-not $portActive) {
    Write-Host "Starting local web server on http://localhost:8000 ..." -ForegroundColor Yellow
    Start-Process -FilePath "python" -ArgumentList "-m http.server 8000 --bind 127.0.0.1" -WindowStyle Hidden
    Start-Sleep -Milliseconds 800
}

Write-Host "Launching website in browser with direct Autoplay enabled..." -ForegroundColor Green
$chromePaths = @(
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
)

$browserLaunched = $false
foreach ($path in $chromePaths) {
    if (Test-Path $path) {
        Start-Process -FilePath $path -ArgumentList "--autoplay-policy=no-user-gesture-required http://localhost:8000/"
        $browserLaunched = $true
        break
    }
}

if (-not $browserLaunched) {
    Start-Process "http://localhost:8000/"
}

Write-Host "Website launched! 'Always with Me' flute melody is playing by default." -ForegroundColor Cyan

