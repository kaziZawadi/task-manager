import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    const matchStatus =
      filter === "active" ? !task.done : filter === "done" ? task.done : true;

    const matchCategory =
      categoryFilter === "all" ? true : task.category === categoryFilter;

    return matchStatus && matchCategory;
  });

  function addTask(text, category) {
    const newTask = {
      id: Date.now(),
      text: text,
      category: category,
      done: false,
    };

    setTasks([...tasks, newTask]);
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function editTask(id, newText) {
    const text = newText.trim();

    if (text.length === 0) {
      setTasks(tasks.filter((task) => task.id !== id));
      return;
    }

    setTasks(tasks.map((task) => (task.id === id ? { ...task, text } : task)));
  }

  const total = tasks.length;
  const done = tasks.filter((task) => task.done).length;
  const active = total - done;

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskInput onAdd={addTask} />

      <div>
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active-filter" : ""}
        >
          Toutes
        </button>

        <button
          onClick={() => setFilter("active")}
          className={filter === "active" ? "active-filter" : ""}
        >
          Actives
        </button>

        <button
          onClick={() => setFilter("done")}
          className={filter === "done" ? "active-filter" : ""}
        >
          Terminées
        </button>
      </div>
      <p>
        {active} active(s) / {done} terminée(s)
      </p>
      <div>
        <button onClick={() => setCategoryFilter("all")}>Toutes</button>
        <button onClick={() => setCategoryFilter("Perso")}>Perso</button>
        <button onClick={() => setCategoryFilter("Travail")}>Travail</button>
        <button onClick={() => setCategoryFilter("Urgent")}>Urgent</button>
      </div>
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  );
}

export default App;
