// src/components/TodoItem.js
import React from "react";

function TodoItem({ task, removeTask, editTask, toggleEdit, toggleComplete }) {
  return (
    <li className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg mb-3">
      <div className="flex items-center space-x-4">
        {/* Checkbox untuk menandai task sebagai selesai */}
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => toggleComplete(task.id)}
          className="h-5 w-5 border-gray-300 rounded"
        />
        {/* Teks task yang dicoret jika sudah selesai */}
        <span
          className={`flex-1 text-lg ${
            task.isCompleted ? "line-through text-gray-500" : ""
          }`}
        >
          {task.text}
        </span>
      </div>

      {/* Tombol Edit dan Hapus */}
      <div className="flex space-x-2">
        <button
          onClick={() => toggleEdit(task.id)}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => removeTask(task.id)}
          className="   p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Hapus
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
