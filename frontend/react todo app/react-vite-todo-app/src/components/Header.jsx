const Header = ({ count }) => {
  return (
    <div className="header">
      <h1>✨ My To-Do App</h1>
      <p className="task-counter">
        Total Tasks: {count}
      </p>
    </div>
  );
};

export default Header;
