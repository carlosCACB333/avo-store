import { GraphQLScalarType, Kind } from 'graphql';

export const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Fecha y hora ',
  parseValue(value: any) {
    return new Date(value); // value from the client
  },

  serialize(value: any) {
    return value.toISOString(); // value sent to the client
  },

  parseLiteral(ast: any) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // ast value is always in string format
    }
    return null;
  },
});
