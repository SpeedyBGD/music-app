import React from "react";
import { useAppContext } from "@/context/AppContext";
import SongCollection from "@/components/songs/SongCollection";

const LikedSongsPage: React.FC = () => {
  const { refreshSongs } = useAppContext();

  return (
    <SongCollection
      title="Moje Omiljene Pesme"
      titleClassName="text-secondary"
      fetchSongs={refreshSongs}
    />
  );
};

export default LikedSongsPage;
