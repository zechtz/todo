import React, { useState } from "react";
import TodoItem from "./TodoItem";
import Input from "./Input";

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

const App = () => {
  const [todoText, setTodoText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  const submitTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!todoText.trim()) return;
    const newTodo: Todo = {
      id: new Date().getTime().toString(),
      text: todoText.trim(),
      done: false,
    };
    setTodos([newTodo, ...todos]);
    setTodoText("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const toggleDone = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const startEdit = (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;
    setEditId(id);
    setEditText(todo.text);
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(event.target.value);
  };

  const submitEdit = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: editText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="bg-black text-white w-full h-screen flex justify-center pt-12">
      <div className="border-gray-300 p-6 rounded-lg w-[35%]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">CrudApp</h1>
        </div>
        <div className="mb-20 flex flex-row">
          <form className="flex flex-row w-full" onSubmit={submitTodo}>
            <Input
              name={todoText}
              handleChange={handleChange}
              label={"add new"}
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white p-2  ml-2 w-14 rounded block"
            >
              +
            </button>
          </form>
        </div>

        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleDone={toggleDone}
              startEdit={startEdit}
              editId={editId}
              editText={editText}
              handleEditChange={handleEditChange}
              submitEdit={submitEdit}
              cancelEdit={cancelEdit}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
