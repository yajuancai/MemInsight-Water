@echo off
chcp 65001 >nul
cd /d "%~dp0"

where npm >nul 2>&1
if errorlevel 1 (
  echo [错误] 未找到 Node.js / npm。请先安装: https://nodejs.org/
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo 正在安装依赖...
  call npm install
  if errorlevel 1 pause & exit /b 1
)

echo ========================================
echo   Membraneinsight water 本地网站
echo   启动后会自动打开浏览器
echo   地址: http://localhost:5173
echo   关闭本窗口即可停止服务
echo ========================================
echo.
call npm run dev
pause
