import { ApolloServer, gql } from 'apollo-server-koa';

import UserLocation from '../models/user-location.model';

const typeDefs = gql`
  scalar Date

  type DeviceUser {
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
  
  type DeviceUserLocation {
    deviceUser: DeviceUser
    connection: Connection
    device: Device
    date: Date
  }

  # the schema allows the following query:
  type Query {
    deviceUserLocations: [DeviceUserLocation]
    deviceUser(name: String): DeviceUser
    deviceUserById(id: Int!): DeviceUser
  }
`;

const resolvers = {
  Query: {
    deviceUserLocations: async () => await UserLocation.find(),
    deviceUser: async (_, { name }) => {
      const deviceUsersLocation = await UserLocation.findOne({ 'deviceUser.name': name }, { user: 1 });
      return deviceUsersLocation && deviceUsersLocation.user;
    },
    deviceUserById: async (_, { id }) => {
      const deviceUsersLocation = await UserLocation.findOne({ 'deviceUser.id': id }, { user: 1 });
      return deviceUsersLocation && deviceUsersLocation.user;
    },
  },
};


export const apollo = new ApolloServer({
  typeDefs,
  resolvers,
});
