
VENV_PATH=./flask-server/venv
DB_PATH=./flask-server/dev.db

echo Deleting old files
rm $VENV_PATH
rm $DB_PATH

echo Setting up python virtual environment in $VENV_PATH...
python3 -m venv $VENV_PATH && source $VENV_PATH/bin/activate && pip install -r "$VENV_PATH/../requirements.txt"

echo Installing Node requirements...
cd ./front-end && npm install

echo Done!
