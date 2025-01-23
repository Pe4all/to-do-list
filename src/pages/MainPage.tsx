import { nanoid } from "nanoid";
import { ChangeEvent, useEffect, useState, type FC } from "react";
import { Todo, View } from "../types";
import { styled } from "styled-components";
import Checkbox from "../components/Checkbox";
import Button from "../components/button";
import Input from "../components/Input";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border: 1px solid rgb(221, 221, 221);

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const TodosWrapper = styled.div`
  border-bottom: 1px solid rgb(221, 221, 221);
`

const ToDo = styled.div<{ isComplete: boolean }>`
  font-size: 1.3em;
  display: flex;
  gap: 15px;
  padding: 15px;
  text-decoration: ${({ isComplete }) => (isComplete ? "line-through" : "none")};
  color: ${({ isComplete }) => (isComplete ? "gray" : "black")};
`;

const BottomPanel = styled.div`
  font-size: .9em;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color:rgb(107, 107, 107);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const FiltersWrapper = styled.div`
  gap: 10px;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const FilterButton = styled(Button) <{ isActive: boolean }>`
  border-color: ${({ isActive }) => (isActive ? '#e3e3e3' : '')};
`;

export const DeleteButton = styled(Button)`
  opacity: 0;
  background-image: url('/delete.svg'); /* Путь к вашему SVG */
  background-size: cover;
  width: 24px;
  height: 24px;

  ${ToDo}:hover & {
    opacity: 1;
    border: none;
  }
`;

const ToDoText = styled.p`
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
};

const MainPage: FC<Props> = ({ todos, setTodos, view, setView }) => {
  const [newTodoLabel, setNewTodoLabel] = useState("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const activeTodos = todos.filter((todo) => !todo.isComplete).length;

  useEffect(() => {
    switch (view) {
      case "active":
        setFilteredTodos(todos.filter((todo) => !todo.isComplete));
        break;
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.isComplete));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }, [todos, view]);

  const handleNewTodoLabel = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTodoLabel(e.target.value);

  const handleNewTodoPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTodoLabel !== "") {
      setTodos((todos) => [
        ...todos,
        { id: nanoid(), label: newTodoLabel, isComplete: false },
      ]);
      setNewTodoLabel("");
    }
  };

  const toggleTodoComplete = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  const handleClearClick = () => {
    setTodos(todos.filter((todo) => !todo.isComplete));
  };

  const handleTodoDelete = (todoToDelete: Todo) => () => {
    setTodos((todos) => todos.filter((todo) => todo.id !== todoToDelete.id));
  };

  const handleTodosView = (newView: View) => {
    setView(newView);
  };

  useEffect(() => {
    console.log(view);
  }, [view])

  return (
    <Wrapper>
      <Input
        placeholder="What needs to be done?"
        value={newTodoLabel}
        onChange={handleNewTodoLabel}
        onKeyDown={handleNewTodoPress}
      />
      <TodosWrapper>
        {filteredTodos.map((todo) => (
          <ToDo key={todo.id} isComplete={todo.isComplete}>
            <Checkbox
              checked={todo.isComplete}
              onChange={() => toggleTodoComplete(todo.id)}
            />
            <ToDoText>{todo.label}</ToDoText>
            <DeleteButton onClick={handleTodoDelete(todo)} />
          </ToDo>
        ))}
      </TodosWrapper>

      <BottomPanel>
        {`${activeTodos} items left`}
        <FiltersWrapper>
          <Button key={`all-${view}`} data-testid="filter-all" onClick={() => handleTodosView('all')} isActive={view === 'all'}>All</Button>
          <Button key={`completed-${view}`} data-testid="filter-completed" onClick={() => handleTodosView('completed')} isActive={view === 'completed'}>
            Completed
          </Button>
          <Button key={`active-${view}`} data-testid="filter-active" onClick={() => handleTodosView('active')} isActive={view === 'active'}>
            Active
          </Button>
        </FiltersWrapper>
        <Button onClick={handleClearClick}>Clear completed</Button>
      </BottomPanel>
    </Wrapper>
  );
};

export default MainPage;
