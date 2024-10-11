from flask import Flask, jsonify

app = Flask(__name__)

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
