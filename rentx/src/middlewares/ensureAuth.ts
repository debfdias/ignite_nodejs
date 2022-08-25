import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuth(request: Request, response: Response, next: NextFunction): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }
  
  const [, token] = authHeader.split(' ');

  try{
    const { sub: user_id } = verify(token, "36aecfd4a953c6388e7d604881fd9088") as IPayload;
    
    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);

    if(!user) {
      throw new AppError("User does not exists!", 401);
    }

    next();

    request.user = {
      id: user_id
    }

  } catch {
    throw new AppError("Invalid token!", 401);
  }

}