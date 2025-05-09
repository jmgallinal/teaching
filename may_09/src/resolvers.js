const artists = [
    { id: 1, name: 'Duki', genre: 'Trap' },
    { id: 2, name: 'Lucho SSJ', genre: 'Trap' },
    { id: 3, name: 'Knak', genre: 'Trap' },
    { id: 4, name: 'Quevedo', genre: 'Pop Rap' },
  ];
  
  const concerts = [
    { id: 1, artistId: 1, date: '2024-10-01', venue: 'Estadio Monumental' },
    { id: 2, artistId: 2, date: '2024-10-15', venue: 'Teatro Obras' },
    { id: 3, artistId: 3, date: '2024-11-01', venue: 'Sala del Museo' },
    { id: 4, artistId: 4, date: '2024-11-15', venue: 'Movistar Arena' },
  ];
  
  const resolvers = {
    Query: {
      artists: () => artists,
      concerts: () => concerts.map(concert => ({
        ...concert,
        artist: artists.find(artist => artist.id === concert.artistId),
      })),
    },
  };
  
  module.exports = resolvers;