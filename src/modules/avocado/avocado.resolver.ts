import type { Atributes, Avocado, Prisma, PrismaClient } from '@prisma/client';
import { Context } from 'apollo-server-core';

export type ResolverParent = unknown;
export type ResolverContext = Context<{ prisma: PrismaClient; user: any }>;
export type ResolverArgs = { where?: Prisma.AvocadoWhereInput; skip?: number; take?: number };
interface CreateAvocadoArgs {
  input: Pick<Avocado, 'name' | 'image' | 'price' | 'sku'> & { atributes: Atributes };
}
export class AvoResolver {
  public static findAll = async (
    _parent: ResolverParent,
    args: ResolverArgs,
    context: ResolverContext
  ): Promise<Avocado[]> => {
    return await context.prisma.avocado.findMany({
      where: args.where,
      include: { atributes: true },
      skip: args.skip,
      take: args.take,
    });
  };

  public static create = async (
    _parent: ResolverParent,
    args: CreateAvocadoArgs,
    context: ResolverContext
  ): Promise<Avocado> => {
    return await context.prisma.avocado.create({
      data: {
        ...args.input,
        atributes: {
          create: args.input.atributes,
        },
      },
    });
  };

  public static findById = async (
    _parent: ResolverParent,
    args: { id: string },
    context: ResolverContext
  ): Promise<Avocado | null> => {
    return await context.prisma.avocado.findUnique({
      where: {
        id: parseInt(args.id),
      },
      include: { atributes: true },
    });
  };
}
