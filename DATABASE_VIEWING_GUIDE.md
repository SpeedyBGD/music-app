# 📊 SQLite Database Viewing Guide

This guide shows you all the ways to view and manage your SQLite database, similar to Supabase's PostgreSQL viewer.

## 🎯 Quick Start

**Fastest way to view your database:**

```bash
cd server
./view-db.sh
```

Or from the root:

```bash
cd server && ./view-db.sh
```

---

## 📋 Method 1: DB Browser for SQLite (GUI - Recommended!)

**Best for:** Visual browsing, editing data, running queries

### How to Open:

1. **Via Command Line:**
   ```bash
   open -a "DB Browser for SQLite" server/baza.sqlite
   ```

2. **Manually:**
   - Open **DB Browser for SQLite** app (in Applications)
   - Click **File > Open Database**
   - Navigate to: `server/baza.sqlite`
   - Click **Open**

### Features:
- ✅ Visual table browser
- ✅ Edit data directly
- ✅ Run SQL queries
- ✅ View relationships
- ✅ Export data (CSV, JSON, etc.)
- ✅ Import data
- ✅ Database structure viewer

**Similar to Supabase's Table Editor!**

---

## 💻 Method 2: Command Line (sqlite3)

**Best for:** Quick queries, automation, scripts

### Basic Commands:

```bash
# Open database
cd server
sqlite3 baza.sqlite

# Or run commands directly
sqlite3 server/baza.sqlite "SELECT * FROM pesme;"
```

### Useful SQLite Commands:

```bash
# List all tables
sqlite3 server/baza.sqlite ".tables"

# View table structure
sqlite3 server/baza.sqlite ".schema pesme"

# View all data from a table
sqlite3 server/baza.sqlite "SELECT * FROM pesme;"

# View with headers
sqlite3 -header -column server/baza.sqlite "SELECT * FROM pesme;"

# Count records
sqlite3 server/baza.sqlite "SELECT COUNT(*) FROM pesme;"

# Exit sqlite3
.exit
```

### Example Queries:

```bash
# View all songs with category names
sqlite3 -header -column server/baza.sqlite "
SELECT 
    p.id,
    p.naziv AS song,
    p.umetnik AS artist,
    k.naziv AS category
FROM pesme p
LEFT JOIN kategorije k ON p.kategorijaId = k.id;
"

# View users with their likes
sqlite3 -header -column server/baza.sqlite "
SELECT 
    u.email,
    COUNT(l.pesmaId) AS total_likes
FROM korisnici u
LEFT JOIN lajkovanje l ON u.id = l.korisnikId
GROUP BY u.id, u.email;
"
```

---

## 🛠️ Method 3: View Script (Custom)

**Best for:** Quick overview with formatted output

### Run the Script:

```bash
cd server
./view-db.sh
```

### What it shows:
- ✅ All tables list
- ✅ Table schemas
- ✅ Data previews
- ✅ Statistics (counts)
- ✅ Quick command reference

---

## 🔧 Method 4: VS Code Extension

**Best for:** Viewing while coding

### Install Extension:

1. Open VS Code
2. Go to Extensions (Cmd+Shift+X)
3. Search for: **"SQLite Viewer"** or **"SQLite"**
4. Install one of these:
   - **SQLite Viewer** by qwtel
   - **SQLite** by alexcvzz

### Use it:

1. Right-click on `server/baza.sqlite`
2. Select **"Open Database"** or **"View Database"**
3. Browse tables and data in VS Code sidebar

---

## 🌐 Method 5: Online SQLite Viewers

**Best for:** Quick viewing without installing anything

1. **SQLite Viewer (sqliteviewer.app)**
   - Upload your `baza.sqlite` file
   - View tables and data in browser

2. **DB Browser Online**
   - Similar to desktop app but in browser

⚠️ **Note:** Don't upload production databases with sensitive data!

---

## 📊 Your Database Structure

### Tables:

