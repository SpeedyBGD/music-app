export interface SongFilters {
  kategorijaId?: number;
  redosled?: 'lajkovi';
}

export interface Category {
  id: number;
  naziv: string;
}

export interface SongWithLikes extends Song {
  brojLajkova: number;
}

export default interface Song {
  id: number;
  naziv: string;
  umetnik: string;
  videoUrl: string;
  kategorijaId: number;
}
