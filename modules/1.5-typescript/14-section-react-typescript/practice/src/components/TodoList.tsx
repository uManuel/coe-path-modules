import React from "react"
import { Todo } from "../todo.model";

import './TodoList.css';

interface TodoListProps {
    items:Todo[];
    onDelete:(todoId:string)=>void;
}

const TodoList: React.FC<TodoListProps> = (props)=>{
    return (
    <ul>
        {props.items.map(todo=>( 
                <li key={todo.id}>
                    <span>{todo.text}</span><button onClick={()=>{props.onDelete(todo.id)}}>Delete</button>
                </li>
        ))}
    </ul>);
}
export default TodoList;