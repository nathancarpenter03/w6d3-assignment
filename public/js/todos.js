getTodos();

document.querySelector('#new-todo-button').addEventListener('click', addTodo)

// Get all to do's

function getTodos() {
    
    fetch('http://localhost:3000/api/v1/todos')
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);

         document.querySelector('.list-group').innerHTML = '';
         response.forEach(function(todo) {
             showTodo(todo)
         })

    })
}

function showTodo(todo) {
    var todoItem = `<li class="list-group-item">${todo.todo}<span class="label label-info">${todo.category}</span><span class="label label-warning">${todo.due_date}</span></li>`;
    document.querySelector('.list-group').innerHTML += todoItem;
}

// Post new to do 

function addTodo() {
    var newTodo = document.querySelector('#new-todo').value;
    var newCategory = document.querySelector('#sel1').value;
    var newDueDate = document.querySelector('#duedate').value;
    console.log(newTodo);
    console.log(newCategory);
    console.log(newDueDate);

    fetch('http://localhost:3000/api/v1/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            todo: newTodo,
            category: newCategory,
            due_date: newDueDate
        })
    })

        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
        })
        .then(getTodos)
}

