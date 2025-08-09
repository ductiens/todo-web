import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiCalendarScheduleLine } from "react-icons/ri";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!title.trim()) return;

    try {
      await axios.post("http://localhost:8080/tasks", {
        title,
        description,
      });
      fetchTasks();
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 rounded-2xl shadow-lg h-[750px]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b pb-3">
        <RiCalendarScheduleLine className="text-4xl text-orange-500" />
        <h1 className="text-3xl font-bold text-slate-800">To-Do List</h1>
      </div>

      {/* Form */}
      <div className="bg-gray-100 p-4 mt-4 rounded-xl shadow-inner">
        <input
          className="w-full mb-3 bg-white rounded-lg border border-gray-300 outline-none h-12 px-4 text-slate-700 focus:border-orange-500"
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full mb-3 bg-white rounded-lg border border-gray-300 outline-none h-20 px-4 py-2 text-slate-700 resize-none focus:border-orange-500"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="w-full h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:opacity-90 transition"
        >
          Add Task +
        </button>
      </div>

      {/* Scrollable Task List */}
      <div className="mt-4 flex-1 overflow-y-auto pr-2 space-y-3">
        {tasks.map((task) => (
          <TodoItems
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            completed={task.completed}
            onTaskUpdated={fetchTasks} 
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
