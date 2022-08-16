import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

const prisma = new PrismaClient();

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers as any;

  if (!authorization) {
    return res.status(401).json({ message: 'No has enviado el token de autenticación' });
  }

  const token = authorization.replace('Bearer ', '');
  const verify = await verifyToken(token);
  const id = verify?.payload?.id as number;

  if (!id) {
    return res.status(401).json({ message: 'El token es inválido' });
  }

  const user = await prisma.user.findUnique({ where: { id } });
  (req as any).user = user;

  next();
};
