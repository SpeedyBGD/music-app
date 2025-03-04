import React from "react";
import { Row, Col } from "react-bootstrap";
import { Song } from "@/types/music";
import SongCard from "@/components/songs/SongCard";

interface SongGridProps {
  songs: Song[];
}

const SongGrid: React.FC<SongGridProps> = ({ songs }) => (
  <Row className="g-3">
    {songs.map((song) => (
      <Col key={song.id} xs={6} sm={4} md={3} lg={2} xl={2}>
        <SongCard song={song} />
      </Col>
    ))}
  </Row>
);

export default SongGrid;
