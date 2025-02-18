import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import VectorImg from "../assets/vector.png";
import Navbar from "./Navbar";
import ClientApi from "../Utils/ClientApi";
import { Navigate } from "react-router-dom";
import { Search } from "lucide-react";

function TodoList() {
  const [dataTask, setDataTask] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const list_id = localStorage.getItem("list_id");

  if (localStorage.getItem("token") == null) {
    return <Navigate to={"/login"} />;
  }
  const toggleEdit = (id) => {
    setDataTask((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };
  
  useEffect(() => {
    ClientApi.get("/tasks", {
      params: { list_id },
    })
      .then(({ data }) => {
        setDataTask(data.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
      });
  }, []);

  const addTask = (title, urgent_level, deadline, note) => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");

    if (!token) {
      console.error("Token atau User ID tidak ditemukan!");
      return;
    }

    ClientApi.post(
      "/tasks",
      { title, urgent_level, deadline, note, isCompleted: false, user_id, list_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(({ data }) => {
        setDataTask([...dataTask, data.data]);
      })
      .catch((error) => {
        console.error("Gagal menambahkan task:", error);
      });
  };

  const editTask = (id, newTitle, newUrgentLevel, newDeadline) => {
    ClientApi.put(`/tasks/${id}`, { title: newTitle, urgent_level: newUrgentLevel, deadline: newDeadline })
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

  const removeTask = (id) => {
    ClientApi.delete(`/tasks/${id}`)
      .then(() => {
        setDataTask(dataTask.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error("Gagal menghapus task:", error);
      });
  };

  const toggleComplete = (id, isCompleted) => {
    ClientApi.put(`/tasks/${id}`, { isCompleted: !isCompleted })
      .then(() => {
        setDataTask(
          dataTask.map((task) =>
            task.id === id ? { ...task, isCompleted: !isCompleted } : task
          )
        );
      })
      .catch((error) => {
        console.error("Gagal memperbarui status tugas:", error);
      });
  };

  const filteredTasks = dataTask.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-pink-50 p-4">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center my-4">
        <img src={VectorImg} alt="gambar" className="mx-[80px]" />
        <div className="flex flex-col gap-4">
          <div className="bg-purple-300 p-2">
            <h1 className="text-2xl font-bold text-center text-white">
              {localStorage.getItem("name_list")}
            </h1>
          </div>
          <div className="max-w-lg mx-auto p-8 bg-white shadow-2xl">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Cari task..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border rounded pl-10"
              />
              <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
            </div>
            <TodoInput addTask={addTask} />
            <ul className="space-y-4 mt-6">
              {filteredTasks.map((task) => (
              <TodoItem
              key={task.id}
              task={task}
              editTask={editTask}
              removeTask={removeTask}
              toggleEdit={toggleEdit}      // ✅ Kirim fungsi toggleEdit
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
