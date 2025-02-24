// src/components/player/YouTubePlayer.tsx
import React from "react";
import { Button } from "react-bootstrap";

const YouTubePlayer: React.FC = () => {
  return (
    <div className="player-container">
      <div className="d-flex justify-content-center align-items-center gap-3">
        <Button variant="link" className="text-white">
          {/* Like button SVG */}
        </Button>
        <div className="flex-grow-1">
          {/* Add YouTube player integration here */}
        </div>
        <Button variant="link" className="text-white">
          {/* Share button SVG */}
        </Button>
      </div>
    </div>
  );
};

export default YouTubePlayer;
