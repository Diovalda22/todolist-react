import { useNavigate } from "react-router-dom";
import ClientApi from "../Utils/ClientApi";

function Navbar() {

     const navigate = useNavigate();

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
              Authorization: `Bearer ${token}`, // Kirim token di header
            },
          });
      
          localStorage.removeItem("token"); // Hapus token dari localStorage
          localStorage.removeItem("name"); // Hapus name dari localStorage
          localStorage.removeItem("email"); // Hapus email dari localStorage
          navigate("/login"); // Redirect ke halaman login
        } catch (error) {
          console.error("Logout failed:", error);
        }
      };

  return (
    <div className="w-full flex justify-end items-center">
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