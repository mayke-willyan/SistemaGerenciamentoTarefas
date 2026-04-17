from operacoesbd import *


def register_user(nome, email, senha):
    connection = criarConexao("localhost", "root", "Mayke@A1223145", "SysGerenciamentoTarefas")

    try:
    
        if not connection:
            return {"error": "Database connection failed."}, 500

       
        sql_search = "SELECT id FROM users WHERE email = %s"
        existing_user = listarBancoDados(connection, sql_search, (email,))

        if existing_user:
            return {"error": "This e-mail is already registered."}, 400
        
       
        sql_insert = "INSERT INTO users (nome, email, senha) VALUES (%s, %s, %s)"
        data = (nome, email, senha)
        new_user_id = insertNoBancoDados(connection, sql_insert, data)

        if new_user_id:
            return {"success": "User registered successfully.", "user_id": new_user_id}, 201
        else:
            return {"error": "Failed to register user."}, 500

    except Exception as e:
        
        print(f"Erro interno: {e}")
        return {"error": "An internal server error occurred."}, 500

    finally:
        
        if connection:
            encerrarConexao(connection)

def verify_login(email, password):
    connection = criarConexao("localhost", "root", "Mayke@A1223145", "sysgerenciamentotarefas")

    try:

        sql_search = "select id from users where email = %s and senha = %s"

        user = listarBancoDados(connection,sql_search, (email,password))

        if user:
            return {"success": "Login successful.", "user_id": user[0][0]}, 200
        else:
            return {"error": "Invalid email or password."}, 401
    
    except Exception as e:
        
        return {"error": "An error occurred during login."}, 500
    
    finally:
        if connection:
            encerrarConexao(connection)

def create_task(user_id, tittle, description):

    connection = criarConexao("localhost", "root", "Mayke@A1223145", "SysGerenciamentoTarefas")

    try:
         
        sql_insert = "insert into tasks (usuario_id, titulo, descricao) values (%s, %s, %s)"
        data = (user_id, tittle, description)


        new_task = insertNoBancoDados(connection, sql_insert, data)

        if new_task:
            return {"success": "Task created successfully.", "task_id": new_task}, 201
        else:
            return {"error": "Failed to create task."}, 500
    
    except Exception as e:

        return {"error": "An error occurred while creating the task."}, 500
    
    finally:

        if connection:
            encerrarConexao(connection)
       

def list_tasks(user_id):

    connection = criarConexao("localhost", "root", "Mayke@A1223145", "SysGerenciamentoTarefas")

    try:
         
         sql_search = "select id, titulo, descricao, status from tasks where usuario_id = %s"

         tasks = listarBancoDados(connection, sql_search, (user_id,))

         task_list = [{"id": task[0], "tittle": task[1], "description": task[2], "status": task[3]} for task in tasks]

         return {"tasks": task_list}, 200
    
    except Exception as e:

        return {"error": "An error occurred while listing tasks."}, 500
    
    finally:

        if connection:
            encerrarConexao(connection)

def delete_task(task_id, user_id):

    try:

        connection = criarConexao("localhost", "root", "Mayke@A1223145", "SysGerenciamentoTarefas")

        sql_delete = "delete from tasks where id = %s and usuario_id = %s"

        deleted_rows = excluirBancoDados(connection, sql_delete, (task_id, user_id))

        if deleted_rows > 0:
            
            return {"success": "Task deleted successfully."}, 200
        else:
            return {"error": "Task not found or you do not have permission to delete it."}, 404
    
    except Exception as e:

        return {"error": "An error occurred while deleting the task."}, 500
    
    finally:

        if connection:
            encerrarConexao(connection)

def alter_task_status(task_id, user_id, new_status):

    try:
        connection = criarConexao("localhost", "root", "Mayke@A1223145", "SysGerenciamentoTarefas")

        sql_update = "update tasks set status = %s where id = %s and usuario_id = %s"

        updated_rows = atualizarBancoDados(connection, sql_update, (new_status, task_id, user_id))

        if updated_rows > 0:
            return {"success": "Task status updated successfully."}, 200
        else:
            return {"error": "Task not found or you do not have permission to update it."}, 404
    
    except Exception as e:
        return {"error": "An error occurred while updating the task status."}, 500
    
    finally:

        if connection:
            encerrarConexao(connection)

        