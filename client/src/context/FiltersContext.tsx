import React, { createContext, useContext, useState } from "react";
import { Genre } from "@/types/music";

interface FiltersContextType {
  selectedGenre: Genre;
  setSelectedGenre: (genre: Genre) => void;
  sortBy: "newest" | "popularity";
  setSortBy: (sortBy: "newest" | "popularity") => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<Genre>("Sve");
  const [sortBy, setSortBy] = useState<"newest" | "popularity">("newest");

  return (
    <FiltersContext.Provider
      value={{ selectedGenre, setSelectedGenre, sortBy, setSortBy }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters mora biti korišćen unutar FiltersProvider-a");
  }
  return context;
};
