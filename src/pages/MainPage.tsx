import { nanoid } from 'nanoid';
import { ChangeEvent, useState, type FC } from 'react';

type Props = {};

type Todo = {
  id: string;
  label: string;
  isComplete: boolean;
}

const MainPage: FC<Props> = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoLabel, setNewTodoLabel] = useState('');

  const handleNewTodoLabel = (e: ChangeEvent<HTMLInputElement>) => setNewTodoLabel(e.target.value);

  const handleNewTodoPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTodoLabel !== '') {
      setTodos(todos => [...todos, { id: nanoid(), label: newTodoLabel, isComplete: false }]);
      setNewTodoLabel('');
    }
  };

  const toggleTodoComplete = (id: string) => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  const handleClearClick = () => {
    setTodos(todos.filter(todo => !todo.isComplete));
  }

  return <div>
    <div>
      {todos.map(todo =>
        <div key={todo.id}>
          <input type='checkbox' checked={todo.isComplete} onChange={() => toggleTodoComplete(todo.id)} /> {todo.label}
        </div>)}
    </div>
    <input value={newTodoLabel} onChange={handleNewTodoLabel} onKeyDown={handleNewTodoPress} />
    <button onClick={handleClearClick}>Clear completed</button>
  </div>
}

export default MainPage;