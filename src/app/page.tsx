"use client";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const task: Task = {
        id: Date.now(),
        description: newTask,
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (taskId: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex mb-4">
        <input type="text" value={newTask} onChange={handleTaskChange} placeholder="Enter a new task" className="flex-grow border rounded-l py-2 px-4" />
        <button onClick={handleAddTask} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r">
          Add Task
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className={`flex items-center bg-gray-100 p-2 rounded ${task.completed ? "bg-green-100" : ""}`}>
            <span className="flex-grow">{task.description}</span>
            <button onClick={() => handleCompleteTask(task.id)} className={`${task.completed ? "text-green-500 hover:text-green-600" : "text-blue-500 hover:text-blue-600"} font-bold mx-1`}>
              {task.completed ? "Completed" : "Complete"}
            </button>
            <button onClick={() => handleDeleteTask(task.id)} className="text-red-500 hover:text-red-600 font-bold mx-1">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
