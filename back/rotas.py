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

@task_route.route('/tasks', methods=['POST'])
def create_task_route():

    try:

        data = request.get_json()

        user_id = data.get('user_id')
        title = data.get('title')
        description = data.get('description')

        if not user_id or not title or not description:
            return jsonify({"error": "User ID, title, and description are required."}), 400
        
        result, status = create_task(user_id, title, description)
        return jsonify(result), status
    
    except Exception as e:
        return jsonify({"error": "An error occurred while creating the task."}), 500
    

@task_route.route('/tasks/<int:user_id>', methods=['GET'])
def get_tasks(user_id):

    try:

        result, status = list_tasks(user_id)

        return jsonify(result), status
    
    except Exception as e:

        return jsonify({"error": "An error occurred while fetching tasks."}), 500

@task_route.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task_route(task_id):

    try:

        data = request.get_json()
        user_id = data.get('user_id')


        if not user_id:
            return jsonify({"error": "User ID is required."}), 400
        
        result, status = delete_task(task_id, user_id)
        return jsonify(result), status
    
    except Exception as e:

        return jsonify({"error": "An error occurred while deleting the task."}), 500
    
@task_route.route("/tasks/<int:task_id>", methods=["PATCH"])
def update_task_status(task_id):

    try:

        data = request.get_json()
        user_id = data.get('user_id')

        if not user_id:
            return jsonify({"error": "User ID is required."}), 400
        
        result,status = alter_task_status(task_id, user_id)

        return jsonify(result), status

    except Exception as e:

        return jsonify({"error": "An error occurred while updating the task status rotas."}), 500
