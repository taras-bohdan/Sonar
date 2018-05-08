import { graphqlKoa } from 'apollo-server-koa';
import { makeExecutableSchema } from 'graphql-tools';
import UserLocation from '../models/userLocation';

const typeDefs = `
  scalar Date

  type User {
    id: Int!
    name: String
    birthday: Date
    location: String
    photo: String
  }

  type Device {
    type: String
    manufacturer: String
  }
  
  type Point {
    lat: Float
    lon: Float
  }
  
  type AccessPoint {
    name: String
    placement: Point
    group: String
  }
  
  type Signal {
    point: AccessPoint
    signalStrength: Float
  }
  
  type Connection {
    signals: [Signal]
    mac: String
  }
  
  type UserLocation {
    user: User
    connection: Connection
    device: Device
    date: Date
  }

  # the schema allows the following query:
  type Query {
    userLocations: [UserLocation]
    user(name: String): User
    userById(id: Int!): User
  }
`;

const resolvers = {
  Query: {
    userLocations: async () => await UserLocation.find(),
    user: async (_, { name }) => {
      const usersLocation = await UserLocation.findOne({ 'user.name': name }, { user: 1 });
      return usersLocation && usersLocation.user;
    },
    userById: async (_, { id }) => {
      const usersLocation = await UserLocation.findOne({ 'user.id': id }, { user: 1 });
      return usersLocation && usersLocation.user;
    },
  },
};


export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default graphqlKoa({
  schema: schema,
  graphiql: true,
});
