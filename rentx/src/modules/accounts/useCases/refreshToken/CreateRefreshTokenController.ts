import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRefreshTokenUseCase } from './CreateRefreshTokenUseCase';

class CreateRefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token = request.body.token || request.headers['x-access-token'] || request.query.token;

    const createRefreshTokenUseCase = container.resolve(CreateRefreshTokenUseCase);

    const refresh_token = await createRefreshTokenUseCase.execute({
      refresh_token: token,
    });

    return response.json({ refresh_token });
  }
}

export { CreateRefreshTokenController };