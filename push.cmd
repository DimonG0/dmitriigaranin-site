@echo off
cd /d "%~dp0"

echo ===============================
echo 🚀 PUSHING PROJECT TO GITHUB
echo ===============================

git add .

set MSG=auto: update %DATE% %TIME%
git commit -m "%MSG%"

git push

echo ===============================
echo ✅ DONE
echo ===============================
pause
