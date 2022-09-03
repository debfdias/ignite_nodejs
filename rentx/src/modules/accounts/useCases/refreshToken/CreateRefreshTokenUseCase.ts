import { inject, injectable } from 'tsyringe';
import { sign, verify } from 'jsonwebtoken';
import dayjs from "dayjs";

import { AppError } from '../../../../errors/AppError';
import { authConfig } from '../../../../config/auth';
import { IUsersTokenRepository } from '../../repositories/IUsersTokenRepository';

interface IRequest {
  refresh_token: string;
}

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class CreateRefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokenRepository
  ) {}

  async execute({ refresh_token }: IRequest): Promise<ITokenResponse> {
    const { email, sub: user_id } = verify(
      refresh_token,
      authConfig.secret_refresh_token,
    ) as IPayload;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, refresh_token);

    if (!userToken) {
      throw new AppError('Refresh token does not exists.');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const new_refresh_token = sign({ email }, authConfig.secret_refresh_token, {
      subject: user_id,
      expiresIn: authConfig.expires_in_refresh_token,
    });

    const refresh_token_expires_date = dayjs().add(authConfig.expires_in_refresh_token_days, "days").toDate();

    await this.usersTokensRepository.create({
      user_id,
      refresh_token: new_refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const newToken = sign({}, authConfig.secret_token, {
      subject: user_id,
      expiresIn: authConfig.expires_in_token,
    });

    return {
      token: newToken,
      refresh_token: new_refresh_token
    };
  }
}

export { CreateRefreshTokenUseCase };