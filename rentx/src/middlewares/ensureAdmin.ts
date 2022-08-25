import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from "../modules/accounts/repositories/implementations/UserRepository";
import { AppError } from "../errors/AppError";

interface IPayload {
  sub: string;
}

async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }
  const [, token] = authHeader.split(' ');

  const { sub: user_id } = verify(token, "36aecfd4a953c6388e7d604881fd9088") as IPayload;
  console.log(user_id)

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(user_id);

  if (!user?.isAdmin) {
    throw new AppError("User isn't admin.");
  }

  return next();
}

export { ensureAdmin };