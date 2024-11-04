from flask import Flask, jsonify, request, redirect, url_for, request
from flask_restx import Api, Resource, fields
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from config import DevConfig
from models import Journal
from exts import db
from datetime import datetime
import logging
import os

# ==================== CONFIGURATION ====================
# Flask
app = Flask(__name__)
app.config.from_object(DevConfig)
CORS(app, supports_credentials=True)

# Flask-JWT-Extended
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET')
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


# ==================== LOGIN ENDPOINTS ====================
# @app.route("/login", methods=["POST"])
# def login_user():
#     username = request.json.get("username")
#     password = request.json.get("password")
    
#     if username == 'admin' and password == 'admin':
#         return {
#             "msg": "Login successful",
#             "redirect": "/"
#         }, 200
#     else:
#         return {
#             "msg": "Wrong username or password"
#         }, 401
    
@app.route("/login", methods=["POST"])
def create_token():
    username = request.json.get("username")
    password = request.json.get("password")
    
    # Add your user authentication logic here (searching database for a match)
    if username == 'admin' and password == 'admin':
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify(msg="Wrong username or password"), 401
    
# ==================== HEALTH-CHECK ENDPOINT ====================
@app.route("/health")
def health_check():
    return 'OK', 200

# ==================== LAUNCH ====================
if __name__ == "__main__":
    app.run(debug=True, port=8080)
