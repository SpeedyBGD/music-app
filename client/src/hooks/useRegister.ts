import { useAuth } from "@/context/AuthContext";
import { register } from "@/services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useRegister = () => {
  const { login: authLogin } = useAuth();

  const handleRegister = async (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    try {
      const response = await register(email, password, confirmPassword);
      authLogin(response.token);
      toast.success("Uspešno ste se registrovali!");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message || "Došlo je do greške pri registraciji.",
      );
    }
  };

  return handleRegister;
};

export default useRegister;
