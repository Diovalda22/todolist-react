import React, { useState } from "react";

function TodoInput({ addTask }) {
  const [task, setTask] = useState("");
  const [urgentLevel, setUrgentLevel] = useState("Medium"); // Default "Medium"

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task, urgentLevel); // Kirim sesuai format yang diharapkan backend
      setTask("");
      setUrgentLevel("Medium"); // Reset ke default
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex justify-center">
      {/* Input Task */}
      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="Add a new task" 
        className="p-3 rounded-l-md border border-gray-300" 
      />

      {/* Dropdown Urgent Level */}
      <select
        value={urgentLevel}
        onChange={(e) => setUrgentLevel(e.target.value)}
        className="p-3 border border-gray-300"
      >
        <option value="Low">Low</option>
        <option value="Medium">Normal</option>
        <option value="High">High</option>
      </select>

      {/* Tombol Add */}
      <button type="submit" className="bg-blue-500 text-white p-3 rounded-r-md">Add</button>
    </form>
  );
}

export default TodoInput;
