import { useState } from "react";
import { Plus } from "lucide-react";
import { useTodos } from "../context/TodoContext";
import { generateId } from "../utils/helpers";

export default function TodoInput() {
  const { todos, dispatch } = useTodos();
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;

    dispatch({
      type: "SET_TODOS",
      payload: [
        ...todos,
        {
          id: generateId(),
          text,
          completed: false,
          priority,
          dueDate,
        },
      ],
    });

    setText("");
    setDueDate("");
    setPriority("Medium");
  };

  return (
    <div className="space-y-3 mb-6">
      <input
        className="w-full p-3 rounded-xl border outline-none border-none text-white bg-transparent dark:bg-slate-600  focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="flex-1 p-2 rounded-lg text-white cursor-pointer outline-none bg-slate-200 dark:bg-slate-600"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="date"
          className="flex-1 p-2 rounded-lg text-white bg-slate-200 dark:bg-slate-600"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button
          onClick={addTodo}
          className="flex items-center cursor-pointer gap-1 px-4 rounded-xl
                     bg-blue-600 text-white font-medium
                     hover:bg-blue-700 active:scale-95"
        >
          <Plus size={16} />
          Add
        </button>
      </div>
    </div>
  );
}
