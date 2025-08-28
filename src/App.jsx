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
                    placeholder="Add a new todo"
                />
                <button onClick={addToDo}>Add</button>
            </div>
        </div>
    )

}