import React, { useReducer, useState } from "react";
import todoReducer from "./Reducer";

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
        </div>
    )

}

export default todoApp;