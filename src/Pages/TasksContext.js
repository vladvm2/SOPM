// TasksContext.js
import React, { createContext, useState, useContext } from 'react';

const TasksContext = createContext();

const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};

const TasksProvider = ({ children }) => {
  const [savedTasks, setSavedTasks] = useState([]);

  const saveTask = (task) => {
    setSavedTasks((prevTasks) => [...prevTasks, task]);
  };

  return (
    <TasksContext.Provider value={{ savedTasks, saveTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export { TasksContext, TasksProvider, useTasks };
