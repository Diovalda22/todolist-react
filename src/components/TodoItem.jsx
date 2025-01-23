import { Trash, Edit, Check } from "lucide-react";
import React, { useState } from "react";

function TodoItem({ task, removeTask, editTask, toggleEdit, toggleComplete }) {
  const [newText, setNewText] = useState(task.text);

  const handleEditSubmit = () => {
    if (newText.trim()) {
      editTask(task.id, newText); // Perbarui teks tugas
    }
  };

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

        {/* Teks atau Input untuk mengedit */}
        {task.isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg text-lg"
          />
        ) : (
          <span
            className={`flex-1 text-lg ${
              task.isCompleted ? "line-through text-gray-500" : ""
            }`}
          >
            {task.text}
          </span>
        )}
      </div>

      {/* Tombol Edit/Hapus/Save */}
      <div className="flex space-x-2">
        {task.isEditing ? (
          // Tombol Save untuk menyimpan perubahan
          <button
            onClick={handleEditSubmit}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center"
          >
            <Check className="h-5 w-5" />
          </button>
        ) : (
          // Tombol Edit untuk masuk ke mode edit
          <button
            onClick={() => toggleEdit(task.id)}
            className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center justify-center"
          >
            <Edit className="h-5 w-5" />
          </button>
        )}

        {/* Tombol Delete */}
        <button
          onClick={() => removeTask(task.id)}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
        >
          <Trash className="h-5 w-5" />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
