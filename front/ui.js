export function render_tasks(task_list){
    
    const table_body = document.querySelector('#tabela-body') 
    const count = document.querySelector('#task-count')

    if (!table_body) return;

    table_body.innerHTML = '';

    task_list.forEach(task => {

        const row = document.createElement('tr');

        const status_class = task.status === 1 ? 'status-1' : 'status-0';
        const status_text = task.status === 1 ? 'Concluída' : 'Pendente';

        row.innerHTML = `
        <td>
                <span class="status-pill ${status_class}">${status_text}</span>
            </td>
            <td>
                <div style="color: var(--text-main); font-weight: 600;">${task.title}</div>
                <div style="color: var(--text-dim); font-size: 0.8rem;">${task.description || ''}</div>
            </td>
            <td>
                <div class="user-info"> 
                    <button class="btn btn-outline btn-sm-custom" onclick="window.eventUpdate(${task.id})">Status</button>
                    <button class="btn btn-sm-custom" style="background: var(--danger); color: white;" onclick="window.eventDelete(${task.id})">Delete</button>
                </div>
            </td>
        `;

        table_body.appendChild(row);
    })
}