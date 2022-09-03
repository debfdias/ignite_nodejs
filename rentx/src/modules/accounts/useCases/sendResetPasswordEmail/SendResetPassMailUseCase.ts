import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import dayjs from "dayjs";
import { resolve } from "path";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";
import { AppError } from "errors/AppError";
import { IMailProvider } from "../../../../shared/providers/Mail/IMailProvider";

@injectable()
class SendResetPassMailUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokenRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {};

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(__dirname, "..", "..", "views", "resetPassword.hbs");

    if(!user) {
      throw new AppError("User does not exists!");
    }

    const token = uuidV4();

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id!,
      expires_date: dayjs().add(3, "hour").toDate()
    });

    const variables = {
      name: user.name,
      link: `${process.env.RESET_MAIL_URL}${token}`
    }
    await this.mailProvider.sendMail(
      email, 
      "Reset password", 
      variables,
      templatePath
    );
  }

}

export { SendResetPassMailUseCase }