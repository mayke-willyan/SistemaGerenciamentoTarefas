import * as Register from './register.js';
import * as Login from './login.js';
import * as Task from './tasks.js';
import { render_tasks } from './ui.js';


const API = 'http://localhost:5000/register';
const login_card = document.querySelector('#login-card');
const register_card = document.querySelector('#register-card');
const go_to_register = document.querySelector('#go-to-register');
const go_to_login = document.querySelector('#go-to-login');
const form_register = document.querySelector('#form-register');
const form_login = document.querySelector('#form-login');
const reg_name = document.querySelector('#reg-name');
const reg_email = document.querySelector('#reg-email');
const reg_password = document.querySelector('#reg-password');
const login_email = document.querySelector('#login-email');
const login_password = document.querySelector('#login-password');
const main_container = document.querySelector('#main-container');
const form_task = document.querySelector('#form-tarefa');
const logout_btn = document.querySelector('#btn-logout');

async function load_dashboard() {
    const user_id = localStorage.getItem('user_id');
    const user_name = localStorage.getItem('user_name');

    if (!user_id) {
        console.log("Nenhum usuário logado. Permanecendo na tela de login.");
        return; 
    }

    
    try {
        
        login_card.classList.add('hidden');
        main_container.classList.remove('hidden');

        // 2. Atualizar o nome na tela
        const el_name = document.querySelector('#user-name');
        if (el_name && user_name) el_name.textContent = user_name;

        // 3. Buscar e renderizar as tarefas
        const response = await Task.get_tasks(user_id);
        if (response && response.tasks) {
            render_tasks(response.tasks);
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}


document.addEventListener('DOMContentLoaded', load_dashboard);



go_to_register.addEventListener('click', (e) => {

    e.preventDefault();
    login_card.classList.add('hidden');
    register_card.classList.remove('hidden');

})    

go_to_login.addEventListener('click', (e) => {

    e.preventDefault();
    register_card.classList.add('hidden');
    login_card.classList.remove('hidden');

})  

form_register.addEventListener('submit', async (e) => {

    e.preventDefault();

    const data = {
        name: reg_name.value,
        email: reg_email.value,
        password: reg_password.value
    }    

    try{

        const response = await Register.send_register(data)
        Register.treat_register_response(response)
    }    

    catch(error){
        console.error('Error to register the user:', error);
    }    
    
    register_card.classList.add('hidden')
    login_card.classList.remove('hidden')


})

logout_btn.addEventListener('click', () => {
    localStorage.removeItem('user_id')
    localStorage.removeItem('user_name')
    window.location.reload()
})

window.eventUpdate = async function(id){
    const user_id = localStorage.getItem('user_id')
    const response = await Task.update_task_status(id, user_id)

    if(response){
        load_dashboard()
    }
}

window.eventDelete = async function(id){
    
    if(confirm("Are you sure you want to delete this task?")){
        const user_id = localStorage.getItem('user_id')
        const response = await Task.delete_task(id, user_id)

        if (response && response.success){
            load_dashboard()
        }

        else{
            console.error('Failed to delete task:', response)
        }
    }
}

form_login.addEventListener('submit', async (e) => {

    e.preventDefault();

    const data = {
        email: login_email.value,
        password: login_password.value
    }    

    try{
        const response = await Login.send_login(data);
        
        if (response && (response.success || response.user_id)){
            localStorage.setItem('user_id', response.user_id)
            localStorage.setItem('user_name', response.name)

            login_card.classList.add('hidden')
            main_container.classList.remove('hidden')
            load_dashboard()
        }

        else{
            alert('Email or Password invalid. Please try again.');
            Login.treat_login_response(response)
        }
    }    

    catch(error){
        console.error('Error to authenticate the user:', error)
    }


})


form_task.addEventListener('submit', async (e) => {

    e.preventDefault();

    try{
        const user_id = localStorage.getItem('user_id')
        const title = document.querySelector('#titulo').value
        const description = document.querySelector('#descricao').value
    
    
        const data = await Task.assemble_data_create_task(user_id, title, description)

        console.log('Data assembled for task creation:', data)

        const response  = await Task.create_task(data)


        if(response){
            form_task.reset();
            load_dashboard();

            console.log('created')
        }
    }

    catch(error){
        console.error('Error to create task:', error);
    }
})

