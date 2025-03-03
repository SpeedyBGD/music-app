import React from "react";
import { Button } from "react-bootstrap";
import SearchIcon from "@/components/icons/SearchIcon";
import { useNavigate } from "react-router-dom";
import { useFilters } from "@/context/FiltersContext";
import { usePlayer } from "@/context/PlayerContext";
import { searchSongs } from "@/services/musicService";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  const navigate = useNavigate();
  const { setSelectedGenre, setSortBy } = useFilters();
  const { setSongs } = usePlayer();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSelectedGenre("Sve");
    setSortBy("newest");
    const songs = await searchSongs(query);
    setSongs(songs);
    navigate("/");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      className="d-none d-md-flex align-items-center bg-secondary rounded-pill flex-grow-1 mx-4"
      style={{ maxWidth: "500px" }}
    >
      <input
        type="text"
        placeholder="Pretražite muziku..."
        className="form-control bg-transparent border-0 text-white"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button variant="link" className="text-white" onClick={handleSearch}>
        <SearchIcon size={20} />
      </Button>
    </div>
  );
};

export default SearchBar;
