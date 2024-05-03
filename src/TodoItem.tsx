import React from "react";
import Input from "./Input";

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

interface Props {
  todo: Todo;
  toggleDone: (id: string) => void;
  deleteTodo: (id: string) => void;
  startEdit: (id: string) => void;
  editId: string | null;
  editText: string;
  handleEditChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitEdit: (id: string) => void;
  cancelEdit: () => void;
}

const TodoItem: React.FC<Props> = ({
  todo,
  toggleDone,
  deleteTodo,
  startEdit,
  editId,
  editText,
  handleEditChange,
  submitEdit,
  cancelEdit,
}) => {
  return (
    <div className="flex items-center p-2 bg-black border border-gray-700 rounded">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleDone(todo.id)}
        className="accent-orange-500 rounded-full"
      />
      {editId === todo.id ? (
        <Input
          name={editText}
          handleChange={handleEditChange}
          label={"add new"}
        />
      ) : (
        <span
          className={`ml-2 flex-1 ${todo.done ? "line-through text-gray-500" : ""}`}
        >
          {todo.text}
        </span>
      )}
      {editId === todo.id ? (
        <>
          <button
            onClick={() => submitEdit(todo.id)}
            className="text-gray-400 hover:text-white"
          >
            ✔️
          </button>
          <button
            onClick={cancelEdit}
            className="text-gray-400 hover:text-white"
          >
            ❌
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => startEdit(todo.id)}
            className="text-gray-400 hover:text-white"
          >
            ✏️
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-gray-400 hover:text-white"
          >
            🗑️
          </button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
