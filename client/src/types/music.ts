export interface Song {
  id: string;
  naziv: string;
  umetnik: string;
  kategorijaId: number;
  brojLajkova: number;
  youtubeId: string;
  lajkovaoKorisnik: number;
}

export interface Category {
  id: number;
  naziv: string;
}
