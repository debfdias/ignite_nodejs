import { inject, injectable } from "tsyringe";
import dayjs from "dayjs";
import { hash } from "bcryptjs";

import { AppError } from "../../../../errors/AppError";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor (
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokenRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {};

  async execute ({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token);

    if(!userToken) {
      throw new AppError("Token invalid!");
    }

    if(dayjs(userToken.expires_date).isBefore(Date.now())) {
      throw new AppError("Token expired!");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user!.password = await hash(password, 8);

    await this.usersRepository.create(user!);

    await this.usersTokensRepository.deleteById(userToken.id);
  }

}

export { ResetPasswordUseCase }