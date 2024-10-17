VENV_PATH=./flask-server/venv

echo Setting up python virtual environment in $VENV_PATH...
python3 -m venv $VENV_PATH && source $VENV_PATH/bin/activate && pip install -r "$VENV_PATH/../requirements.txt"

echo Installing Node requirements...
cd .\front-end && npm install

echo Done!