import { useState, useMemo } from 'react';
import { AppBar } from '../components/appbar';
import { TodoForm } from '../components/todoForm';
import { TodoItem } from '../components/todoItem';
import { TodoFilter } from '../components/todoFilter';
import { TodoStats } from '../components/todoStats';
import { useTodos } from '../hooks';
import { FilterType } from '../types/todo';
import { Trash2 } from 'lucide-react';

export const Todo = () => {
  const { todos, isLoaded, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  const completedCount = stats.completed;

  if (!isLoaded) {
    return (
      <div className="relative min-h-screen bg-blue-200 flex-1 flex-col">
        <div className="sticky top-0 z-50 w-full mb-4 bg-white flex items-center">
          <AppBar />
        </div>
        <div className="max-w-6xl mx-auto flex flex-col gap-6 p-4 w-full">
          <div className="card h-32 animate-pulse bg-gray-200" />
          <div className="card h-16 animate-pulse bg-gray-200" />
          <div className="card h-64 animate-pulse bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-blue-200 flex-1 flex-col">
      <div className="sticky top-0 z-50 w-full mb-4 bg-white flex items-center">
        <AppBar />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-6 p-4 w-full">
        <TodoStats
          total={stats.total}
          completed={stats.completed}
          active={stats.active}
        />

        <div className="card">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-gray-800">My Todos</h1>
            <TodoForm onAdd={addTodo} />
          </div>
        </div>

        <div className="card">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                >
                  <Trash2 size={18} />
                  Clear Completed ({completedCount})
                </button>
              )}
            </div>

            {filteredTodos.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                {filter === 'all' && todos.length === 0
                  ? "No todos yet. Add one above!"
                  : filter === 'active'
                  ? "No active todos!"
                  : filter === 'completed'
                  ? "No completed todos yet!"
                  : "No todos found."}
              </div>
            ) : (
              <ul className="flex flex-col gap-2">
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
