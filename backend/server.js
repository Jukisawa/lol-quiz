const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const fs = require('fs');
const app = express();
const DB_FILE = './quiz.db';

app.use(cors());

// Datenbank und Tabelle automatisch anlegen
async function initDb() {
  const db = new sqlite3.Database(DB_FILE);
  db.serialize(async() => {
    db.run(`CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT,
      value INTEGER,
      question TEXT,
      answer TEXT,
      guessed INTEGER,
      multipleChoice INTEGER,
      hint TEXT
    )`);

    // Prüfen, ob schon Daten vorhanden sind
    const result = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM questions', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    })
   
    if (result.lenght === 0) {
      // Beispieldaten einfügen
      const insert = db.prepare(`INSERT INTO questions (category, value, question, answer, guessed, multipleChoice, hint) VALUES (?, ?, ?, ?, ?, ?, ?)`);
      insert.run(
        'Geschichte', 100, 'Wer war der erste Bundeskanzler Deutschlands?',
        JSON.stringify(['Konrad Adenauer']), 0, 0,
        JSON.stringify(['Nachkriegszeit', 'CDU', 'Kanzler ab 1949'])
      );
      
      insert.run(
        'Geschichte', 200, 'In welchem Jahr fiel die Berliner Mauer?',
        JSON.stringify(['1989']), 0, 0,
        JSON.stringify(['Ende der DDR', 'November', 'Wende'])
      );
      insert.run(
        'Wissenschaft', 100, 'Was ist H2O?',
        JSON.stringify(['Wasser']), 0, 0,
        JSON.stringify(['Chemische Formel', 'Trinkbar', 'Lebensnotwendig'])
      );
      insert.run(
        'Wissenschaft', 200, 'Wer entwickelte die Relativitätstheorie?',
        JSON.stringify(['Albert Einstein']), 0, 0,
        JSON.stringify(['Physiker', 'E=mc²', 'Nobelpreisträger'])
      );
      insert.finalize();
    };
  });
  db.close();
}

// API-Endpunkt für Fragen
app.get('/api/questions', (req, res) => {
  const db = new sqlite3.Database(DB_FILE);
  db.all('SELECT * FROM questions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    rows.forEach(row => {
      row.answer = JSON.parse(row.answer);
      row.hint = JSON.parse(row.hint);
      row.guessed = !!row.guessed;
      row.multipleChoice = !!row.multipleChoice;
    });
    res.json(rows);
  });
  db.close();
});

app.get('/api/categories', (req, res) => {
  const db = new sqlite3.Database(DB_FILE);
  db.all('SELECT distinct category FROM questions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(a => a.category));
  });
  db.close();
});

// Initialisierung und Serverstart
initDb();
await new Promise(resolve => setTimeout(resolve, 1000)); 
app.listen(3000, () => console.log('API läuft auf http://localhost:3000'));