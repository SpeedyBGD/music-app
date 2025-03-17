import axiosInstance from "@/services/axiosInterceptor";
export const checkAuth = () => {
    return axiosInstance
        .get("/auth/check", { withCredentials: true })
        .then((response) => response.data);
};
export const login = (email, password) => {
    return axiosInstance.post("/auth/login", { email, password }, { withCredentials: true });
};
export const register = (email, password, confirmPassword) => {
    return axiosInstance.post("/auth/register", { email, password, confirmPassword }, { withCredentials: true });
};
export const logout = () => {
    return axiosInstance.post("/auth/logout", {}, { withCredentials: true });
};
