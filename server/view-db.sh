#!/bin/bash

# Database viewer script for SQLite
DB_PATH="./baza.sqlite"

echo "=========================================="
echo "   SQLite Database Viewer"
echo "   Database: $DB_PATH"
echo "=========================================="
echo ""

# Check if database exists
if [ ! -f "$DB_PATH" ]; then
    echo "❌ Database file not found at: $DB_PATH"
    exit 1
fi

echo "📊 Database Tables:"
echo "-------------------"
sqlite3 "$DB_PATH" ".tables"
echo ""

echo "📋 Table Structure:"
echo "-------------------"
echo ""
echo "1. kategorije (Categories):"
sqlite3 "$DB_PATH" ".schema kategorije"
echo ""

echo "2. pesme (Songs):"
sqlite3 "$DB_PATH" ".schema pesme"
echo ""

echo "3. korisnici (Users):"
sqlite3 "$DB_PATH" ".schema korisnici"
echo ""

echo "4. lajkovanje (Likes):"
sqlite3 "$DB_PATH" ".schema lajkovanje"
echo ""

echo "📦 Data Preview:"
echo "----------------"
echo ""

echo "Categories (kategorije):"
echo "-----------------------"
sqlite3 -header -column "$DB_PATH" "SELECT * FROM kategorije;"
echo ""

echo "Songs (pesme) - First 5:"
echo "-----------------------"
sqlite3 -header -column "$DB_PATH" "SELECT id, naziv, umetnik, youtubeId, kategorijaId FROM pesme LIMIT 5;"
echo ""

echo "Users (korisnici):"
echo "-----------------"
sqlite3 -header -column "$DB_PATH" "SELECT id, email FROM korisnici;"
echo ""

echo "Likes (lajkovanje):"
echo "------------------"
sqlite3 -header -column "$DB_PATH" "SELECT * FROM lajkovanje;"
echo ""

echo "📈 Statistics:"
echo "-------------"
sqlite3 "$DB_PATH" "
SELECT 
    'Total Categories' as metric, COUNT(*) as count FROM kategorije
UNION ALL
SELECT 'Total Songs', COUNT(*) FROM pesme
UNION ALL
SELECT 'Total Users', COUNT(*) FROM korisnici
UNION ALL
SELECT 'Total Likes', COUNT(*) FROM lajkovanje;
" -header -column
echo ""

echo "=========================================="
echo "✅ Database viewing complete!"
echo ""
echo "💡 Quick commands:"
echo "   - View all songs: sqlite3 $DB_PATH 'SELECT * FROM pesme;'"
echo "   - Open in DB Browser: open -a 'DB Browser for SQLite' $DB_PATH"
echo "=========================================="

