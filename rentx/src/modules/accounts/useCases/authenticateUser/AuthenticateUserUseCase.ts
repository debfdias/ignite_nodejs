import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import dayjs from "dayjs";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import { authConfig } from '../../../../config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokenRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({}, authConfig.secret_token, {
      subject: user.id,
      expiresIn: authConfig.expires_in_token,
    });

    const refresh_token = sign({ email }, authConfig.secret_refresh_token, {
      subject: user.id,
      expiresIn: authConfig.expires_in_refresh_token
    })

    await this.usersTokensRepository.create({
      expires_date: dayjs().add(authConfig.expires_in_refresh_token_days, "days").toDate(),
      refresh_token,
      user_id: user.id!
    })

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token
    };
  }
}

export { AuthenticateUserUseCase };