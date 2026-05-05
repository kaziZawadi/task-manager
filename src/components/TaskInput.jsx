import { useState } from "react";

function TaskInput({ onAdd }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Perso");

  function handleSubmit(e) {
    e.preventDefault();

    if (text.trim().length === 0) return;

    onAdd(text, category);
    setText("");
    setCategory("Perso");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nouvelle tâche..."
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Perso">Perso</option>
        <option value="Travail">Travail</option>
        <option value="Urgent">Urgent</option>
      </select>

      <button type="submit">Ajouter</button>
    </form>
  );
}

export default TaskInput;
