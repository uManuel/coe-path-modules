// 1. RED SCOPE

var todoList = todoList();

todoList.addNewTodo('Go to the dentist');
todoList.addNewTodo('Clean room');
todoList.addNewTodo('Date with girlfriend');
todoList.showTodoList();

todoList.deleteTodo(1);
todoList.showTodoList();

function todoList(){
    // 2. BLUE SCOPE

    var listTodo = [];

    return {
        addNewTodo,
        deleteTodo,
        showTodoList
    }

    function addNewTodo(todo){// 3. YELLOW SCOPE
        // 4. PURPLE SCOPE
        {
            let listTodo = todo;
            let formattedMessage = 'Adding '+listTodo;
            console.log(formattedMessage);
        }
        listTodo.push(todo);
    }

    function deleteTodo(n){ //5. BLACK SCOPE
        // 6. GREEN SCOPE
        {
            let formattedMessage = `Removing ${n}. ${listTodo[n]}`;
            console.log(formattedMessage)
        }
        listTodo.splice(n,1);
    }
    function showTodoList(){
        // 7. ORANGE
        var i = 1;
        console.log("\nMy todo List");
        listTodo.forEach(todo => {
            console.log(i+'. '+todo);
            i++
        });
        console.log("===================");
    }
}


