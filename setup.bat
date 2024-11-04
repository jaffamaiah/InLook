@ECHO OFF
set PYCACHE_PATH=.\flask-server\__pycache__
set VENV_PATH=.\flask-server\venv
set LOG_PATH=.\flask-server\app.log
set DB_PATH=.\flask-server\dev.db

echo Deleting old files
rmdir %PYCACHE_PATH%
rmdir %VENV_PATH%
del %LOG_PATH%
del %DB_PATH%

echo Setting up python virtual environment in %VENV_PATH%
python -m venv %VENV_PATH% && %VENV_PATH%\Scripts\python.exe -m pip install -r %VENV_PATH%\..\requirements.txt

echo Installing Node requirements...
cd .\front-end && npm install

echo Done!
