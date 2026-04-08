import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoFilterType } from '../types/todo';

const STORAGE_KEY = 'uplift_todos';
const MAX_TITLE_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 500;

const isValidTodo = (item: unknown): item is Todo => {
  if (typeof item !== 'object' || item === null) return false;
  const todo = item as Record<string, unknown>;
  return (
    typeof todo.id === 'string' &&
    typeof todo.title === 'string' &&
    typeof todo.description === 'string' &&
    typeof todo.completed === 'boolean' &&
    typeof todo.createdAt === 'number' &&
    typeof todo.updatedAt === 'number'
  );
};

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilterType>('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const validTodos = parsed.filter(isValidTodo);
          setTodos(validTodos);
        }
      }
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (error) {
        console.error('Error saving todos to localStorage:', error);
      }
    }
  }, [todos, isLoaded]);

  const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const addTodo = useCallback((title: string, description: string = '') => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return false;

    const now = Date.now();
    const newTodo: Todo = {
      id: generateId(),
      title: trimmedTitle.slice(0, 100),
      description: description.trim().slice(0, 500),
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    setTodos(prev => [newTodo, ...prev]);
    return true;
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: Date.now() }
          : todo
      )
    );
  }, []);

  const updateTodo = useCallback((id: string, title: string, description: string) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return false;

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? {
              ...todo,
              title: trimmedTitle.slice(0, 100),
              description: description.trim().slice(0, 500),
              updatedAt: Date.now(),
            }
          : todo
      )
    );
    return true;
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  };

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    setFilter,
    stats,
    isLoaded,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
  };
};
