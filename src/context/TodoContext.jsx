import { createContext, useContext, useReducer, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TodoContext = createContext();

const initialUI = {
  filter: "all",
  sort: "none",
  dark: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "SET_SORT":
      return { ...state, sort: action.payload };
    case "TOGGLE_THEME":
      return { ...state, dark: !state.dark };
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [storedTodos, setStoredTodos] = useLocalStorage("todos", []);
  const [state, dispatch] = useReducer(reducer, {
    todos: storedTodos,
    ...initialUI,
  });

  useEffect(() => {
    setStoredTodos(state.todos);
  }, [state.todos]);

  const filteredTodos = state.todos
    .filter((todo) => {
      if (state.filter === "active") return !todo.completed;
      if (state.filter === "completed") return todo.completed;
      return true;
    })
    .sort((a, b) => {
      if (state.sort === "priority") {
        const order = { High: 3, Medium: 2, Low: 1 };
        return order[b.priority] - order[a.priority];
      }
      if (state.sort === "dueDate") {
        return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
      }
      return 0;
    });

  return (
    <TodoContext.Provider
      value={{
        ...state,
        dispatch,
        filteredTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
