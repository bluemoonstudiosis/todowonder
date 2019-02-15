function getAlltodos() {
    //getting all the todos saved from local storage!
    var todos = new Array; // initialyzing new array
    var todos_str = localStorage.getItem('todo'); // getting todos from localstorage
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); // localstorage save data as string, so converting into JSON format.
    }
    return todos; // return data; if there is no data will return undefined.
}

function add() {
    // adding new task to the todos
    var task = document.getElementById('task').value; // getting the input text box value
    if (task) { // if there is something written in the textbox
        var todos = getAlltodos(); // get the todos if any previously there?
        todos.push(task); // add the task
        localStorage.setItem('todo', JSON.stringify(todos)); // save as string in localstorage
        RenderHTML(); // refresh the dom
        document.getElementById('task').value = ""; // clearing the value in textbox
        document.getElementById('task').focus(); // focusing the textbox to write again
        return false;
    }
}

function remove() {
    //removing the task based on id
    var id = this.getAttribute('id'); // get the button id
    var todos = getAlltodos(); // getting all the tods
    todos.splice(id, 1); // splice (remove the item from array ( javascript method )  )
    localStorage.setItem('todo', JSON.stringify(todos)); //saving again the array after splicing
    RenderHTML(); // refresh the dom
    return false;
}

function RenderHTML() {
    //render the html elements - todo content & remove button at the end.
    var todos = getAlltodos(); // get all the todos
    var html = '<ul>';
    for (var i = 0; i < todos.length; i++) {
        html += '<li style="padding-bottom: 22px">' + todos[i] + '&nbsp;&nbsp;<button style="float:right" class="btn btn-warning remove" id="' + i + '">Remove</button></li>';
    };
    html += '</ul>'; // building the html content string
    document.getElementById('dynamic').innerHTML = html; // attach html into the html dynamic element
    var buttons = document.getElementsByClassName('remove'); // getting all the remove class named buttons
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove); // adding click event to them to assign add -remove- method
    };
}

document.getElementById('add').addEventListener('click', add); // assign add method to add id element
RenderHTML(); // show the element
