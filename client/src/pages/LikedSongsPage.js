import { jsx as _jsx } from "react/jsx-runtime";
import { useAppContext } from "@/context/AppContext";
import SongCollection from "@/components/songs/SongCollection";
const LikedSongsPage = () => {
    const { refreshSongs } = useAppContext();
    return (_jsx(SongCollection, { title: "Moje Omiljene Pesme", titleClassName: "text-secondary", fetchSongs: refreshSongs }));
};
export default LikedSongsPage;
