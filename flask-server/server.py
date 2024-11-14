from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, set_access_cookies
from flask_restx import Api, Resource, fields
from flask_migrate import Migrate
from flask_cors import CORS
from flask import Flask, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash

from datetime import datetime
import logging
import os

from config import DevConfig
from models import Journal, User
from exts import db


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
        "email":fields.String(),
        "username":fields.String(),
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
    if journals == []:
        return journals, 404
    else:
        return journals, 200


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

# search journal by emotion
# ex: http://localhost:8080/emotion-search?emotion=happy
@app.route("/emotion-search", methods=["GET"])
@api.marshal_with(journal_model)
def search_journals():
    # Get the emotion from the query parameters
    emotion = request.args.get("emotion")

    if not emotion:
        return jsonify(msg="Emotion parameter is required"), 400

    # Query the Journal model to find entries with the matching emotion
    journals = Journal.query.filter_by(emotion=emotion).all()

    if not journals:
        return jsonify(msg="No journal entries found with that emotion"), 404

    return journals, 200

#search journal by keyword
# ex: http://localhost:8080/title-search?keyword=happy
@app.route("/title-search", methods=["GET"])
@api.marshal_with(journal_model)
def search_journals_by_title():
    # Get the keyword from the query parameters
    keyword = request.args.get("keyword")

    if not keyword:
        return jsonify(msg="Keyword parameter is required"), 400

    # Use the `like` operator for partial matching
    search_pattern = f"%{keyword}%"
    journals = Journal.query.filter(Journal.title.like(search_pattern)).all()

    if not journals:
        return jsonify(msg="No journal entries found with that keyword in the title"), 404

    return journals, 200

# ==================== LOGIN ENDPOINT ====================
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.get({'email':email})
    if user is None:
        return jsonify(msg="User doesn't exist!"), 401
    
    if check_password_hash(user.password, password):
        access_token = create_access_token(identity=email)
        response_json = jsonify(msg='Login successful')
        set_access_cookies(response_json, access_token)
        return response_json, 200
    else:
        return jsonify(msg="Wrong password!"), 401

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    if current_user is None:
        return jsonify(msg='Not signed in'), 401

    return jsonify(msg=('Hello, %s!' % current_user)), 200


# ==================== SIGN-UP ENDPOINT ====================
@app.route('/signup', methods=["POST"])
def signup_user():
        data = request.get_json()
        try:
            new_user = User(
                username=data.get('username'),
                email=data.get('email'),
                password=generate_password_hash(data.get('password'))
            )
            new_user.save()
        except:
            return jsonify(msg="An account with that email already exists!"), 403

        return jsonify(msg=("Successfully created account with email \'%s\'" % data.get('email'))), 201


# ==================== HEALTH-CHECK ENDPOINT ====================
@app.route("/health")
def health_check():
    return 'OK', 200


# ==================== LAUNCH ====================
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, port=8080)
