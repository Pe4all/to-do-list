export type Todo = {
  id: string;
  label: string;
  isComplete: boolean;
}

export type View = 'all' | 'completed' | 'active';