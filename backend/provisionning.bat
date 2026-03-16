@echo off
setlocal enabledelayedexpansion

echo ============================================================
echo   FormaLabs — Provisioning de la base de donnees mysqlsh
echo ============================================================
echo.

REM --- Parametres de connexion (modifiez selon votre config) ---
set DB_HOST=localhost
set DB_PORT=3306
set DB_USER=root
set DB_NAME=formalabs

REM --- Chemin vers mysqlsh.exe (ajoutez le votre si different) ---
set mysqlsh_BIN=mysqlsh
where mysqlsh >nul 2>&1
if errorlevel 1 (
    REM Tentative chemin XAMPP
    if exist "C:\xampp\mysqlsh\bin\mysqlsh.exe" (
        set mysqlsh_BIN=C:\xampp\mysqlsh\bin\mysqlsh.exe
    ) else if exist "C:\Program Files\mysqlsh\mysqlsh Server 8.0\bin\mysqlsh.exe" (
        set mysqlsh_BIN=C:\Program Files\mysqlsh\mysqlsh Server 8.0\bin\mysqlsh.exe
    ) else if exist "C:\Program Files\mysqlsh\mysqlsh Server 5.7\bin\mysqlsh.exe" (
        set mysqlsh_BIN=C:\Program Files\mysqlsh\mysqlsh Server 5.7\bin\mysqlsh.exe
    ) else (
        echo [ERREUR] mysqlsh.exe introuvable. Ajoutez mysqlsh a votre PATH ou modifiez
        echo          la variable mysqlsh_BIN dans ce fichier.
        pause
        exit /b 1
    )
)

echo Connexion : %DB_USER%@%DB_HOST%:%DB_PORT%
echo Base      : %DB_NAME%
echo Script    : provisioning.sql
echo.

REM --- Demande du mot de passe (laissez vide si aucun) ---
set /p DB_PASS="Mot de passe mysqlsh (laisser vide si aucun) : "

echo.
echo [1/2] Execution du script SQL...

if "!DB_PASS!"=="" (
    "%mysqlsh_BIN%" -h %DB_HOST% -P %DB_PORT% -u %DB_USER% -f provisioning.sql
) else (
    "%mysqlsh_BIN%" -h %DB_HOST% -P %DB_PORT% -u %DB_USER% -p"!DB_PASS!" -f provisioning.sql
)

if errorlevel 1 (
    echo.
    echo [ERREUR] Le script SQL a echoue. Verifiez vos identifiants et que mysqlsh est demarre.
    pause
    exit /b 1
)

echo [OK] Base de donnees initialisee avec succes.
echo.

echo [2/2] Verification du contenu insere...
if "!DB_PASS!"=="" (
    "%mysqlsh_BIN%" -h %DB_HOST% -P %DB_PORT% -u %DB_USER% %DB_NAME% -e "SELECT 'labs' AS table_name, COUNT(*) AS nb FROM labs UNION ALL SELECT 'types_machine', COUNT(*) FROM types_machine UNION ALL SELECT 'machine', COUNT(*) FROM machine UNION ALL SELECT 'type_projet', COUNT(*) FROM type_projet UNION ALL SELECT 'Projets', COUNT(*) FROM Projets;"
) else (
    "%mysqlsh_BIN%" -h %DB_HOST% -P %DB_PORT% -u %DB_USER% -p"!DB_PASS!" %DB_NAME% -e "SELECT 'labs' AS table_name, COUNT(*) AS nb FROM labs UNION ALL SELECT 'types_machine', COUNT(*) FROM types_machine UNION ALL SELECT 'machine', COUNT(*) FROM machine UNION ALL SELECT 'type_projet', COUNT(*) FROM type_projet UNION ALL SELECT 'Projets', COUNT(*) FROM Projets;"
)

echo.
echo ============================================================
echo   Provisioning termine ! Vous pouvez demarrer le backend.
echo   cd backend ^&^& npm install ^&^& node server.js
echo ============================================================
echo.
pause