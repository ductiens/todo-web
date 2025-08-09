import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const TodoItems = ({ id, title, description, completed, onTaskUpdated }) => {
  const handleToggleComplete = async () => {
    try {
      await axios.put(`${API}/tasks/${id}`, {
        completed: !completed,
      });
      onTaskUpdated();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Hàm xóa task
  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/tasks/${id}`);
      onTaskUpdated();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition">
      {completed ? (
        <IoCheckmarkCircleOutline
          className="text-3xl text-green-500 mt-1 cursor-pointer flex-shrink-0"
          onClick={handleToggleComplete}
        />
      ) : (
        <MdRadioButtonUnchecked
          className="text-3xl text-orange-500 mt-1 cursor-pointer flex-shrink-0"
          onClick={handleToggleComplete}
        />
      )}

      <div className="flex-1 min-w-0">
        <p
          className={`text-lg font-semibold break-words ${
            completed ? "line-through text-slate-400" : "text-slate-800"
          }`}
        >
          {title}
        </p>
        <p
          className={`text-sm break-words line-clamp-3 ${completed ? "line-through text-slate-300" : "text-slate-500"}`}
        >
          {description}
        </p>
      </div>

      <RiDeleteBin6Line
        className="text-xl text-red-500 cursor-pointer hover:text-red-600 flex-shrink-0"
        onClick={handleDelete}
      />
    </div>
  );
};

export default TodoItems;
