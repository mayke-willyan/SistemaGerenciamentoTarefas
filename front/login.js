export function assemble_data_login(email,senha){
    return {
        "email": email,
        "password": senha
    }
}

export async function send_login(data){
    try{
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)
        })

        return await response.json();
    }

    catch(error){
        console.error('Failed to authenticate user:', error);
        return null;
    }
}

export function treat_login_response(data){
    if (data.success){
        console.log('User authenticated successfully:', data);
    }
    else{
        console.error('Failed to authenticate user:', data);
    }
}