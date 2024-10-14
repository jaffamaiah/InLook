from flask import Flask, jsonify
from flask_restx import Api, Resource
from config import DevConfig
app = Flask(__name__)



app.config.from_object(DevConfig)
api=Api(app,doc= '/docs')


@api.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}

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
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    return response

if __name__ == "__main__":
    app.run(debug=True)
