@ECHO OFF
set PYCACHE_PATH=.\flask-server\__pycache__
set VENV_PATH=.\flask-server\venv
set LOG_PATH=.\flask-server\app.log
set DB_PATH=.\flask-server\dev.db

if exist %PYCACHE_PATH%\ (
    echo Deleting pycache
    rmdir /s /q %PYCACHE_PATH%
)

if exist %VENV_PATH%\ (
    echo Deleting venv
    rmdir /s /q %VENV_PATH%
)

if exist %LOG_PATH% (
    echo Deleting log
    del %LOG_PATH%
)

if exist %DB_PATH% (
    echo Deleting db
    del %DB_PATH%
)

echo Setting up python virtual environment in %VENV_PATH%
python -m venv %VENV_PATH% && %VENV_PATH%\Scripts\python.exe -m pip install -r %VENV_PATH%\..\requirements.txt

echo Installing Node requirements...
cd .\front-end && npm install

echo Done!