1. **kategorije** (Categories)
   - `id` - Primary key
   - `naziv` - Category name (Pop, Rok, Hip Hop, etc.)

2. **pesme** (Songs)
   - `id` - Primary key
   - `naziv` - Song name
   - `umetnik` - Artist name
   - `youtubeId` - YouTube video ID
   - `kategorijaId` - Foreign key to kategorije
   - `uneto` - Date added

3. **korisnici** (Users)
   - `id` - Primary key
   - `email` - User email (unique)
   - `lozinka` - Hashed password
   - `refreshToken` - JWT refresh token

4. **lajkovanje** (Likes)
   - `korisnikId` - Foreign key to korisnici
   - `pesmaId` - Foreign key to pesme
   - Unique constraint on (korisnikId, pesmaId)

---

## 🔍 Useful SQL Queries

### View All Songs with Categories:
```sql
SELECT 
    p.id,
    p.naziv AS song_name,
    p.umetnik AS artist,
    k.naziv AS category,
    p.youtubeId
FROM pesme p
LEFT JOIN kategorije k ON p.kategorijaId = k.id
ORDER BY p.uneto DESC;
```

### View Songs with Like Counts:
```sql
SELECT 
    p.naziv AS song_name,
    p.umetnik AS artist,
    COUNT(l.pesmaId) AS like_count
FROM pesme p
LEFT JOIN lajkovanje l ON p.id = l.pesmaId
GROUP BY p.id
ORDER BY like_count DESC;
```

### View User Activity:
```sql
SELECT 
    u.email,
    COUNT(l.pesmaId) AS liked_songs,
    GROUP_CONCAT(p.naziv, ', ') AS liked_song_names
FROM korisnici u
LEFT JOIN lajkovanje l ON u.id = l.korisnikId
LEFT JOIN pesme p ON l.pesmaId = p.id
GROUP BY u.id;
```

---

## 🚀 Quick Reference Commands

```bash
# View database overview
cd server && ./view-db.sh

# Open in DB Browser
open -a "DB Browser for SQLite" server/baza.sqlite

# View all songs
sqlite3 -header -column server/baza.sqlite "SELECT * FROM pesme;"

# View all categories
sqlite3 -header -column server/baza.sqlite "SELECT * FROM kategorije;"

# View all users (without passwords)
sqlite3 -header -column server/baza.sqlite "SELECT id, email FROM korisnici;"

# View database file location
ls -lh server/baza.sqlite
```

---

## 💡 Tips

1. **DB Browser for SQLite** is the closest experience to Supabase's table editor
2. Use the **view-db.sh script** for quick overviews
3. Use **command line** for automation and scripts
4. **VS Code extension** is great when you're already coding
5. Always backup your database before making changes!

---

## 📝 Editing Data

### Via DB Browser:
- Double-click any cell to edit
- Right-click for options (delete, copy, etc.)
- Use "Execute SQL" tab for complex queries

### Via Command Line:
```sql
-- Update a song
UPDATE pesme SET naziv = 'New Name' WHERE id = 1;

-- Insert a new song
INSERT INTO pesme (naziv, umetnik, youtubeId, kategorijaId) 
VALUES ('New Song', 'Artist', 'youtubeId123', 1);

-- Delete a song
DELETE FROM pesme WHERE id = 1;
```

---

## 🎯 Comparison with Supabase

| Feature | Supabase | SQLite (This Project) |
|---------|----------|----------------------|
| **View Tables** | ✅ Table Editor | ✅ DB Browser / Script |
| **Edit Data** | ✅ Online Editor | ✅ DB Browser |
| **Run Queries** | ✅ SQL Editor | ✅ DB Browser / Command Line |
| **View Schema** | ✅ Schema Viewer | ✅ `.schema` command |
| **Export Data** | ✅ Export Options | ✅ DB Browser Export |
| **Backup** | ✅ Automatic | ✅ Copy `.sqlite` file |

---

Happy database exploring! 🎵📊

