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

### Brzi start (preporučeno)

1. **Instaliraj sve dependencies**  
   Iz root foldera projekta, pokreni:
   ```bash
   npm run install:all
   ```

2. **Pokreni migracije baze podataka**  
   ```bash
   npm run migrate-db
   ```

3. **Pokreni ceo projekat (klijent + server)**  
   ```bash
   npm run dev
   ```

4. **Otvori aplikaciju**
   Otvori browser i idi na `http://localhost:8080`.

### Alternativni načini pokretanja

**Pokretanje samo servera:**
```bash
npm run dev:server
```

**Pokretanje samo klijenta:**
```bash
npm run dev:client
```

**Build projekta:**
```bash
npm run build
```

### Ručno pokretanje (stari način)

Ako želiš da pokreneš klijent i server odvojeno:

1. **Server:** U folderu `server`, pokreni `npm run dev`
2. **Klijent:** U folderu `client`, pokreni `npm run dev`

## Dodatne napomene

- Aplikacija koristi SQLite bazu podataka, tako da nije potrebna dodatna konfiguracija baze.
- Prilikom pokretanja migracija, postojeća baza podataka će biti obrisana i kreirana ispočetka.
- JWT tokeni se koriste za autentikaciju korisnika.
- Lozinke su hashovane koristeći Bcrypt.
