import { Trash, Edit, Check } from "lucide-react";
import React, { useState, useEffect } from "react";

function TodoItem({ task, removeTask, editTask, toggleEdit, toggleComplete }) {
  const [newText, setNewText] = useState(task.title || "");
  const [newUrgentLevel, setNewUrgentLevel] = useState(task.urgent_level || "Medium"); // Tambahkan state untuk urgent level
  const [isChecked, setIsChecked] = useState(task.isCompleted || false);

  useEffect(() => {
    setNewText(task.title || "");
    setNewUrgentLevel(task.urgent_level || "Medium"); // Perbarui state urgent level saat task berubah
    setIsChecked(task.isCompleted || false);
  }, [task]);

  const handleEditSubmit = () => {
    if (newText.trim()) {
      editTask(task.id, newText, newUrgentLevel); // Kirim urgent level yang diperbarui
    }
  };

  const handleCheckboxChange = () => {
    toggleComplete(task.id, task.isCompleted);
  };

  // Format tanggal
  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  // Fungsi untuk mendapatkan warna berdasarkan level urgensi
  const getUrgencyColor = (level) => {
    if (!level) return "bg-gray-300 text-black"; // Jika null atau undefined
    
    const formattedLevel = level.charAt(0).toUpperCase() + level.slice(1).toLowerCase(); // Kapitalisasi level

    switch (formattedLevel) {
      case "High":
        return "bg-red-500 text-white";
      case "Medium":
        return "bg-yellow-400 text-white";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-black"; // Jika tidak cocok, tetap abu-abu
    }
  };

  return (
    <li className="flex flex-col p-4 w-[400px] bg-purple-50 shadow-lg rounded-lg mb-3">
      {/* Bagian atas: Checkbox + Teks */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="h-5 w-5 border-2 border-gray-300 rounded-full appearance-none bg-white checked:bg-purple-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {task.isEditing ? (
            <>
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value || "")}
                className="p-2 border border-gray-300 w-[150px] rounded-lg"
              />
              <select
                value={newUrgentLevel}
                onChange={(e) => setNewUrgentLevel(e.target.value)}
                className="p-2 border border-gray-300 w-[70px] rounded-lg"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </>
          ) : (
            <span className={`text-lg ${isChecked ? "line-through text-gray-500" : ""}`}>
              {newText}
            </span>
          )}
        </div>

        {/* Tombol Aksi */}
        <div className="flex space-x-2">
          {task.isEditing ? (
            <button onClick={handleEditSubmit} className="p-2 bg-purple-400 text-white rounded hover:bg-purple-400 flex items-center justify-center">
              <Check className="h-5 w-5" />
            </button>
          ) : (
            <button onClick={() => toggleEdit(task.id)} className="p-2 bg-transparent text-purple-500 rounded hover:text-purple-400 flex items-center justify-center">
              <Edit className="h-5 w-5" />
            </button>
          )}

          <button onClick={() => removeTask(task.id)} className="p-2 bg-transparent text-purple-500 rounded hover:text-purple-400 flex items-center justify-center">
            <Trash className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Bagian bawah: Urgent Level + Tanggal */}
      <div className="flex justify-between items-center mt-3">
        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getUrgencyColor(task.urgent_level)}`}>
          {task.urgent_level}
        </span>
        <span className="text-sm text-gray-500">{formatDate(task.created_at)}</span>
      </div>
    </li>
  );
}

export default TodoItem;
