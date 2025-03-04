export interface Song {
  id: string;
  naziv: string;
  umetnik: string;
  kategorijaId: number;
  brojLajkova: number;
  youtubeId: string;
  lajkovaoKorisnik: number;
  uneto: string;
}

export interface Category {
  id: number;
  naziv: string;
}
