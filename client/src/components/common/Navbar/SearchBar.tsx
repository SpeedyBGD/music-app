import React from "react";
import { Button } from "react-bootstrap";
import SearchIcon from "@/components/icons/SearchIcon";

const SearchBar: React.FC = () => {
  return (
    <div
      className="d-none d-md-flex align-items-center bg-secondary rounded-pill flex-grow-1 mx-4"
      style={{ maxWidth: "500px" }}
    >
      <input
        type="text"
        placeholder="Pretražite muziku..."
        className="form-control bg-transparent border-0 text-white"
      />
      <Button variant="link" className="text-white">
        <SearchIcon size={20} />
      </Button>
    </div>
  );
};

export default SearchBar;
