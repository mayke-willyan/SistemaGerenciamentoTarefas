from flask import Blueprint, jsonify, request
from operacoesbd import *
from logica_tarefas import *

task_route = Blueprint('task_route', __name__)

@task_route.route('/register', methods=['POST'])
def register():
    try:

        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not name or not email or not password:
            return jsonify({"error": "Name, email, and password are required."}), 400

        result, status = register_user(name, email, password)

        return jsonify(result), status

    except Exception as e:
        return jsonify({"error": "An error occurred during registration."}), 500

@task_route.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"error": "Email and password are required."}), 400
        
        result, status = verify_login(email, password)
        return jsonify(result), status
    
    except Exception as e:
        return jsonify({"error": "An error occurred during login."}), 500