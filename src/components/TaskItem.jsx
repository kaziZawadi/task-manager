import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(task.text);

  function startEditing() {
    setIsEditing(true);
    setEditingText(task.text);
  }

  function saveEdit() {
    onEdit(task.id, editingText);
    setIsEditing(false);
  }

  function cancelEdit() {
    setIsEditing(false);
    setEditingText(task.text);
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEdit();
            if (e.key === "Escape") cancelEdit();
          }}
          autoFocus
        />
      ) : (
        <span onDoubleClick={startEditing} className={task.done ? "done" : ""}>
          {task.text}
        </span>
      )}
      <small> ({task.category})</small>

      <button onClick={() => onDelete(task.id)}>❌</button>
    </li>
  );
}

export default TaskItem;
