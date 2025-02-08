import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientApi from "../Utils/ClientApi";

function Navbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fungsi untuk handle logout
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      console.warn("No token found!");
      return navigate("/login");
    }

    try {
      await ClientApi.post("/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full flex justify-end items-center p-4 bg-gray-100 shadow-md">
      {/* Dropdown Todolist */}
      <div className="relative mr-4">
        <button
          onClick={() => navigate('/list')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-md transition-colors"
        >
          Todolist
        </button>
      </div>
      {/* Tombol Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-3 rounded-md transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
