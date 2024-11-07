from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, set_access_cookies
from flask_restx import Api, Resource, fields
from flask_migrate import Migrate
from flask_cors import CORS
from flask import Flask, jsonify, request

from datetime import datetime
from config import DevConfig
from models import Journal
from exts import db

import logging
import os


# ==================== CONFIGURATION ====================
# Flask
app = Flask(__name__)
app.config.from_object(DevConfig)
CORS(app, supports_credentials=True)

# Flask-JWT-Extended
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET')  # Set JWT Secret
app.config['JWT_TOKEN_LOCATION'] = ['cookies']  # Set token location to cookies
app.config['JWT_COOKIE_SECURE'] = True  # Set cookie to be secure
app.config['JWT_COOKIE_HTTP_ONLY'] = True  # Set cookie to be HTTP-only
jwt = JWTManager(app)

# Logging
try:
    open(file='./flask-server/app.log', mode="w").close()
    logging.basicConfig(filename='./flask-server/app.log', level=logging.DEBUG)
except FileNotFoundError:
    open(file='./app.log', mode="w").close()
    logging.basicConfig(filename='./app.log', level=logging.DEBUG)

# SQLAlchemy
db.init_app(app)

migrate = Migrate(app, db)

api = Api(app,doc='/docs')
journal_model=api.model(
    "journals", {
        "id":fields.Integer(),
        "title":fields.String(),
        "entry_text":fields.String(),
        "date":fields.String(),
        "emotion":fields.String()
    }
)


# ==================== JOURNAL ENDPOINTS ====================
@app.route("/create-journal", methods=["POST"])
@api.marshal_with(journal_model)
def create_journal():
    data = request.get_json()
    # formatting date time string to mm-dd-yyyy
    date_time_string = data.get('date_time')
    dt = datetime.strptime(date_time_string, "%Y-%m-%dT%H:%M:%S.%fZ")
    formatted_date = dt.strftime("%m-%d-%Y")
    new_journal=Journal(
        title=data.get('title'),
        entry_text=data.get('entry_text'),
        date=formatted_date,
        emotion=data.get('emotion')
    )
    new_journal.save()
    return new_journal, 201

@app.route("/get-all-journals", methods=["GET"])
@api.marshal_with(journal_model)
def get_all_journals():
    journals=Journal.query.all()
    return journals

# Single Journal by ID
@api.route('/journal/<int:id>')
class JournalResource(Resource):
    @api.marshal_with(journal_model)
    def get(self,id):
        """Get Journal"""
        journal=Journal.query.get_or_404(id)
        return journal
    
    @api.marshal_with(journal_model)
    def put(self,id):
        """Update Journal"""
        journal_to_update=Journal.query.get_or_404(id)
        data=request.get_json()
        journal_to_update.update(data.get('title'), data.get('entry_text'))
        return journal_to_update
    
    @api.marshal_with(journal_model)
    def delete(self,id):
       """Delete Journal"""
       journal_to_delete=Journal.query.get_or_404(id)
       journal_to_delete.delete()
       return journal_to_delete
    

@app.shell_context_processor
def make_shell_context():
    return{
        "db":db,
        "Journal" : Journal
    }


# ==================== LOG-IN ENDPOINTS ====================
@app.route("/login", methods=["POST"])
def create_token():
    username = request.json.get("username")
    password = request.json.get("password")
    
    # Add your user authentication logic here (searching database for a match)
    if username == 'admin' and password == 'admin':
        access_token = create_access_token(identity=username)
        resp = jsonify(message='Login successful')
        set_access_cookies(resp, access_token)
        return resp
    else:
        return jsonify(msg="Wrong username or password"), 401


@app.route('/protected', methods=['GET'])
@jwt_required(optional=True)
def protected():
    current_user = get_jwt_identity()
    if current_user is None:
        return jsonify(message=f'Not signed in'), 401

    return jsonify(message=f'Hello, {current_user}!'), 200


# ==================== HEALTH-CHECK ENDPOINT ====================
@app.route("/health")
def health_check():
    return 'OK', 200


# ==================== LAUNCH ====================
if __name__ == "__main__":
    app.run(debug=True, port=8080)
