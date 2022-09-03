import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

import { AppError } from "../errors/AppError";
import { authConfig } from "../config/auth";

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
    const { sub: user_id } = verify(token,authConfig.secret_token) as IPayload;
    
    request.user = {
      id: user_id
    }

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}