import { useTodos } from "../context/TodoContext";

export default function TodoFilters() {
  const { filter, sort, dispatch } = useTodos();

  return (
    <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
      <div className="flex gap-2">
        {["all", "active", "completed"].map(f => (
          <button
            key={f}
            onClick={() => dispatch({ type: "SET_FILTER", payload: f })}
            className={`px-3 py-1 cursor-pointer rounded-full text-sm font-medium
              ${
                filter === f
                  ? "bg-slate-900 text-white dark:bg-white dark:text-black"
                  : "bg-slate-200 dark:bg-slate-400 hover:opacity-80"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      <select
        value={sort}
        onChange={e =>
          dispatch({ type: "SET_SORT", payload: e.target.value })
        }
        className="p-2 rounded-lg bg-slate-200 dark:bg-slate-400 text-sm outline-none cursor-pointer"
      >
        <option value="none">No Sort</option>
        <option value="priority">Priority</option>
        <option value="dueDate">Due Date</option>
      </select>
    </div>
  );
}
