import React from "react";
import { Row, Col } from "react-bootstrap";
import { Song } from "@/types/music";
import SongCard from "@/components/songs/SongCard";

interface SongGridProps {
  songs: Song[];
}

const SongGrid: React.FC<SongGridProps> = ({ songs }) => {
  return (
    <Row className="g-4 mt-3">
      {songs.map((song) => (
        <Col key={song.id} xs={12} sm={6} md={4} lg={2} xl={2}>
          <SongCard song={song} />
        </Col>
      ))}
    </Row>
  );
};

export default SongGrid;
