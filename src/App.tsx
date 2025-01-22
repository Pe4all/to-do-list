import { useState } from "react";

import MainPage from "./pages/MainPage";

import { Todo } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <>
      <div>
        <MainPage todos={todos} setTodos={setTodos} />
      </div>
    </>
  )
}

export default App
