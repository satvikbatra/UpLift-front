import { TodoFilterType } from '../types/todo';

interface TodoFilterProps {
  currentFilter: TodoFilterType;
  onFilterChange: (filter: TodoFilterType) => void;
  stats: { total: number; active: number; completed: number };
}

export const TodoFilter = ({ currentFilter, onFilterChange, stats }: TodoFilterProps) => {
  const filters: { key: TodoFilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: stats.total },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {filters.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentFilter === key
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {label} ({count})
        </button>
      ))}
    </div>
  );
};
