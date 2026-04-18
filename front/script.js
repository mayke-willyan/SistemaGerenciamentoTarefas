import * as Register from './register.js';
import * as Login from './login.js';


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

        const response = await Register.send_register(data);
        Register.treat_register_response(response);
    }

    catch(error){
        console.error('Error to register the user:', error);
    }
    

    register_card.classList.add('hidden');
    login_card.classList.remove('hidden');


})

form_login.addEventListener('submit', async (e) => {

    e.preventDefault();

    const data = {
        email: login_email.value,
        password: login_password.value
    }

    try{
        const response = await Login.send_login(data);
        Login.treat_login_response(response);
    }

    catch(error){
        console.error('Error to authenticate the user:', error);
    }

    login_card.classList.add('hidden');
    main_container.classList.remove('hidden');


})