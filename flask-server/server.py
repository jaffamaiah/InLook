from flask import Flask, jsonify, request, redirect, url_for, request
from flask_restx import Api, Resource, fields
from flask_migrate import Migrate
from flask_cors import CORS
from config import DevConfig
from models import Journal
from models import User
from exts import db
from datetime import datetime
import logging

# ==================== CONFIGURATION ====================
# Flask
app = Flask(__name__)
app.config.from_object(DevConfig)
CORS(app, supports_credentials=True)

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
    data=request.get_json()
    new_journal=Journal(
        title=data.get('title'),
        entry_text=data.get('entry_text'),
        date='',  # TODO
        emotion=''  # TODO
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
            # Authentication token # TODO
            return {
            "msg": "Login successful",
            "redirect": "/"
            }, 200
        else:
            return {
            "msg": "Incorrect password"
            }, 401
    else:
        return {
            "msg": "No such user!"
        }, 401

# ==================== SIGN-UP ENDPOINT ====================

# ==================== HEALTH-CHECK ENDPOINT ====================
@app.route("/health")
def health_check():
    return 'OK', 200

# ==================== LAUNCH ====================
if __name__ == "__main__":
    app.run(debug=True, port=8080)
