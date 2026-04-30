import { useState, useRef, useEffect } from 'react';
import { Todo } from '../types/todo';
import { Check, Pencil, Trash2, X } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <li className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSave}
          className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
          aria-label="Save"
        >
          <Check size={18} />
        </button>
        <button
          onClick={handleCancel}
          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          aria-label="Cancel"
        >
          <X size={18} />
        </button>
      </li>
    );
  }

  return (
    <li className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200 group">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      />
      <span
        className={`flex-1 ${
          todo.completed
            ? 'line-through text-gray-400'
            : 'text-gray-700'
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={handleEdit}
        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Edit"
      >
        <Pencil size={18} />
      </button>
      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Delete"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
};
