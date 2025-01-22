import { nanoid } from 'nanoid';
import { ChangeEvent, useState, type FC } from 'react';
import { Todo } from '../types';

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const MainPage: FC<Props> = ({todos, setTodos}) => {
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
  };

  const handleTodoDelete = (todoToDelete: Todo) => () => {
    setTodos((todos) => todos.filter((todo) => todo.id !== todoToDelete.id));
  }

  return <div>
    <div>
      {todos.map(todo =>
        <div key={todo.id}>
          <input type='checkbox' checked={todo.isComplete} onChange={() => toggleTodoComplete(todo.id)} /> {todo.label}
          <button onClick={handleTodoDelete(todo)}>delete</button>
        </div>)}
    </div>
    <input value={newTodoLabel} onChange={handleNewTodoLabel} onKeyDown={handleNewTodoPress} />
    <button onClick={handleClearClick}>Clear completed</button>
  </div>
}

export default MainPage;