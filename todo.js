const addTodo = document.querySelector("form");
const ul = document.querySelector
const toDoListUl = document.querySelector('#todo-list')

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
        renderToDoList(data)
    })

}

function renderToDoList (data) {
    toDoListUl.innerHTML = ''
    data.forEach((item) => {
        const li = document.createElement('li')
        li.innerText = item.title
        if (item.completed === true) {
            li.setAttribute('class', 'completed')
        }
        makeCompleteOrIncomplete(li, item)
        toDoListUl.appendChild(li)
        deleteExtension(item, li)
    })
}

function deleteExtension(item, li){
    const span = document.createElement('span')
    span.innerText = "done"
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

function makeCompleteOrIncomplete(li, item){
    li.addEventListener('click', () => {
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