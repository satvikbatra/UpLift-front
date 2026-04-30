import { useState } from 'react';

interface TodoFormProps {
  onAdd: (title: string, description: string) => boolean;
}

export const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDescription, setShowDescription] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAdd(title, description);
    if (success) {
      setTitle('');
      setDescription('');
      setShowDescription(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          maxLength={100}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {showDescription && (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description (optional)"
            maxLength={500}
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        )}
        
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => setShowDescription(!showDescription)}
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            {showDescription ? '- Hide description' : '+ Add description'}
          </button>
          
          <button
            type="submit"
            disabled={!title.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add Todo
          </button>
        </div>
      </div>
    </form>
  );
};
