import { useAuth } from "@/context/AuthContext";
import { login } from "@/services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useLogin = () => {
  const { login: authLogin } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      authLogin(response.token);
      toast.success("Uspešno ste se prijavili!");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message || "Došlo je do greške pri prijavi.",
      );
    }
  };

  return handleLogin;
};

export default useLogin;
