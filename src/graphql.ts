import { join } from 'path';
import { readFileSync } from 'fs';
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './resolvers';
import { Express } from 'express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { Server } from 'http';
import { config } from './config';

const typeDefs = readFileSync(join(__dirname, './', 'schema.graphql'), 'utf8');
const prisma = new PrismaClient();

export const apoloServerInit = async (app: Express, httpServer: Server) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    introspection: false,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    context: ({ req }) => {
      return {
        prisma,
        req,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  console.log(`🚀  Graphql ready at http://localhost:${config.port}${server.graphqlPath}`);
};
