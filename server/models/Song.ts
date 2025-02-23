export default interface Song {
  id: number;
  naziv: string;
  umetnik: string;
  video_url: string;
  kategorija_id: number;
  broj_lajkova?: number;
}