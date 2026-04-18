export async function assemble_data_create_task(user_id, title, description){
    return {
        "user_id": user_id,
        "title": title,
        "description": description
    }
}

export async function assemble_data_get_tasks(user_id, title, description){
    return {
        "user_id": user_id,
        "title": title,
        "description": description
    }
}

export async function create_task(data) {
    try {
        // Remova qualquer barra extra ao final se houver
        const response = await fetch('http://localhost:5000/tasks', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json()
    } catch (error) {
        console.error('Failed to create task:', error)
    }
}


export async function get_tasks(user_id){
    try{
        const response = await fetch(`http://localhost:5000/tasks/${user_id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })

        return await response.json()
            
    }

    catch (error){
        console.error('Failed to fetch tasks:', error)
        return null;
    }

}

export async function treat_create_task_response(data){
    if (data.success){
        console.log('Task created successfully:', data)
    }
    else{
        console.error('Failed to create task:', data)
    }
}

export async function treat_get_tasks_response(data){
    if (data.success){
        console.log('Tasks fetched successfully:', data)
    }
    else{
        console.error('Failed to fetch tasks:', data)
    }
}

export async function delete_task(task_id){
   try{
        const response = await fetch(`http://localhost:5000/tasks/${task_id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({"user_id": user_id})

        })

        return await response.json()
    }

   catch (error){
        console.error('Failed to delete task:', error)
   }
}


export async function update_task_status(task_id,user_id){

    if (!task_id || user_id === 'undefined'){
        console.error('Task ID or User ID is missing')

    }
    
   try{
        const response = await fetch(`http://localhost:5000/tasks/${task_id}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({"user_id": user_id})

        })

        return await response.json()
    }

   catch (error){
        console.error('Failed to update task:', error)
   }
}