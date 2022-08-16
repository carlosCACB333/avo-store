import { AvoResolver } from '../modules/avocado/avocado.resolver';
import { DateTime } from './scalars';

export const resolvers = {
  DateTime,
  Query: {
    findAll: AvoResolver.findAll,
    findOne: AvoResolver.findById,
  },
  Mutation: {
    createAvocado: AvoResolver.create,
  },
};
