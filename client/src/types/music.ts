export type Genre =
  | "Elektronika"
  | "Hip Hop"
  | "Pop"
  | "World"
  | "Rok"
  | "Džez"
  | "Sve";

export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: Genre;
  likes: number;
  youtubeId: string;
}
