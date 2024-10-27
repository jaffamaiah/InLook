@ECHO OFF
set VENV_PATH=.\flask-server\venv
set DB_PATH=.\flask-server\dev.db

echo Deleting old files
rmdir .\flask-server\__pycache__
rmdir %VENV_PATH%
del %DB_PATH%

echo Setting up python virtual environment in %VENV_PATH%
python -m venv %VENV_PATH% && %VENV_PATH%\Scripts\python.exe -m pip install -r %VENV_PATH%\..\requirements.txt

echo Installing Node requirements...
cd .\front-end && npm install

echo Done!
