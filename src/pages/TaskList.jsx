import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedName, setEditedName] = useState("");
  const navigate = useNavigate();

  // Redirect jika tidak ada token
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  // Ambil daftar task dari backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/list", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setTasks(response.data.data);
      })
      .catch((error) => console.error("Gagal mengambil data", error));
  }, []);

  // Tambah tugas baru
  const addTask = () => {
    axios
      .post(
        "http://localhost:8000/api/list",
        { name: newTask },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then((response) => {
        setTasks([...tasks, response.data.data]);
        setNewTask("");
      })
      .catch((error) => console.error("Gagal menambah task", error));
  };

  // Hapus tugas
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:8000/api/list/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Gagal menghapus task", error));
  };

  // Edit tugas
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
      })
      .catch((error) => console.error("Gagal mengedit task", error));
  };

  // Redirect ke halaman detail task
  const viewTask = (id, name) => {
    console.log(name);
    
    navigate(`/tasks/${id}`);
    localStorage.setItem('list_id', id);
    localStorage.setItem('name_list', name);
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Daftar Tugas</h1>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 w-80"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Tambahkan tugas baru..."
        />
        <button className="ml-2 bg-blue-500 text-white p-2" onClick={addTask}>
          Tambah
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center p-2 border-b">
            <span onClick={() => viewTask(task.id, task.name)} className="cursor-pointer">{task.name}</span>
            <div>
              {editingTask === task.id ? (
                <input
                  type="text"
                  className="border p-1"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              ) : null}
              {editingTask === task.id ? (
                <button className="ml-2 bg-green-500 text-white p-2" onClick={() => saveEdit(task.id)}>
                  Simpan
                </button>
              ) : (
                <button className="ml-2 bg-yellow-500 text-white p-2" onClick={() => startEditing(task)}>
                  Edit
                </button>
              )}
              <button className="ml-2 bg-red-500 text-white p-2" onClick={() => deleteTask(task.id)}>
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
