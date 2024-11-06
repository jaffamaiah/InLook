
PYCACHE_PATH="./flask-server/__pycache__"
VENV_PATH="./flask-server/venv"
LOG_PATH="./flask-server/app.log"
DB_PATH="./flask-server/dev.db"

if [ -d "$PYCACHE_PATH" ]; then
  echo "Deleting pycache"
  rm -rf "$PYCACHE_PATH"
fi

if [ -d "$VENV_PATH" ]; then
  echo "Deleting venv"
  rm -rf "$VENV_PATH"
fi

if [ -f "$LOG_PATH" ]; then
  echo "Deleting log"
  rm "$LOG_PATH"
fi

if [ -f "$DB_PATH" ]; then
  echo "Deleting db"
  rm "$DB_PATH"
fi

echo "Setting up Python virtual environment in $VENV_PATH"
python3 -m venv "$VENV_PATH" && "$VENV_PATH"/bin/python -m pip install -r "$VENV_PATH/../requirements.txt"

echo "Installing Node requirements..."
cd "./front-end" && npm install

echo "Done!"
