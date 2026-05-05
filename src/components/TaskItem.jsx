function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <span
        style={{
          textDecoration: task.done ? "line-through" : "none",
          color: task.done ? "#999" : "#000",
        }}
      >
        {task.text}
      </span>
      <small> ({task.category})</small>

      <button onClick={() => onDelete(task.id)}>❌</button>
    </li>
  );
}

export default TaskItem;
