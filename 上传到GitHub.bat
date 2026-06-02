@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo   MemInsight Water - 上传到 GitHub
echo ========================================
echo.
echo 【第一步】请在浏览器中新建空仓库：
echo   https://github.com/new?name=MemInsight-Water
echo.
echo   仓库名必须是: MemInsight-Water
echo   不要勾选 Add a README / .gitignore
echo   创建完成后回到本窗口按任意键继续...
echo.
pause

git remote set-url origin https://github.com/yajuancai/MemInsight-Water.git

echo.
echo 【第二步】正在推送代码（会弹出 GitHub 登录窗口）...
echo   请用浏览器登录，或使用 Personal Access Token 作为密码
echo   不能用 QQ 邮箱密码直接登录 Git！
echo.
git push -u origin main

if errorlevel 1 (
  echo.
  echo [失败] 推送未成功。常见原因：
  echo   1. 还没在网页上创建 MemInsight-Water 仓库
  echo   2. 未登录 GitHub 或未使用 Token
  echo   3. 仓库名不是 MemInsight-Water
  echo.
  echo Token 创建: https://github.com/settings/tokens
  echo   勾选 repo 权限，复制 token，推送时密码处粘贴 token
  pause
  exit /b 1
)

echo.
echo [成功] 代码已上传！
echo.
echo 【第三步】打开 Actions 等待 Deploy to GitHub Pages 变绿：
echo   https://github.com/yajuancai/MemInsight-Water/actions
echo.
echo 【第四步】Settings - Pages - 选 gh-pages 分支 / root
echo   https://github.com/yajuancai/MemInsight-Water/settings/pages
echo.
echo 网站地址: https://yajuancai.github.io/MemInsight-Water/
echo.
pause
