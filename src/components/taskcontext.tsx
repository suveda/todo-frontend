"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const API_BASE_URL = 'http://localhost:8000/api';

export interface Task {
  id: string | number;
  title: string;
  color: string;
  completed: boolean;
}

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "completed">) => Promise<void>;
  updateTask: (id: string | number, data: Partial<Omit<Task, "id">>) => Promise<void>;
  toggleComplete: (id: string | number) => Promise<void>;
  deleteTask: (id: string | number) => Promise<void>;
  loading: boolean;
  error: string | null;
};

const TaskContext = createContext<TaskContextType | null>(null);

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
}

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/tasks`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: Omit<Task, "id" | "completed">) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      
      const newTask = await response.json();
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
      console.error('Failed to add task:', err);
    }
  };

  const updateTask = async (id: string | number, data: Partial<Omit<Task, "id">>) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      
      const updatedTask = await response.json();
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
      console.error('Failed to update task:', err);
    }
  };

  const toggleComplete = async (id: string | number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      await updateTask(id, { completed: !task.completed });
    }
  };

  const deleteTask = async (id: string | number) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      console.error('Failed to delete task:', err);
    }
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      addTask, 
      updateTask, 
      toggleComplete, 
      deleteTask, 
      loading,
      error 
    }}>
      {children}
    </TaskContext.Provider>
  );
};
