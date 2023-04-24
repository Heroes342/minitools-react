import React from "react";
import TaskList from "./TaskList";
import { useContext } from "react";
import TaskForm from "./TaskForm";
import { TasksContext, TasksProvider } from "./TasksContext";
import { Link } from "react-router-dom";

function TodoApp() {
  return (
    <div className="todo-box app-box">
      <Link className="no-underline" to="/todo">
        <h1>Todo List</h1>
      </Link>
      <TasksProvider>
        <TaskList />
        <AddTaskForm />
      </TasksProvider>
    </div>
  );
}

function AddTaskForm() {
  const { tasks, setTasks } = useContext(TasksContext);

  const handleAddTask = (taskText: string) => {
    setTasks([...tasks, { text: taskText, checked: false }]);
  };

  return <TaskForm onAddTask={handleAddTask} />;
}

export default TodoApp;
