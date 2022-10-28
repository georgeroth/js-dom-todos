const addTodo = document.querySelector("form");
const ul = document.querySelector
const toDoListUl = document.querySelector('#todo-list')

const localState = {
    todos: []
}

addTodo.addEventListener("submit", (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: addTodo[0].value,
            completed: false
        })
    })
    .then(function (response) { return response.json() })
    .then(function (data) {
        receiveDataFromServer()
    })
    addTodo[0].value = ''
})

function receiveDataFromServer() {
    fetch("http://localhost:3000/todos")
    .then(function (response) { return response.json() })
    .then(function (data) {
        localState.todos = data
        renderToDoList(localState.todos)
    })

}

function renderToDoList (data) {
    toDoListUl.innerHTML = ''
    data.forEach((item) => {
        const li = document.createElement('li')
        const toDoSpan = document.createElement('span')
        toDoSpan.innerText = item.title
        if (item.completed === true) {
            toDoSpan.setAttribute('class', 'completed')
        }
        makeCompleteOrIncomplete(toDoSpan, item)
        toDoListUl.appendChild(li)
        li.appendChild(toDoSpan)
        deleteExtension(item, li)
    })
}

function deleteExtension(item, li){
    const span = document.createElement('span')
    span.innerText = "delete"
    span.setAttribute('class', 'deleteButton')
    li.appendChild(span)
    deleteListener(item, span)
}

function deleteListener(item, span){
    span.addEventListener('click', () => {
        fetch(`http://localhost:3000/todos/${item.id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                completed: false
                })
            })
            .then(function (response) { return response.json() })
            .then(function () {receiveDataFromServer()})
    })
}

function makeCompleteOrIncomplete(toDoSpan, item){
    toDoSpan.addEventListener('click', () => {
        if (item.completed === true) {
            fetch(`http://localhost:3000/todos/${item.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                completed: false
                })
            })
            .then(function (response) { return response.json() })
            .then(function () {receiveDataFromServer()})
        } else {
            fetch(`http://localhost:3000/todos/${item.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: true
                })
            })
            .then(function (response) { return response.json() })
            .then(function () {receiveDataFromServer()})
        }
    })
}

function init (){
    receiveDataFromServer()
}

init()