import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

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

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <TaskInput onAdd={addTask} />

      <div>
        <button onClick={() => setFilter("all")}>Toutes</button>
        <button onClick={() => setFilter("active")}>Actives</button>
        <button onClick={() => setFilter("done")}>Terminées</button>
      </div>

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
      />
    </div>
  );
}

export default App;
