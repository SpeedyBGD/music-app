export interface SongFilters {
  kategorija_id?: number;
  redosled?: 'lajkovi' | 'datum';
}

export interface Category {
  id: number;
  naziv: string;
}

export interface SongWithLikes extends Song {
  broj_lajkova: number;
  liked_by_user: boolean;
}
export default interface Song {
  id: number;
  naziv: string;
  umetnik: string;
  video_url: string;
  kategorija_id: number;
}
