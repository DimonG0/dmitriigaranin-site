@echo off
setlocal EnableExtensions EnableDelayedExpansion

cd /d "%~dp0"

set "DRY_RUN=0"
set "SKIP_CHECKS=0"

if /i "%~1"=="--dry-run" set "DRY_RUN=1"
if /i "%~2"=="--dry-run" set "DRY_RUN=1"
if /i "%~1"=="--skip-checks" set "SKIP_CHECKS=1"
if /i "%~2"=="--skip-checks" set "SKIP_CHECKS=1"

echo.
echo ==========================================
echo  Professional Git publish assistant
echo ==========================================
echo.

where git >nul 2>nul
if errorlevel 1 (
  set "FAIL_MSG=Git is not installed or is not available in PATH."
  goto fail
)

git rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 (
  set "FAIL_MSG=This folder is not a Git repository."
  goto fail
)

for /f "delims=" %%B in ('git branch --show-current') do set "BRANCH=%%B"
if not defined BRANCH (
  set "FAIL_MSG=Detached HEAD detected. Switch to a branch before publishing."
  goto fail
)

echo Branch: !BRANCH!
echo.
git status --short

if "!DRY_RUN!"=="1" (
  echo.
  call :build_auto_message worktree
  echo Dry run mode: no files were staged, committed, or pushed.
  echo Suggested commit message: !AUTO_MSG!
  goto success
)

call :run_checks
if errorlevel 1 (
  set "FAIL_MSG=Project checks failed. Nothing was committed or pushed."
  goto fail
)

echo.
echo Staging project changes...
git add -A
if errorlevel 1 (
  set "FAIL_MSG=Could not stage files."
  goto fail
)

git diff --cached --quiet --exit-code
if not errorlevel 1 (
  echo No file changes to commit.
  goto push_changes
)

call :build_auto_message staged
if not defined AUTO_MSG set "AUTO_MSG=chore: update project"

echo.
echo Suggested commit message:
echo   !AUTO_MSG!
echo.
call :commit_with_message
if errorlevel 1 (
  set "FAIL_MSG=Commit failed."
  goto fail
)

:push_changes
echo.
git remote get-url origin >nul 2>nul
if errorlevel 1 (
  set "FAIL_MSG=Remote 'origin' is not configured."
  goto fail
)

git rev-parse --abbrev-ref --symbolic-full-name "@{u}" >nul 2>nul
if errorlevel 1 (
  echo No upstream branch found. Creating origin/!BRANCH!...
  git push -u origin "!BRANCH!"
  if errorlevel 1 (
    set "FAIL_MSG=Push failed."
    goto fail
  )
  goto success
)

echo Checking remote branch state...
git fetch --quiet
if errorlevel 1 (
  set "FAIL_MSG=Could not fetch remote state."
  goto fail
)

set "AHEAD=0"
set "BEHIND=0"
for /f "tokens=1,2" %%A in ('git rev-list --left-right --count HEAD...@{u} 2^>nul') do (
  set "AHEAD=%%A"
  set "BEHIND=%%B"
)

if not "!BEHIND!"=="0" (
  echo.
  echo Remote branch has !BEHIND! newer commit(s).
  set "PULL_CHOICE="
  set /p "PULL_CHOICE=Pull with rebase before pushing? [y/N]: "
  if /i "!PULL_CHOICE!"=="y" (
    git pull --rebase --autostash
    if errorlevel 1 (
      set "FAIL_MSG=Rebase failed. Resolve conflicts, then run this script again."
      goto fail
    )
  ) else (
    set "FAIL_MSG=Push cancelled because the remote branch is ahead."
    goto fail
  )
)

echo.
echo Pushing to origin/!BRANCH!...
git push
if errorlevel 1 (
  set "FAIL_MSG=Push failed."
  goto fail
)

:success
echo.
echo ==========================================
echo  Done
echo ==========================================
echo.
pause
exit /b 0

:commit_with_message
setlocal DisableDelayedExpansion
set "CUSTOM_MSG="
set /p "CUSTOM_MSG=Press Enter to use it, or type your own message: "
if not defined CUSTOM_MSG goto commit_auto_message
echo.
echo Creating commit...
git commit -m "%CUSTOM_MSG%"
set "COMMIT_RESULT=%ERRORLEVEL%"
endlocal & exit /b %COMMIT_RESULT%

:commit_auto_message
endlocal
echo.
echo Creating commit...
git commit -m "!AUTO_MSG!"
exit /b %ERRORLEVEL%

:run_checks
if "!SKIP_CHECKS!"=="1" (
  echo.
  echo Checks skipped by --skip-checks.
  exit /b 0
)

if not exist package.json (
  echo.
  echo No package.json found. Skipping project checks.
  exit /b 0
)

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo.
  echo npm.cmd was not found. Skipping project checks.
  exit /b 0
)

if not exist node_modules (
  echo.
  echo node_modules is missing. Run npm install when needed. Skipping project checks.
  exit /b 0
)

echo.
echo Running lint check...
call npm.cmd run lint --if-present
if errorlevel 1 exit /b 1

echo.
echo Running production build...
call npm.cmd run build --if-present
if errorlevel 1 exit /b 1

exit /b 0

:build_auto_message
set "AUTO_MSG="
set "AREAS="
set "AREAS_SEEN="
set "COUNT=0"

if /i "%~1"=="staged" (
  for /f "usebackq delims=" %%F in (`git diff --cached --name-only`) do call :collect_area "%%F"
) else (
  for /f "usebackq delims=" %%F in (`git diff --name-only`) do call :collect_area "%%F"
  for /f "usebackq delims=" %%F in (`git ls-files --others --exclude-standard`) do call :collect_area "%%F"
)

if not defined AREAS set "AREAS=project"
set "FILE_WORD=files"
if "!COUNT!"=="1" set "FILE_WORD=file"
set "AUTO_MSG=chore: update !AREAS! (!COUNT! !FILE_WORD!)"
exit /b 0

:collect_area
set /a COUNT+=1
set "FILE=%~1"
set "AREA=project"

if /i "!FILE!"=="push.cmd" set "AREA=publish workflow"
if /i "!FILE!"=="package.json" set "AREA=dependencies"
if /i "!FILE!"=="package-lock.json" set "AREA=dependencies"
if /i "!FILE:~0,4!"=="src/" set "AREA=app"
if /i "!FILE:~0,10!"=="src/pages/" set "AREA=pages"
if /i "!FILE:~0,15!"=="src/components/" set "AREA=components"
if /i "!FILE:~0,8!"=="src/lib/" set "AREA=logic"
if /i "!FILE:~0,10!"=="src/styles" set "AREA=styles"
if /i "!FILE!"=="src/index.css" set "AREA=styles"
if /i "!FILE:~0,7!"=="public/" set "AREA=assets"
if /i "!FILE!"=="src/pages/portfolio.jsx" set "AREA=portfolio"
if /i "!FILE!"=="src/lib/copy.ts" set "AREA=site copy"

call :add_area "!AREA!"
exit /b 0

:add_area
set "AREA_TO_ADD=%~1"
echo ;!AREAS_SEEN!; | findstr /i /c:";!AREA_TO_ADD!;" >nul
if errorlevel 1 (
  if defined AREAS (
    set "AREAS=!AREAS!, !AREA_TO_ADD!"
  ) else (
    set "AREAS=!AREA_TO_ADD!"
  )
  set "AREAS_SEEN=!AREAS_SEEN!;!AREA_TO_ADD!"
)
exit /b 0

:fail
echo.
echo ==========================================
echo  Error
echo ==========================================
echo !FAIL_MSG!
echo.
pause
exit /b 1
