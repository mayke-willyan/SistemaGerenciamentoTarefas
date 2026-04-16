from flask import Flask
from flask_cors import CORS
from rotas import  *

app = Flask(__name__)
CORS(app)

app.register_blueprint(task_route)

if __name__ == '__main__':
    app.run(debug=True)