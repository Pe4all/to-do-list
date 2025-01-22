export type Todo = {
  id: string;
  label: string;
  isComplete: boolean;
}

export type View = {
  view: 'all' | 'completed' | 'active';
}