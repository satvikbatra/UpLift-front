import { AppBar } from '../components/appbar';
import { TodoForm } from '../components/todoForm';
import { TodoItem } from '../components/todoItem';
import { TodoFilter } from '../components/todoFilter';
import { useTodos } from '../hooks/useTodos';
import { Skeleton } from '../components/skeleton';

export const Todo = () => {
  const { todos, filter, setFilter, stats, isLoaded, addTodo, toggleTodo, updateTodo, deleteTodo } = useTodos();

  if (!isLoaded) {
    return (
      <div className="relative min-h-screen bg-blue-200 flex-1 flex-col">
        <div className="sticky top-0 z-50 w-full mb-4 bg-white flex items-center">
          <AppBar />
        </div>
        <div className="max-w-4xl mx-auto p-4 w-full">
          <Skeleton type="card" />
          <div className="mt-6">
            <Skeleton type="list" count={5} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-blue-200 flex-1 flex-col">
      <div className="sticky top-0 z-50 w-full mb-4 bg-white flex items-center">
        <AppBar />
      </div>

      <div className="max-w-4xl mx-auto p-4 w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Todo List</h1>
          <p className="text-gray-600">Manage your tasks and stay organized</p>
        </div>

        <TodoForm onAdd={addTodo} />

        <TodoFilter currentFilter={filter} onFilterChange={setFilter} stats={stats} />

        {todos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {filter === 'all' && 'No todos yet'}
              {filter === 'active' && 'No active todos'}
              {filter === 'completed' && 'No completed todos'}
            </h3>
            <p className="text-gray-500">
              {filter === 'all' && 'Add your first todo above to get started!'}
              {filter === 'active' && 'All your todos are completed. Great job!'}
              {filter === 'completed' && 'Complete some todos to see them here.'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
