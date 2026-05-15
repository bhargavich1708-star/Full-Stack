import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const TodoForm = ({ addTask }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    addTask(text);
    setText("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">
        <FaPlus />
      </button>
    </form>
  );
};

export default TodoForm;
