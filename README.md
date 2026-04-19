Com certeza. Aqui está o conteúdo integral para o seu arquivo `README.md`, formatado corretamente em Markdown (MD), consolidando todos os arquivos, a estrutura do projeto, a documentação da API e o guia de instalação.

Pode copiar o bloco abaixo:

```markdown
# 📅 TaskForce - Gerenciador de Tarefas Full Stack

O **TaskForce** é uma aplicação completa voltada para o gerenciamento de produtividade pessoal. O sistema oferece uma interface moderna com autenticação de usuários e um painel dinâmico para operações de CRUD (Criar, Ler, Atualizar e Deletar) de tarefas, com persistência de dados em banco relacional MySQL.

---

## 🛠️ Tecnologias Utilizadas

### **Backend**
* **Python 3.x**
* **Flask** (Framework principal)
* **Flask-CORS** (Comunicação entre Front e Back)
* **MySQL Connector** (Driver de conexão com o Banco de Dados)

### **Frontend**
* **HTML5 & CSS3** (Interface com design *Dark Mode* e Glassmorphism)
* **JavaScript (ES6+)** (Arquitetura modular e Fetch API)
* **LocalStorage** (Manutenção de sessão do usuário)

---

## 📂 Estrutura de Arquivos

```text
TASKFORCE/
├── backend/
│   ├── app.py             # Entrada da API Flask e configuração do CORS
│   ├── rotas.py           # Endpoints e Blueprints da aplicação
│   ├── logica_tarefas.py  # Funções de negócio (Auth e CRUD)
│   └── operacoesbd.py     # Camada de abstração do Banco de Dados
├── frontend/
│   ├── index.html         # Estrutura da interface do usuário
│   ├── style.css          # Estilização visual (Variáveis e Layout)
│   ├── script.js          # Controller principal e eventos
│   ├── login.js           # Módulo de requisições de login
│   ├── register.js        # Módulo de requisições de cadastro
│   ├── tasks.js           # Módulo de comunicação com a API de tarefas
│   └── ui.js              # Módulo de renderização dinâmica do DOM
└── database/
    └── schema.sql         # Script de inicialização do banco de dados
```

---

## 📑 Documentação da API

### **Autenticação**
* `POST /register`: Cria um novo usuário (campos: `name`, `email`, `password`).
* `POST /login`: Valida as credenciais e retorna o `user_id`.

### **Gerenciamento de Tarefas**
* `GET /tasks/<user_id>`: Retorna todas as tarefas vinculadas ao usuário.
- `POST /tasks`: Cria uma nova tarefa (campos: `user_id`, `title`, `description`).
- `PATCH /tasks/<task_id>`: Alterna o status da tarefa (0 para Pendente, 1 para Concluída).
- `DELETE /tasks/<task_id>`: Remove a tarefa permanentemente.

---

## ⚙️ Instalação e Configuração

### **1. Banco de Dados**
Crie um banco de dados MySQL chamado `SysGerenciamentoTarefas` e execute o script abaixo:

```sql
CREATE DATABASE SysGerenciamentoTarefas;
USE SysGerenciamentoTarefas;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    status TINYINT(1) DEFAULT 0,
    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### **2. Configuração do Backend**
1. Navegue até a pasta `/backend`.
2. Instale as dependências:
   ```bash
   pip install flask flask-cors mysql-connector-python
   ```
3. No arquivo `logica_tarefas.py`, configure suas credenciais do MySQL:
   - `host`, `user`, `password` (Ex: "root", "SuaSenha").
4. Inicie o servidor:
   ```bash
   python app.py
   ```

### **3. Execução do Frontend**
Devido ao uso de **JavaScript Modules**, o projeto deve ser aberto obrigatoriamente através de um servidor local:
1. No VS Code, utilize a extensão **Live Server**.
2. Clique com o botão direito no arquivo `frontend/index.html` e selecione **"Open with Live Server"**.
3. O navegador abrirá automaticamente em `http://127.0.0.1:5500`.

---

## 💡 Destaques do Projeto
- **Segurança:** Operações de deleção e alteração de status exigem a validação do `user_id` no backend.
- **Sessão Persistente:** O usuário permanece logado após atualizar a página através do `localStorage`.
- **UI Moderna:** Utilização de sombras, transparências e ícones para uma experiência premium.

--- 
**Projeto desenvolvido para gerenciamento produtivo de tarefas.**
```
