import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilters from "./TodoFilters";

export default function Layout() {

  return (
    <div>
      <main className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 transition-colors">
        <section className="w-full max-w-xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold dark:text-white">Todo</h1>

          
          </header>

          <TodoInput />
          <TodoFilters />
          <TodoList />
        </section>
      </main>
    </div>
  );
}
