# Aplikacija za muziku - Pesme za Dušu

## Opis projekta

Ovo je full-stack aplikacija za muziku koja omogućava korisnicima da pretražuju, slušaju i lajkuju pesme. Aplikacija je izgrađena sa React frontendom i Express backendom, koristeći SQLite kao bazu podataka. Korisnici mogu da filtriraju pesme po žanru, sortiraju ih po popularnosti ili datumu izdavanja, kao i da pregledaju svoje lajkovane pesme.

## Tehnologije

### Frontend (Klijent)

- **React** (sa TypeScript-om)
- **Vite** (alat za build)
- **React Router** (ruter)
- **React Bootstrap** (UI komponente)
- **Axios** (HTTP klijent)
- **React YouTube** (YouTube plejer)
- **React Toastify** (obaveštenja)

### Backend (Server)

- **Express** (Node.js framework)
- **SQLite** (baza podataka)
- **Better-SQLite3** (SQLite drajver)
- **JWT** (autentikacija)
- **Bcrypt** (hashovanje lozinki)
- **CORS & Helmet** (bezbednost)

## Kako pokrenuti projekat

### Koraci za pokretanje

1. **Kopiraj .env fajlove**  
   U oba foldera (`client` i `server`), kopiraj `.env.example` fajlove u `.env` i popuni potrebne vrednosti.

2. **Pokreni migracije na serveru**  
   U folderu `server`, pokreni migracioni skript:

   ```bash
   npm run migrate-db
   ```

3. **Pokreni server**  
   U folderu **server**, pokreni server:
   ```bash
   npm run dev
   ```
4. **Pokreni klijent**  
   U folderu **client**, pokreni klijent:
   ```bash
   npm run dev
   ```
5. **Otvori aplikaciju**
   Otvori browser i idi na `http://localhost:8080`.

## Dodatne napomene

- Aplikacija koristi SQLite bazu podataka, tako da nije potrebna dodatna konfiguracija baze.
- Prilikom pokretanja migracija, postojeća baza podataka će biti obrisana i kreirana ispočetka.
- JWT tokeni se koriste za autentikaciju korisnika.
- Lozinke su hashovane koristeći Bcrypt.
