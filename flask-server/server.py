from flask import Flask, jsonify, request, redirect, url_for


app = Flask(__name__)

# Login route - DOES NOT WORK YET
@app.route("/login", methods=["POST"])
def login_user():
    username = request.json["username"]
    password = request.json["password"]
  
    if username == 'admin' and password == 'admin':
        return redirect(url_for('Home'))
    else:
        return {"msg": "Wrong email or password"}, 401

# Members API Route
@app.route("/people_endpoint")
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
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:8080')
    return response

if __name__ == "__main__":
    app.run(debug=True)
