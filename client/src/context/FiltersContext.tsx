import React, { createContext, useContext, useState, useEffect } from "react";
import { Category, fetchCategories } from "@/services/categoryService";

interface FiltersContextType {
  selectedGenre: number | "Sve"; // Use `number` for category IDs or "Sve" for all
  setSelectedGenre: (genre: number | "Sve") => void;
  sortBy: "newest" | "popularity";
  setSortBy: (sortBy: "newest" | "popularity") => void;
  categories: Category[]; // Add categories to the context
  loading: boolean; // Add loading state
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<number | "Sve">("Sve");
  const [sortBy, setSortBy] = useState<"newest" | "popularity">("newest");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <FiltersContext.Provider
      value={{
        selectedGenre,
        setSelectedGenre,
        sortBy,
        setSortBy,
        categories,
        loading,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};
