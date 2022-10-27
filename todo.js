const addTodo = document.querySelector("form");
const ul = document.querySelector
const toDoListUl = document.querySelector('#todo-list')

addTodo.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("here", event)
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
    
})

function receiveDataFromServer() {
    fetch("http://localhost:3000/todos")
    .then(function (response) { return response.json() })
    .then(function (data) {
        console.log(data)
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
        toDoListUl.appendChild(li)
    })
}

function init (){
    receiveDataFromServer()
}

init()