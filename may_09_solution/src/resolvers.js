/*const artists = [
  { id: 1, name: 'Duki', genre: 'Trap', mostKnownSong: 'She Dont Give a Fo' },
  { id: 2, name: 'Lucho SSJ', genre: 'Trap', mostKnownSong: 'Perdoname si llego tarde' },
  { id: 3, name: 'Knak', genre: 'Trap', mostKnownSong: 'No Me Olvides' },
  { id: 4, name: 'Quevedo', genre: 'Pop Rap', mostKnownSong: 'Quédate (BZRP Music Session #52)' },
];
  
const concerts = [
  { id: 1, artistId: 1, date: '2024-10-01', venue: 'Estadio Monumental' },
  { id: 2, artistId: 2, date: '2024-10-15', venue: 'Teatro Obras' },
  { id: 3, artistId: 3, date: '2024-11-01', venue: 'Sala del Museo' },
  { id: 4, artistId: 4, date: '2024-11-15', venue: 'Movistar Arena' },
];

let nextArtistId = artists.length + 1;
let nextConcertId = concerts.length + 1;

const resolvers = {
  Query: {
    artists: () => artists,
    concerts: () => concerts.map(concert => ({
      ...concert,
      artist: artists.find(artist => artist.id === concert.artistId),
    })),
    artistByName: (_, { name }) => {
      const lowerName = name.toLowerCase();
      return artists.filter(artist =>
        artist.name.toLowerCase().includes(lowerName)
      );
    },
  },
  Mutation: {
    addArtist: (_, { name, genre, mostKnownSong }) => {
      const newArtist = { id: nextArtistId++, name, genre, mostKnownSong };
      artists.push(newArtist);
      return newArtist;
    },
    addConcert: (_, { artistId, date, venue }) => {
      const newConcert = {
        id: nextConcertId++,
        artistId: Number(artistId),
        date,
        venue,
      };
      concerts.push(newConcert);
      return {
        ...newConcert,
        artist: artists.find(artist => artist.id === Number(artistId)),
      };
    },
  },
};

  
module.exports = resolvers;*/

const db = require('./db');

const resolvers = {
  Query: {
    artists: async () => {
      const res = await db.query('SELECT * FROM artists');
      return res.rows;
    },
    concerts: async () => {
      const res = await db.query(`
        SELECT concerts.*, row_to_json(artists) as artist
        FROM concerts
        JOIN artists ON concerts.artist_id = artists.id
      `);
      return res.rows.map(row => ({
        id: row.id,
        date: row.date,
        venue: row.venue,
        artist: row.artist,
      }));
    },
    artistByName: async (_, { name }) => {
      const res = await db.query(
        `SELECT * FROM artists WHERE LOWER(name) LIKE LOWER($1)`,
        [`%${name}%`]
      );
      return res.rows;
    },
  },

  Mutation: {
    addArtist: async (_, { name, genre, mostKnownSong }) => {
      const res = await db.query(
        `INSERT INTO artists (name, genre, most_known_song) VALUES ($1, $2, $3) RETURNING *`,
        [name, genre, mostKnownSong]
      );
      return res.rows[0];
    },
    addConcert: async (_, { artistId, date, venue }) => {
      const res = await db.query(
        `INSERT INTO concerts (artist_id, date, venue) VALUES ($1, $2, $3) RETURNING *`,
        [artistId, date, venue]
      );
      const artist = await db.query(`SELECT * FROM artists WHERE id = $1`, [artistId]);
      return {
        ...res.rows[0],
        artist: artist.rows[0],
      };
    },
  },
};

module.exports = resolvers;
