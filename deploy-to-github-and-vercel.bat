@echo off
echo ============================================
echo GitHub Repository Setup for Vercel Deploy
echo ============================================
echo.

REM Set your GitHub username
set GH_USERNAME=muhabura32-crypto

REM Set your repository name (change this as needed)
set REPO_NAME=portfolio

echo Step 1: Creating new GitHub repository...
echo Please go to: https://github.com/new
echo.
echo Create a new repository named "%REPO_NAME%" (public)
echo IMPORTANT: DO NOT initialize with README, .gitignore, or license
echo After creating, copy the repository URL
echo.

set /p REPO_URL="Paste your GitHub repository URL here: "

echo.
echo Step 2: Connecting and pushing to GitHub...
echo.

cd /d "%~dp0"

git remote add origin %REPO_URL%
git branch -M main
git push -u origin main

echo.
echo ============================================
echo Deployment Instructions for Vercel:
echo ============================================
echo.
echo 1. Go to https://vercel.com
echo 2. Sign in with your GitHub account
echo 3. Click "Add New Project"
echo 4. Select your repository "%REPO_NAME%"
echo 5. Configure settings:
echo    - Framework Preset: Next.js
echo    - Build Command: next build
echo    - Output Directory: .next
echo 6. Click "Deploy"
echo.
echo Your Vercel URL will be something like:
echo https://%GH_USERNAME%-%REPO_NAME%.vercel.app
echo.
echo ============================================
pause
