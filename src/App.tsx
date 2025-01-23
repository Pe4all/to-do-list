import MainPage from "./pages/MainPage";
import UseLocalStorage from "./hooks/use-local-storage";
import GlobalStyle from "./GlobalStyle";

import { Todo, View } from './types';
import { styled } from "styled-components";

const Title = styled.h1`
  font-size: 5em;
  text-align: center;
  color: #ede1e1;
  margin-bottom: 30px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20vh;
  padding-bottom: 20vh;
  align-items: center;
  width: 100vw;
`;

function App() {
  const [todos, setTodos] = UseLocalStorage<Todo[]>('todos', []);
  const [view, setView] = UseLocalStorage<View>('filters', 'all');

  const todoProps = { todos, view, setTodos, setView };

  return (
    <>
      <GlobalStyle />
      <Body>
        <Title>todos</Title>
        <MainPage {...todoProps} />
      </Body>
    </>
  )
}

export default App
