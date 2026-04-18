export function assemble_data_register(nome,email,senha){
    return {
        "name": nome,
        "email": email,
        "password": senha
    }
}

export async function send_register(data){
    try{
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)
        })

        return await response.json();
    }

    catch(error){
        console.error('Erro ao registrar usuário:', error);
        return null;
    }
}

export function treat_register_response(data){
    if (data.success){
        console.log('User registered successfully:', data);
    }
    else{
        console.error('Failed to register user:', data);
    }
}