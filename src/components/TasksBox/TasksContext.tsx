import React, { createContext, useState, useEffect } from "react";

export const TasksContext = createContext({
  tasks: [] as { text: string; checked: boolean }[],
  setTasks: (newState: { text: string; checked: boolean }[]) => {},
});

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const [tasks, setTasks] = useState<{ text: string; checked: boolean }[]>([
    ...storedTasks,
  ]);

  useEffect(() => {
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};
