const addTodo = document.querySelector("form");
const ul = document.querySelector
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
    .then(function (data) { console.log(data) })

})


