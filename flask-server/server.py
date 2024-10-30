from flask import Flask, jsonify, request, redirect, url_for, request
from flask_restx import Api, Resource, fields
from flask_cors import CORS
from config import DevConfig
from models import Journal
from exts import db
from datetime import datetime
import logging

# ==================== CONFIGURATION ====================
app = Flask(__name__)
app.config.from_object(DevConfig)
CORS(app, supports_credentials=True)

try:
    open(file='./flask-server/app.log', mode="w").close()
    logging.basicConfig(filename='./flask-server/app.log', level=logging.DEBUG)
except FileNotFoundError:
    open(file='./app.log', mode="w").close()
    logging.basicConfig(filename='./app.log', level=logging.DEBUG)
    

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
@api.route('/write_journal')
class JournalsResource(Resource):
    @api.marshal_list_with(journal_model)
    def get(self):
        """Get all Journals"""
        journals=Journal.query.all()
        return journals
    @api.marshal_with(journal_model)    
    def post(self):
        """create new Journal"""
        data=request.get_json()
        new_journal=Journal(
            title=data.get('title'),
            entry_text=data.get('entry_text'),
            date='',  # TODO
            emotion=''  # TODO
        )
        new_journal.save()
        return new_journal, 201

#get journal by ID
@api.route('/journal/<int:id>')
class JournalResource(Resource):
    @api.marshal_with(journal_model)
    def get(self,id):
        """Get Journal by ID"""
        journal=Journal.query.get_or_404(id)
        return journal
    
    @api.marshal_with(journal_model)
    def put(self,id):
        """update a journal by ID"""
        journal_to_update=Journal.query.get_or_404(id)
        data=request.get_json()
        journal_to_update.update(data.get('title'), data.get('entry_text'))
        return journal_to_update
    
    @api.marshal_with(journal_model)
    def delete(self,id):
       """Delete a journal by ID"""
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
@app.route("/login", methods=["POST"])
def login_user():
    username = request.json.get("username")
    password = request.json.get("password")
    
    if username == 'admin' and password == 'admin':
        return {
            "msg": "Login successful",
            "redirect": "/"
        }, 200
    else:
        return {
            "msg": "Wrong username or password"
        }, 401


# # Members API Route
# @app.route("/journal_submit", methods=["POST"])
# def journal_submit():
#     title = request.json.get("title")
#     entry_text = request.json.get("entry_text")
#     date_time = request.json.get("date_time") # date_time is the datetime string from the frontend, while date is just the date in the desired format

#     # get date and put into mm/dd/yyyy format
#     date_time = date_time.strptime(date_time, "%Y-%m-%dT%H:%M:%S.%fZ")
#     date = date_time.strftime("%m") + "/" + date_time.strftime("%d") + "/" + date_time.strftime("%Y")

#     # # log values stored in journal object
#     app.logger.info('Journal title: %s', title)
#     app.logger.info('Journal entry text: %s', entry_text)
#     app.logger.info('Journal date: %s', date)
    
#     return {
#         "msg": "Journal created"
#     }, 200


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return 'OK', 200

# ==================== LAUNCH ====================
if __name__ == "__main__":
    app.run(debug=True, port=8080)
