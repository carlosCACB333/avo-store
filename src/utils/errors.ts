import { NextFunction, Request, Response } from 'express';

export const handleErrors = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  const { message = 'Something went wrong' } = err;
  res.status(500).json({ message });
};
