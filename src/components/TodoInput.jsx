import React, { useState } from "react";

function TodoInput({ addTask }) {
  const [task, setTask] = useState("");
  const [urgentLevel, setUrgentLevel] = useState("Medium"); // Default "Medium"
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Fungsi untuk menampilkan notifikasi
  const showNotification = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task, urgentLevel);
      showNotification("✅ Tugas berhasil ditambahkan!", "success");
      setTask("");
      setUrgentLevel("Medium"); // Reset ke default
    } else {
      showNotification("⚠ Teks tugas tidak boleh kosong!", "error");
    }
  };

  return (
    <div className="relative">
      {/* Notifikasi */}
      {notification.message && (
        <div
          className={`fixed top-10 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white shadow-lg ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="mb-4 flex justify-center">
        {/* Input Task */}
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Tambahkan tugas baru..." 
          className="p-3 rounded-l-md border border-gray-300" 
        />

        {/* Dropdown Urgent Level */}
        <select
          value={urgentLevel}
          onChange={(e) => setUrgentLevel(e.target.value)}
          className="p-3 border border-gray-300"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Tombol Add */}
        <button type="submit" className="bg-blue-500 text-white p-3 rounded-r-md hover:bg-blue-600">
          Add
        </button>
      </form>
    </div>
  );
}

export default TodoInput;
