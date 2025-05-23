const db = require('./db');

async function initDb() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS artists (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      genre TEXT NOT NULL,
      most_known_song TEXT NOT NULL
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS concerts (
      id SERIAL PRIMARY KEY,
      artist_id INTEGER REFERENCES artists(id),
      date DATE NOT NULL,
      venue TEXT NOT NULL
    );
  `);

  const artists = [
    { name: 'Duki', genre: 'Trap', mostKnownSong: 'She Dont Give a Fo' },
    { name: 'Lucho SSJ', genre: 'Trap', mostKnownSong: 'Perdoname si llego tarde' },
    { name: 'Knak', genre: 'Trap', mostKnownSong: 'No Me Olvides' },
    { name: 'Quevedo', genre: 'Pop Rap', mostKnownSong: 'Quédate (BZRP Music Session #52)' },
  ];

  const concerts = [
    { artistIndex: 0, date: '2024-10-01', venue: 'Estadio Monumental' },
    { artistIndex: 1, date: '2024-10-15', venue: 'Teatro Obras' },
    { artistIndex: 2, date: '2024-11-01', venue: 'Sala del Museo' },
    { artistIndex: 3, date: '2024-11-15', venue: 'Movistar Arena' },
  ];

  const { rows: existing } = await db.query(`SELECT COUNT(*) FROM artists`);
  if (parseInt(existing[0].count, 10) === 0) {
    // Insertar artistas
    await Promise.all(
      artists.map(artist =>
        db.query(
          `INSERT INTO artists (name, genre, most_known_song) VALUES ($1, $2, $3)`,
          [artist.name, artist.genre, artist.mostKnownSong]
        )
      )
    );

    const { rows: artistRows } = await db.query(`SELECT id FROM artists ORDER BY id`);

    await Promise.all(
      concerts.map(concert =>
        db.query(
          `INSERT INTO concerts (artist_id, date, venue) VALUES ($1, $2, $3)`,
          [
            artistRows[concert.artistIndex].id,
            concert.date,
            concert.venue
          ]
        )
      )
    );
  }
}

module.exports = initDb;
