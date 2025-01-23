// src/components/TodoList.js
import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

function TodoList() {
  // State untuk menyimpan task
  const [tasks, setTasks] = useState([]);
  // State untuk status loading
  const [loading, setLoading] = useState(true);

  // Ambil data dari localStorage saat pertama kali dimuat
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
    setLoading(false); // Setelah data selesai diambil, set loading false
  }, []);

  // Menyimpan tasks ke localStorage setiap kali ada perubahan
  useEffect(() => {
    if (tasks.length > 0) {
      setLoading(true); // Set loading true saat menyimpan
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setLoading(false); // Set loading false setelah data disimpan
    }
  }, [tasks]);

  // Fungsi untuk menambah task baru
  const addTask = (task) => {
    setTasks([
      ...tasks,
      { id: Date.now(), text: task, isEditing: false, isCompleted: false },
    ]);
  };

  // Fungsi untuk menghapus task
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Fungsi untuk mengedit taskx    
  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText, isEditing: false } : task
      )
    );
  };

  // Fungsi untuk toggle status edit
  const toggleEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  // Fungsi untuk toggle status selesai
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-blue-50 shadow-2xl rounded-xl">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
        To-Do List
      </h1>

      {/* Loading indicator */}
      {loading && (
        <div className="text-center mb-6">
          <div className="animate-spin border-t-2 border-blue-500 rounded-full w-12 h-12 mx-auto border-4 border-solid"></div>
        </div>
      )}

      {/* Input untuk menambah task */}
      <TodoInput addTask={addTask} />

      {/* Daftar tugas */}
      <ul className="space-y-4 mt-6">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            removeTask={removeTask}
            editTask={editTask}
            toggleEdit={toggleEdit}
            toggleComplete={toggleComplete} // Mengoper fungsi toggleComplete
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
