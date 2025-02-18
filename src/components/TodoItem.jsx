import { Trash, Edit, Check, Calendar, Clock } from "lucide-react";
import React, { useState, useEffect } from "react";

function TodoItem({ task, removeTask, editTask, toggleEdit, toggleComplete }) {
  const [newText, setNewText] = useState(task.title || "");
  const [newUrgentLevel, setNewUrgentLevel] = useState(
    task.urgent_level || "Medium"
  );
  const [isChecked, setIsChecked] = useState(task.isCompleted || false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    setNewText(task.title || "");
    setNewUrgentLevel(task.urgent_level || "Medium");
    setIsChecked(task.isCompleted || false);

    // Only show notifications if the task is not completed
    if (!task.isCompleted) {
      // Check if the task deadline needs a notification when page is loaded
      if (task.deadline) {
        checkDeadlineApproaching(task.deadline);
      }

      // If task is new, show task added notification
      if (task?.isNew) {
        showNotification("📌 Tugas baru telah ditambahkan!", "success");
      }
    }

  }, [task]);

  // Check if the deadline is approaching or is today
  const checkDeadlineApproaching = (deadline) => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    
    // Debugging: log the current date and deadline
    console.log("Current Date:", currentDate);
    console.log("Deadline Date:", deadlineDate);

    // Calculate the difference between current date and deadline
    const timeDiff = deadlineDate - currentDate;
    const dayInMillis = 24 * 60 * 60 * 1000;

    // Log the time difference
    console.log("Time Difference (in ms):", timeDiff);

    // If deadline is 1 day before today or it's today
    if (timeDiff <= dayInMillis && timeDiff > 0) {
      showNotification("⏰ Deadline tugas mendekat!", "warning");
    }

    // If today is the deadline
    if (timeDiff <= 0 && timeDiff > -dayInMillis) {
      showNotification("⚠️ Hari ini adalah batas waktu tugas!", "warning");
    }
  };

  const showNotification = (message, type) => {
    // Directly update notification without localStorage for now (testing)
    setNotification({ message, type });

    // Hide the notification after 3 seconds
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const handleEditSubmit = () => {
    if (newText.trim()) {
      editTask(task.id, newText, newUrgentLevel);
      showNotification("✏ Tugas berhasil diperbarui!", "success");
    }
  };

  const handleCheckboxChange = () => {
    toggleComplete(task.id, task.isCompleted);
    showNotification(
      task.isCompleted
        ? "❌ Tugas ditandai sebagai belum selesai!"
        : "✅ Tugas selesai!",
      "success"
    );
  };

  const handleDelete = () => {
    removeTask(task.id);
    showNotification("🗑 Tugas berhasil dihapus!", "error");
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  const getUrgencyColor = (level) => {
    if (!level) return "bg-gray-300 text-black";

    const formattedLevel =
      level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();

    switch (formattedLevel) {
      case "High":
        return "bg-red-500 text-white";
      case "Medium":
        return "bg-yellow-400 text-white";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <div className="relative">
      {notification.message && (
        <div
          className={`fixed top-10 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white shadow-lg ${
            notification.type === "success"
              ? "bg-green-500"
              : notification.type === "warning"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      <li className="flex flex-col p-4 w-[400px] bg-purple-50 shadow-lg rounded-lg mb-3">
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
              <span
                className={`text-lg ${isChecked ? "line-through text-gray-500" : ""}`}
              >
                {newText}
              </span>
            )}
          </div>

          <div className="flex space-x-2">
            {task.isEditing ? (
              <button
                onClick={handleEditSubmit}
                className="p-2 bg-purple-400 text-white rounded hover:bg-purple-400 flex items-center justify-center"
              >
                <Check className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => toggleEdit(task.id)}
                className="p-2 bg-transparent text-purple-500 rounded hover:text-purple-400 flex items-center justify-center"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}

            <button
              onClick={handleDelete}
              className="p-2 bg-transparent text-purple-500 rounded hover:text-purple-400 flex items-center justify-center"
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
          <span
            className={`px-2 py-1 font-medium rounded ${getUrgencyColor(task.urgent_level)}`}
          >
            {task.urgent_level}
          </span>
          <div className="flex gap-3 items-center text-gray-600 text-sm">
            <span className="flex items-center gap-1">
              <Calendar size={16} className="text-gray-500" />
              {formatDate(task.deadline)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} className="text-gray-500" />
              {formatDate(task.created_at)}
            </span>
          </div>
        </div>
      </li>
    </div>
  );
}

export default TodoItem;
