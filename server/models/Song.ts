export interface SongFilters {
  kategorija_id?: number;
  redosled?: 'lajkovi';
}

export interface Category {
  id: number;
  naziv: string;
}

export interface SongWithLikes extends Song {
  broj_lajkova: number;
}

export default interface Song {
  id: number;
  naziv: string;
  umetnik: string;
  video_url: string;
  kategorija_id: number;
}