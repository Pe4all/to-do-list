import MainPage from "./pages/MainPage";
import UseLocalStorage from "./hooks/use-local-storage";

import { Todo, View } from './types';

function App() {
  const [todos, setTodos] = UseLocalStorage<Todo[]>('todos', []);
  const [view, setView] = UseLocalStorage<View>('filters', {view: 'all'});

  const todoProps = {todos, view, setTodos, setView};

  return (
    <>
      <div>
        <MainPage {...todoProps} />
      </div>
    </>
  )
}

export default App
