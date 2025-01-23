import '@testing-library/jest-dom/vitest';
import { render, fireEvent, screen } from '@testing-library/react';
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
    const setTodos = vi.fn();
    const { getByPlaceholderText, rerender } = render(
      <MainPage todos={[]} setTodos={setTodos} view="all" setView={() => { }} />
    );

    const input = getByPlaceholderText('What needs to be done?') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    const setStateCallback = setTodos.mock.calls[0][0];
    const newTodos = setStateCallback([]);
    rerender(<MainPage todos={newTodos} setTodos={setTodos} view="all" setView={() => { }} />);

    expect(screen.queryByText('New Task')).toBeInTheDocument();
  });

  it('filters todos correctly', () => {
    const { getByTestId, rerender } = render(
      <MainPage todos={initialTodos} setTodos={() => { }} view="completed" setView={() => { }} />
    );

    expect(screen.queryByText('Task 2')).toBeInTheDocument();

    fireEvent.click(getByTestId('filter-all'));
    rerender(<MainPage todos={initialTodos} setTodos={() => { }} view="all" setView={() => { }} />);

    expect(screen.queryByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).toBeInTheDocument();


    fireEvent.click(getByTestId('filter-active'));
    rerender(<MainPage todos={initialTodos} setTodos={() => { }} view="active" setView={() => { }} />);

    expect(screen.queryByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument()
  });

  it('clears completed todos', () => {
    const setTodosMock = vi.fn();
    const { getByText } = render(
      <MainPage todos={initialTodos} setTodos={setTodosMock} view="all" setView={() => { }} />
    );

    fireEvent.click(getByText('Clear completed'));
    expect(setTodosMock).toHaveBeenCalledWith([{ id: '1', label: 'Task 1', isComplete: false }]);
  });

  it('changing view', () => {
    const setViewMock = vi.fn();

    const { getByTestId } = render(
      <MainPage todos={initialTodos} setTodos={() => { }} view="all" setView={setViewMock} />
    );

    fireEvent.click(getByTestId('filter-active'));
    expect(setViewMock).toHaveBeenCalledWith('active');
  });
});
