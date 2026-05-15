import { useState } from "react";
import {
  FaTrash,
  FaEdit,
  FaSave,
  FaCheckCircle,
} from "react-icons/fa";

const TodoItem = ({
  task,
  deleteTask,
  toggleTask,
  editTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(task.text);

  const handleSave = () => {
    if (!updatedText.trim()) return;

    editTask(task.id, updatedText);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      <div className="todo-left">
        <button
          className="icon-btn"
          onClick={() => toggleTask(task.id)}
        >
          <FaCheckCircle />
        </button>

        {isEditing ? (
          <input
            className="edit-input"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
        ) : (
          <span
            className={`todo-text ${
              task.completed ? "completed" : ""
            }`}
          >
            {task.text}
          </span>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <button className="icon-btn" onClick={handleSave}>
            <FaSave />
          </button>
        ) : (
          <button
            className="icon-btn"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit />
          </button>
        )}

        <button
          className="icon-btn"
          onClick={() => deleteTask(task.id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
