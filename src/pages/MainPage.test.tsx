import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MainPage from './MainPage';
import { vi } from 'vitest';

interface Todo {
  id: string;
  label: string;
  isComplete: boolean;
}

describe('MainPage component', () => {
  const initialTodos: Todo[] = [
    { id: '1', label: 'Task 1', isComplete: false },
    { id: '2', label: 'Task 2', isComplete: true },
  ];


  it('renders todos correctly', () => {
    const { getByText } = render(
      <MainPage todos={initialTodos} setTodos={() => { }} view="all" setView={() => { }} />
    );

    expect(getByText('Task 1')).toBeInTheDocument();
    expect(getByText('Task 2')).toBeInTheDocument();
  });

  it('adds a new todo', () => {
    const { getByPlaceholderText, getByText } = render(
      <MainPage todos={[]} setTodos={() => { }} view="all" setView={() => { }} />
    );

    const input = getByPlaceholderText('What needs to be done?') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(getByText('New Task')).toBeInTheDocument();
  });

  it('filters todos correctly', () => {

    const { getByText, getByTestId } = render(
      <MainPage todos={initialTodos} setTodos={() => { }} view="completed" setView={() => { }} />
    );

    expect(getByText('Task 2')).toBeInTheDocument();

    fireEvent.click(getByTestId('filter-all'));
    expect(getByText('Task 1')).toBeInTheDocument();
    expect(getByText('Task 2')).toBeInTheDocument();

    fireEvent.click(getByTestId('filter-active'));
    expect(getByText('Task 1')).toBeInTheDocument();
    expect(getByText('Task 2')).not.toBeInTheDocument();
  });

  it('clears completed todos', () => {
    const setTodosMock = vi.fn();
    const { getByText } = render(
      <MainPage todos={initialTodos} setTodos={setTodosMock} view="all" setView={() => { }} />
    );

    fireEvent.click(getByText('Clear completed'));
    expect(setTodosMock).toHaveBeenCalledWith([{ id: '1', label: 'Task 1', isComplete: false }]);
  });
});
