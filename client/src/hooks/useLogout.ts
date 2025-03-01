import { useAuth } from "@/context/AuthContext";
import { logout } from "@/services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useLogout = () => {
  const { logout: authLogout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      authLogout();
      toast.success("Uspešno ste se odjavili!");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(
        error.response?.data?.message || "Došlo je do greške pri odjavi.",
      );
    }
  };

  return handleLogout;
};

export default useLogout;
