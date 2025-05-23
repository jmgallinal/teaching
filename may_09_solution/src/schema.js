const { gql } = require('apollo-server');

const typeDefs = gql`
  type Artist {
    id: ID
    name: String
    genre: String
    mostKnownSong: String
  }

  type Concert {
    id: ID
    artist: Artist
    date: String
    venue: String
  }

  type Query {
    artists: [Artist]
    concerts: [Concert]
    artistByName(name: String!): [Artist]
  }
  
  type Mutation {
    addArtist(name: String!, genre: String!, mostKnownSong: String!): Artist
    addConcert(artistId: ID!, date: String!, venue: String!): Concert
  }
`;

module.exports = typeDefs;