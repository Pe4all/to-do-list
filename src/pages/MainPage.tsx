import { nanoid } from 'nanoid';
import { ChangeEvent, useState, type FC } from 'react';

type Props = {};

type Todo = {
  id: string;
  label: string
}

const MainPage: FC<Props> = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoLabel, setNewTodoLabel] = useState('');

  const handleNewTodoLabel = (e: ChangeEvent<HTMLInputElement>) => setNewTodoLabel(e.target.value);

  const handleNewTodoPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTodoLabel !== '') {
      setTodos(todos => [...todos, { id: nanoid(), label: newTodoLabel }]);
      setNewTodoLabel('');
    }
  };

  return <div>
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.label}</li>)}
    </ul>
    <input value={newTodoLabel} onChange={handleNewTodoLabel} onKeyDown={handleNewTodoPress} />
  </div>
}

export default MainPage;