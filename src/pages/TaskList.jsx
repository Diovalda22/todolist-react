import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Pencil, Trash2, Search } from "lucide-react";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/list", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setTasks(response.data.data);
        setFilteredTasks(response.data.data);
      })
      .catch(() => showNotification("Gagal mengambil data!", "error"));
  }, []);

  useEffect(() => {
    setFilteredTasks(
      tasks.filter((task) =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, tasks]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    axios
      .post(
        "http://localhost:8000/api/list",
        { name: newTask },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then((response) => {
        setTasks([...tasks, response.data.data]);
        setNewTask("");
        showNotification("✅ Tugas berhasil ditambahkan!", "success");
      })
      .catch(() => showNotification("❌ Gagal menambah tugas!", "error"));
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:8000/api/list/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
        showNotification("🗑 Tugas berhasil dihapus!", "success");
      })
      .catch(() => showNotification("❌ Gagal menghapus tugas!", "error"));
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditedName(task.name);
  };

  const saveEdit = (id) => {
    axios
      .put(
        `http://localhost:8000/api/list/${id}`,
        { name: editedName },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then(() => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, name: editedName } : task)));
        setEditingTask(null);
        showNotification("✏ Tugas berhasil diperbarui!", "success");
      })
      .catch(() => showNotification("❌ Gagal mengedit tugas!", "error"));
  };

  const viewTask = (id, name) => {
    navigate(`/tasks/${id}`);
    localStorage.setItem("list_id", id);
    localStorage.setItem("name_list", name);
  };

  return (
    <div className="container p-6 bg-gradient-to-r from-pink-200 via-purple-200 to-pink-300 min-h-screen flex flex-col items-center relative">
      <Navbar />
      <h1 className="text-3xl font-bold text-purple-700 my-6 text-center">Daftar Tugas</h1>
      
      <div className="mb-4 flex items-center border p-2 rounded-lg shadow-md focus-within:ring-2 focus-within:ring-purple-400">
        <Search size={20} className="text-gray-600 mr-2" />
        <input
          type="text"
          className="focus:outline-none"
          placeholder="Cari tugas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          className="border p-3 w-80 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Tambahkan tugas baru..."
        />
        <button className="ml-3 bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg shadow-md" onClick={addTask}>
          Tambah
        </button>
      </div>
      
      <ul className="w-[500px] mx-auto bg-white p-6 rounded-lg shadow-md">
        {filteredTasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center p-3 border-b border-gray-200">
            <span onClick={() => viewTask(task.id, task.name)} className="cursor-pointer text-purple-700 font-medium hover:underline">
              {task.name}
            </span>
            <div className="flex items-center gap-2">
              {editingTask === task.id ? (
                <input
                  type="text"
                  className="border p-2 rounded-md"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              ) : null}
              {editingTask === task.id ? (
                <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md" onClick={() => saveEdit(task.id)}>
                  Simpan
                </button>
              ) : (
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md flex items-center" onClick={() => startEditing(task)}>
                  <Pencil size={16} />
                </button>
              )}
              <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md flex items-center" onClick={() => deleteTask(task.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
