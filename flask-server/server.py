from flask import Flask, jsonify, request, redirect, url_for, request
from flask_restx import Api, Resource, fields
from flask_cors import CORS
from config import DevConfig
from models import Journal
from exts import db

app = Flask(__name__)
app.config.from_object(DevConfig)

db.init_app(app)

api = Api(app,doc='/docs')

#model serializes class
journal_model=api.model(
    "Journal", {
        "id":fields.Integer(),
        "title":fields.String(),
        "description":fields.String()
    }
)


@api.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}


@api.route('/journals')
class JournalsResource(Resource):
    @api.marshal_list_with(journal_model)
    #http methods
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
            description=data.get('description')
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
        journal_to_update.update(data.get('title'), data.get('description'))
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

CORS(app, supports_credentials=True) # allows app to get past 'Access-Control-Allow-Origin' check

# Login route
@app.route("/login", methods=["POST"])
def login_user():
    username = request.json.get("username")
    password = request.json.get("password")
  
    if username == 'admin' and password == 'admin':
        return jsonify({"msg": "Login successful", "redirect": "/people"}), 200
    else:
        return {"msg": "Wrong username or password"}, 401

# Members API Route
@app.route("/people")
def members():
    response = jsonify([
        {
            "name": "Arman",
            "id": 1,
            "job": "backend"
        },
        {
            "name": "Heather",
            "id": 2,
            "job": "backend"
        },
        {
            "name": "Maiah",
            "id": 3,
            "job": "frontend"
        },
        {
            "name": "Tomas",
            "id": 4,
            "job": "frontend"
        },
    ])
    return response

if __name__ == "__main__":
    app.run(debug=True, port=8080)
