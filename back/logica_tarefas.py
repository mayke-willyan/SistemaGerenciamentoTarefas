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