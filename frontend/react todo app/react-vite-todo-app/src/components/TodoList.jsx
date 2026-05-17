import TodoItem from "./TodoItem";

const TodoList = ({
  tasks,
  deleteTask,
  toggleTask,
  editTask,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        🚀 No tasks found. Add something productive!
      </div>
    );
  }

  return (
    <div className="todo-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
};

export default TodoList;
