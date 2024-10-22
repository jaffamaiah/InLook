@ECHO OFF
set VENV_PATH=.\flask-server\venv

echo Setting up python virtual environment in %VENV_PATH%
python -m venv %VENV_PATH% && %VENV_PATH%\Scripts\python.exe -m pip install -r %VENV_PATH%\..\requirements.txt

echo Installing Node requirements...
cd .\front-end && npm install

echo Done!
