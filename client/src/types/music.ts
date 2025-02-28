export interface Song {
  id: string;
  naziv: string;
  umetnik: string;
  kategorijaId: number;
  lajkova: number;
  youtubeId: string;
}

export interface Category {
  id: number;
  naziv: string;
}
