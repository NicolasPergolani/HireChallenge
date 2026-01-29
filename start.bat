@echo off
REM Notes Application Startup Script for Windows
REM This script sets up and starts the Notes application

setlocal enabledelayedexpansion

echo ==========================================
echo   Notes Application - Startup Script
echo ==========================================
echo.

REM Check if Node.js is installed
echo Checking requirements...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js v24 or higher.
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION% found

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed. Please install npm.
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm %NPM_VERSION% found

echo.
echo Setting up MongoDB...

REM Check if MongoDB service exists
sc query MongoDB >nul 2>nul
if %errorlevel% equ 0 (
    REM Check if MongoDB is running
    sc query MongoDB | find "RUNNING" >nul
    if %errorlevel% equ 0 (
        echo [OK] MongoDB is already running
    ) else (
        echo [INFO] Starting MongoDB service...
        net start MongoDB >nul 2>nul
        if %errorlevel% equ 0 (
            echo [OK] MongoDB started successfully
        ) else (
            echo [WARNING] Failed to start MongoDB. You may need administrator privileges.
            echo [INFO] Run this script as Administrator or start MongoDB manually.
            pause
        )
    )
) else (
    echo [WARNING] MongoDB service not found.
    echo [INFO] Please ensure MongoDB is installed and running.
    echo [INFO] Install with: winget install MongoDB.Server
    pause
)

echo.
echo Setting up Backend...

REM Navigate to backend directory
cd backend

REM Check if .env file exists
if not exist .env (
    echo [INFO] Creating .env file...
    (
        echo PORT=3000
        echo MONGODB_URI=mongodb://localhost:27017/notes-app
        echo NODE_ENV=development
    ) > .env
    echo [OK] .env file created
) else (
    echo [OK] .env file already exists
)

REM Install backend dependencies
if not exist node_modules (
    echo [INFO] Installing backend dependencies...
    call npm install
    echo [OK] Backend dependencies installed
) else (
    echo [OK] Backend dependencies already installed
)

echo.
echo ==========================================
echo   Starting Application
echo ==========================================
echo.
echo [OK] Backend server starting on http://localhost:3000
echo [INFO] API Health Check: http://localhost:3000/api/health
echo [INFO] Press Ctrl+C to stop the server
echo.

REM Start the backend server
call npm start
