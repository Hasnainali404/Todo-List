import { Trash, Edit, Check } from "lucide-react";
import { useState } from "react";
import { useTodos } from "../context/TodoContext";
import PriorityBadge from "./PriorityBadge";

export default function TodoItem({ todo }) {
  const { todos, dispatch } = useTodos();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const update = () => {
    dispatch({
      type: "SET_TODOS",
      payload: todos.map((t) => (t.id === todo.id ? { ...t, text } : t)),
    });
    setEditing(false);
  };

  return (
    <div className="group bg-white dark:bg-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all flex justify-between">
      <div className="flex gap-3 items-start">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() =>
            dispatch({
              type: "SET_TODOS",
              payload: todos.map((t) =>
                t.id === todo.id ? { ...t, completed: !t.completed } : t,
              ),
            })
          }
        />

        <div>
          {editing ? (
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bg-transparent border-b focus:outline-none"
            />
          ) : (
            <p
              className={`font-medium ${todo.completed && "line-through opacity-50"}`}
            >
              {todo.text}
            </p>
          )}

          <div className="flex gap-2 mt-1">
            <PriorityBadge level={todo.priority} />
            {todo.dueDate && (
              <span className="text-xs opacity-60">📅 {todo.dueDate}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100">
        {editing ? (
          <button onClick={update}>
            <Check size={18} />
          </button>
        ) : (
          <button onClick={() => setEditing(true)}>
            <Edit size={18} />
          </button>
        )}
        <button
          onClick={() =>
            dispatch({
              type: "SET_TODOS",
              payload: todos.filter((t) => t.id !== todo.id),
            })
          }
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
}
