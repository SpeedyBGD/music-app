import { jsx as _jsx } from "react/jsx-runtime";
import { Row, Col } from "react-bootstrap";
import SongCard from "@/components/songs/SongCard";
const SongGrid = ({ songs }) => (_jsx(Row, { className: "g-3 justify-content-start", children: songs.map((song) => (_jsx(Col, { xs: 12, sm: 6, md: 4, lg: 3, xl: 2, children: _jsx(SongCard, { song: song }) }, song.id))) }));
export default SongGrid;
