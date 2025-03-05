import React, { useState } from "react";
import { Modal, Form, Button, Dropdown } from "react-bootstrap";
import { useFilters } from "@/context/FiltersContext";
import { usePlayer } from "@/context/PlayerContext";
import { addSong } from "@/services/musicService";
import { toast } from "react-toastify";
import { fetchAllSongs } from "@/services/musicService";
import { AxiosError } from "axios";

interface AddSongModalProps {
  show: boolean;
  onHide: () => void;
}

const AddSongModal: React.FC<AddSongModalProps> = ({ show, onHide }) => {
  const [naziv, setNaziv] = useState("");
  const [umetnik, setUmetnik] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { categories } = useFilters();
  const { setSongs } = usePlayer();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    try {
      await addSong({
        naziv,
        umetnik,
        youtubeId,
        kategorijaId: selectedCategory,
      });
      toast.success("Pesma uspešno dodata!");
      const updatedSongs = await fetchAllSongs("newest");
      setSongs(updatedSongs);
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
            <Form.Label>YouTube ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesite YouTube ID"
              value={youtubeId}
              onChange={(e) => setYoutubeId(e.target.value)}
              className="rounded-pill"
            />
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
