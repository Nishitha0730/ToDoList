import React, { useReducer, useState } from "react";
import todoReducer from "./Reducer";
import Button from "./myButton";
import "./App.css";

const initialState = {
    todos: [],
    filter: "all"
};

function todoApp(){
    const [state,dispatch] = useReducer(todoReducer, initialState);
    const [inputValue, setInputValue] = useState("");

    const addToDo = () => {
        if (inputValue.trim()) {
            dispatch({ type: "ADD_TODO", payload: inputValue });
            setInputValue("");
        }
    }

    const filteredTodos = state.todos.filter(todo => {
        if (state.filter === "completed") {
            return todo.completed;
        } else if (state.filter === "active") {
            return !todo.completed;
        }
        return true;
    });

    return(
        <div className="App">
            <h1>Todo List</h1>
            <div className="add-todo">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            addToDo();
                        }
                    }}
                    placeholder="Add a new todo"
                />
                <button onClick={addToDo}>Add</button>
            </div>

            <div className="filters">
                <Button onClick={() => dispatch({ type: "SET_FILTER", payload: "all" })} label="All" className={state.filter==="all" ? "active" : ""} />
                <Button onClick={() => dispatch({ type: "SET_FILTER", payload: "active" })} label="Active" className={state.filter==="active" ? "active" : ""} />
                <Button onClick={() => dispatch({ type: "SET_FILTER", payload: "completed" })} label="Completed" className={state.filter==="completed" ? "active" : ""} />
                <Button onClick={() => dispatch({ type: "CLEAR_COMPLETED" })} label="Clear Completed"  />
            </div>

            <ul className="todo-list">
                {filteredTodos.map((todo, index) => (
                    <li key={index} className={todo.completed ? "completed" : ""}>
                        <span>{todo.text}</span>
                        <div>
                            <button onClick={() => dispatch({ type: "TOGGLE_TODO", payload: index })}>
                                {todo.completed ? "Undo" : "Complete"}
                            </button>
                            <button onClick={() => dispatch({ type: "DELETE_TODO", payload: index })} className="Delete">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="status">
                <p>Total: {state.todos.length} | Completed: {state.todos.filter(t => t.completed).length}</p>
            </div>
        </div>
    )

}

export default todoApp;