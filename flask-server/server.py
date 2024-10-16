from flask import Flask, jsonify, request, redirect, url_for
from flask_cors import CORS


app = Flask(__name__)

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
