import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect, useCallback, } from "react";
import { fetchCategories } from "@/services/categoryService";
import { likeSong, unlikeSong, fetchAllSongs, fetchLikedSongs, } from "@/services/musicService";
import { checkAuth, login as authLogin, register as authRegister, logout as authLogout, } from "@/services/authService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
const AppContext = createContext(undefined);
export const AppProvider = ({ children, }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("Sve");
    const [sortBy, setSortBy] = useState("newest");
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const resetFilters = useCallback(() => {
        setSelectedGenre("Sve");
        setSortBy("newest");
        setCurrentSong(null);
        setCurrentIndex(null);
        setIsPlaying(false);
    }, []);
    const handleLogout = useCallback(() => {
        setIsAuthenticated(false);
        setEmail(null);
        resetFilters();
    }, [resetFilters]);
    const refreshSongs = useCallback(async () => {
        try {
            const fetchMethod = location.pathname === "/moje-lajkovane-pesme"
                ? fetchLikedSongs
                : fetchAllSongs;
            const songs = await fetchMethod(sortBy, selectedGenre === "Sve" ? undefined : selectedGenre);
            setSongs(songs);
        }
        catch (error) {
            console.error("Failed to refresh songs:", error);
            toast.error("Došlo je do greške pri učitavanju pesama.");
        }
    }, [selectedGenre, sortBy, location.pathname]);
    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            checkAuth()
                .then((response) => {
                setIsAuthenticated(true);
                setEmail(response.email);
            })
                .catch(() => {
                setIsAuthenticated(false);
                setEmail(null);
            }),
            fetchCategories()
                .then((categoriesData) => setCategories(categoriesData))
                .catch(() => { }),
        ])
            .then(() => {
            setTimeout(() => setIsLoading(false), 300);
        })
            .catch(() => setIsLoading(false));
    }, []);
    const login = async (email, password) => {
        try {
            await authLogin(email, password);
            setIsAuthenticated(true);
            setEmail(email);
            resetFilters();
            await refreshSongs();
            return { success: true };
        }
        catch (error) {
            const axiosError = error;
            const message = axiosError.response?.data?.message || "Došlo je do greške pri prijavi.";
            return { success: false, message };
        }
    };
    const register = async (email, password, confirmPassword) => {
        try {
            await authRegister(email, password, confirmPassword);
            setIsAuthenticated(true);
            setEmail(email);
            resetFilters();
            await refreshSongs();
            return { success: true };
        }
        catch (error) {
            const axiosError = error;
            const message = axiosError.response?.data?.message ||
                "Došlo je do greške pri registraciji.";
            return { success: false, message };
        }
    };
    const logout = async () => {
        try {
            await authLogout();
            handleLogout();
            if (location.pathname === "/") {
                await refreshSongs();
            }
            else if (location.pathname === "/moje-lajkovane-pesme") {
                navigate("/");
            }
            return Promise.resolve();
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    const playSong = useCallback((song) => {
        const index = songs.findIndex((s) => s.id === song.id);
        setCurrentSong(song);
        setCurrentIndex(index !== -1 ? index : null);
        setIsPlaying(true);
    }, [songs]);
    const playNext = useCallback(() => {
        if (currentIndex !== null && currentIndex < songs.length - 1) {
            setCurrentSong(songs[currentIndex + 1]);
            setCurrentIndex(currentIndex + 1);
        }
        else {
            setCurrentSong(null);
            setCurrentIndex(null);
            setIsPlaying(false);
        }
    }, [currentIndex, songs]);
    const toggleLike = async (songId) => {
        if (!isAuthenticated) {
            toast.info("Morate biti prijavljeni da biste lajkovali pesmu");
            setShowLoginModal(true);
            return;
        }
        const songIndex = songs.findIndex((s) => s.id === songId);
        if (songIndex === -1)
            return;
        const isLiked = songs[songIndex].lajkovaoKorisnik === 1;
        const updatedSongs = [...songs];
        try {
            if (isLiked) {
                await unlikeSong(songId);
                updatedSongs[songIndex] = {
                    ...updatedSongs[songIndex],
                    lajkovaoKorisnik: 0,
                    brojLajkova: updatedSongs[songIndex].brojLajkova - 1,
                };
                toast.success("Uklonili ste lajk sa pesme");
            }
            else {
                await likeSong(songId);
                updatedSongs[songIndex] = {
                    ...updatedSongs[songIndex],
                    lajkovaoKorisnik: 1,
                    brojLajkova: updatedSongs[songIndex].brojLajkova + 1,
                };
                toast.success("Lajkovali ste pesmu");
            }
            setSongs(updatedSongs);
            if (currentSong?.id === songId)
                setCurrentSong(updatedSongs[songIndex]);
        }
        catch (error) {
            if (error.response?.status !== 401) {
                const axiosError = error;
                const message = axiosError.response?.data?.message ||
                    "Došlo je do greške prilikom lajkovanja pesme.";
                toast.error(message);
            }
        }
    };
    return (_jsx(AppContext.Provider, { value: {
            isAuthenticated,
            email,
            login,
            register,
            logout,
            handleLogout,
            categories,
            selectedGenre,
            setSelectedGenre,
            sortBy,
            setSortBy,
            songs,
            setSongs,
            currentSong,
            isPlaying,
            playSong,
            playNext,
            setIsPlaying,
            toggleLike,
            refreshSongs,
            showLoginModal,
            setShowLoginModal,
            isLoading,
        }, children: children }));
};
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context)
        throw new Error("useAppContext must be used within an AppProvider");
    return context;
};
