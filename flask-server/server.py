from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, set_access_cookies
from flask_restx import Api, Resource, fields
from flask_migrate import Migrate
from flask_cors import CORS
from flask import Flask, jsonify, request

from datetime import datetime
from config import DevConfig
from models import Journal
from models import User
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

user_model=api.model(
    "user", {
        "id":fields.Integer(),
        "username":fields.String(),
        "email":fields.String(),
        "password":fields.String(),
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


# ==================== LOGIN ENDPOINT ====================
@app.route("/login", methods=["POST"])
@api.marshal_with(user_model)
def login_user():
    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.get('email')
    if user:
        if user.__repr__().find(password) != -1:
            access_token = create_access_token(identity=email)
            response_json = jsonify(message='Login successful')
            set_access_cookies(response_json, access_token)
            return response_json, 200
        else:
            return jsonify(msg="Wrong password!"), 401
    else:
        return jsonify(msg="User doesn't exist!"), 401

@app.route('/protected', methods=['GET'])
@jwt_required(optional=True)
def protected():
    current_user = get_jwt_identity()
    if current_user is None:
        return jsonify(message=f'Not signed in'), 401

    return jsonify(message=f'Hello, {current_user}!'), 200


# ==================== SIGN-UP ENDPOINT ====================
@app.route('/signup', methods=["POST"])
@api.marshal_with(user_model)
def signup_user():
        
        data = request.get_json()
        new_user = User(
            email=data.get('email'),
            username=data.get('username'),
            password=data.get('password')
        )

        # crashes when adding user to database
        new_user.save() # TODO

        return new_user, 201


# ==================== HEALTH-CHECK ENDPOINT ====================
@app.route("/health")
def health_check():
    return 'OK', 200


# ==================== LAUNCH ====================
if __name__ == "__main__":
    app.run(debug=True, port=8080)
