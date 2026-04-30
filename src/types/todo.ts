export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

export type TodoFilterType = 'all' | 'active' | 'completed';
