import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListChecks, LogOut, UserCircle, CheckSquare } from "lucide-react";
import ClientApi from "../Utils/ClientApi";

function Navbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userName = localStorage.getItem("name") || "User";
  const userEmail = localStorage.getItem("email") || "user@example.com";

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found!");
      return navigate("/login");
    }

    try {
      await ClientApi.post("/logout", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 bg-white shadow-md border-b border-gray-200">
      {/* Logo dengan Icon */}
      <div 
        className="text-xl font-bold text-purple-600 flex items-center gap-2 cursor-pointer hover:text-purple-800 transition"
        onClick={() => navigate("#")}
      >
        <CheckSquare className="w-6 h-6 text-pink-400" /> {/* Ikon Ditambahkan */}
        Tiara Todolist
      </div>
      
      {/* Navbar Items */}
      <div className="flex items-center gap-4">
        {/* Tombol Todolist */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition-all"
        >
          <ListChecks /> Todolist
        </button>
        
        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition-all"
          >
            <UserCircle className="text-xl" /> {userName}
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 border border-gray-200">
              <div className="px-4 py-2 text-purple-600">
                <p className="font-bold">{userName}</p>
                <p className="text-sm text-purple-400">{userEmail}</p>
              </div>
              <hr className="border-gray-200" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 transition-all"
              >
                <LogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
