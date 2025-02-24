import React, { useState } from "react";
import { Form, Button, Card, Row, Col, ButtonGroup } from "react-bootstrap";
import { Genre } from "@/types/music";
import { mockSongs } from "@/data/mockData";

const HomePage: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<Genre>("Sve");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSongs = mockSongs.filter((song) => {
    const matchesGenre =
      selectedGenre === "Sve" || song.genre === selectedGenre;
    const matchesSearch =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <>
      <Form className="mb-4">
        <Form.Control
          type="search"
          placeholder="Pretražite muziku..."
          className="bg-dark text-white border-secondary rounded-pill"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form>

      <ButtonGroup className="d-flex flex-wrap gap-2 mb-4">
        {["Sve", "Elektronika", "Hip Hop", "Pop", "World", "Rok", "Džez"].map(
          (genre) => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? "success" : "dark"}
              className="rounded-pill"
              onClick={() => setSelectedGenre(genre as Genre)}
            >
              {genre}
            </Button>
          ),
        )}
      </ButtonGroup>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredSongs.map((song) => (
          <Col key={song.id}>
            <Card bg="dark" className="h-100 border-secondary">
              <Card.Img
                variant="top"
                src={song.imageUrl}
                className="song-image"
              />
              <Card.Body>
                <Card.Title>{song.title}</Card.Title>
                <Card.Text className="text-muted">{song.artist}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">{song.genre}</small>
                  <div className="d-flex align-items-center gap-2">
                    <span>❤️</span>
                    <span>{song.likes}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
