import { nanoid } from 'nanoid';
import { ChangeEvent, useEffect, useState, type FC } from 'react';
import { Todo, View } from '../types';

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
};

const MainPage: FC<Props> = ({ todos, setTodos, view, setView }) => {
  const [newTodoLabel, setNewTodoLabel] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    switch (view.view) {
      case 'active':
        setFilteredTodos(todos.filter((todo) => !todo.isComplete));
        break;
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.isComplete));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }, [todos, view]);

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
  };

  const handleTodosView = (newView: View) => {
    setView(newView);
  };

  return <div>
    <div>
      {filteredTodos.map(todo =>
        <div key={todo.id}>
          <input type='checkbox' checked={todo.isComplete} onChange={() => toggleTodoComplete(todo.id)} /> {todo.label}
          <button onClick={handleTodoDelete(todo)}>delete</button>
        </div>)}
    </div>
    <input value={newTodoLabel} onChange={handleNewTodoLabel} onKeyDown={handleNewTodoPress} />
    <button onClick={() => handleTodosView({ view: 'all' })}>All</button>
    <button onClick={() => handleTodosView({ view: 'completed' })}>Completed</button>
    <button onClick={() => handleTodosView({ view: 'active' })}>Active</button>
    <button onClick={handleClearClick}>Clear completed</button>
  </div>
}

export default MainPage;