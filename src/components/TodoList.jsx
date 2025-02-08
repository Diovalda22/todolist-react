import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import VectorImg from "../assets/vector.png";
import Navbar from "./Navbar";
import ClientApi from "../Utils/ClientApi";
import { Navigate } from "react-router-dom";

function TodoList() {
  const [dataTask, setDataTask] = useState([]);
  const list_id = localStorage.getItem("list_id");

  if(localStorage.getItem('token') == null) {
    return <Navigate to={'/login'}/>
  }

  // 1️⃣ Ambil daftar task dari API saat komponen dimuat
  useEffect(() => {
    ClientApi.get("/tasks", {
      params: { list_id }
  })
      .then(({ data }) => {
        setDataTask(data.data); // Sesuaikan dengan struktur response dari Laravel
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
      });
  }, []);

  // 2️⃣ Fungsi menambah task (POST ke API)
  const addTask = (title, urgent_level) => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    // const list_id = localStorage.getItem("list_id");
  
    if (!token || !user_id) {
      console.error("Token atau User ID tidak ditemukan!");
      return;
    }
  
    ClientApi.post(
      "/tasks",
      { title,urgent_level, isCompleted: false, user_id, list_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(({ data }) => {
        setDataTask([...dataTask, data.data]); // Tambahkan task baru ke state
      })
      .catch((error) => {
        console.error("Gagal menambahkan task:", error);
      });
  };

  // 3️⃣ Fungsi menghapus task (DELETE ke API)
  const removeTask = (id) => {
    ClientApi.delete(`/tasks/${id}`)
      .then(() => {
        setDataTask(dataTask.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error("Gagal menghapus task:", error);
      });
  };

  // 4️⃣ Fungsi mengedit task (PUT ke API)
const editTask = (id, newTitle, newUrgentLevel) => {
  ClientApi.put(`/tasks/${id}`, { title: newTitle, urgent_level: newUrgentLevel })
    .then(() => {
      setDataTask(
        dataTask.map((task) =>
          task.id === id
            ? { ...task, title: newTitle, urgent_level: newUrgentLevel, isEditing: false }
            : task
        )
      );
    })
    .catch((error) => {
      console.error("Gagal mengedit task:", error);
    });
};


  // 5️⃣ Fungsi toggle edit mode
  const toggleEdit = (id) => {
    setDataTask(
      dataTask.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  // 6️⃣ Fungsi toggle task selesai (PATCH ke API)
  const toggleComplete = (id, currentStatus) => {
    const updatedStatus = !currentStatus; // 👈 Pastikan nilai baru hanya dihitung sekali
  
    ClientApi.patch(`/tasks/${id}`, { isCompleted: updatedStatus })
      .then(() => {
        setDataTask((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, isCompleted: updatedStatus } : task
          )
        );
      })
      .catch((error) => {
        console.error("Gagal mengubah status:", error);
      });
  };
  

  return (
    <div className="bg-pink-50 p-4">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <img src={VectorImg} alt="gambar" className="mx-[80px]" />

        <div className="flex flex-col gap-4">
          <div className="bg-purple-300 p-2">
            <h1 className="text-2xl font-bold text-center text-white">{localStorage.getItem('name_list')}</h1>
          </div>
          <div className="max-w-lg mx-auto p-8 bg-white shadow-2xl">
            <TodoInput addTask={addTask} />

            <ul className="space-y-4 mt-6">
              {dataTask.map((task) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  removeTask={removeTask}
                  editTask={editTask}
                  toggleEdit={toggleEdit}
                  toggleComplete={toggleComplete}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
