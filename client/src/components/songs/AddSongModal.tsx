import React, { useState } from "react";
import { Modal, Form, Button, Dropdown } from "react-bootstrap";
import { useAppContext } from "@/context/AppContext";
import { addSong } from "@/services/musicService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface AddSongModalProps {
  show: boolean;
  onHide: () => void;
}

// Extract YouTube ID from URL or return as-is if already an ID
const extractYouTubeId = (input: string): string => {
  if (!input) return "";
  
  // If it's already just an ID (11 characters, alphanumeric and hyphens/underscores)
  if (/^[a-zA-Z0-9_-]{11}$/.test(input.trim())) {
    return input.trim();
  }
  
  // Extract from various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/.*[?&]v=([a-zA-Z0-9_-]{11})/,
  ];
  
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  // If no pattern matches, return trimmed input (might be invalid, but let backend validate)
  return input.trim();
};

const AddSongModal: React.FC<AddSongModalProps> = ({ show, onHide }) => {
  const [naziv, setNaziv] = useState("");
  const [umetnik, setUmetnik] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { categories, refreshSongs } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    try {
      const extractedId = extractYouTubeId(youtubeId);
      if (!extractedId || extractedId.length !== 11) {
        toast.error("Nevažeći YouTube ID ili URL. Molimo unesite važeći YouTube ID ili URL.");
        return;
      }

      await addSong({
        naziv,
        umetnik,
        youtubeId: extractedId,
        kategorijaId: selectedCategory,
      });
      toast.success("Pesma uspešno dodata!");

      await refreshSongs();

      setNaziv("");
      setUmetnik("");
      setYoutubeId("");
      setSelectedCategory(null);
      onHide();
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message ||
        "Došlo je do greške pri dodavanju pesme.";
      toast.error(message);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>Dodaj Pesmu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formSongTitle">
            <Form.Label>Naziv pesme</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesite naziv pesme"
              value={naziv}
              onChange={(e) => setNaziv(e.target.value)}
              className="rounded-pill"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formArtist">
            <Form.Label>Umetnik</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesite umetnika"
              value={umetnik}
              onChange={(e) => setUmetnik(e.target.value)}
              className="rounded-pill"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formYoutubeId">
            <Form.Label>YouTube ID ili URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesite YouTube ID ili URL (npr. dQw4w9WgXcQ ili https://youtube.com/watch?v=dQw4w9WgXcQ)"
              value={youtubeId}
              onChange={(e) => setYoutubeId(e.target.value)}
              className="rounded-pill"
            />
            <Form.Text className="text-muted">
              Možete uneti samo ID (11 karaktera) ili punu YouTube URL adresu
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Kategorija</Form.Label>
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-light"
                className="w-100 rounded-pill text-start"
              >
                {selectedCategory
                  ? categories.find((cat) => cat.id === selectedCategory)?.naziv
                  : "Izaberite kategoriju"}
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-dark dropdown-menu-dark w-100">
                {categories.map((category) => (
                  <Dropdown.Item
                    key={category.id}
                    className="text-white"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.naziv}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="w-100 rounded-pill mt-3"
          >
            Dodaj pesmu
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddSongModal;
