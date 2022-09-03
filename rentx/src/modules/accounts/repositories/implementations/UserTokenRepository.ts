import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '../../dtos/ICreateUserTokenDTO';
import { IUsersTokenRepository } from '../IUsersTokenRepository';
import { UserToken } from '../../entities/UserToken';

class UserTokenRepository implements IUsersTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken | undefined> {
    const usersTokens = await this.ormRepository.findOne({ user_id, refresh_token });

    return usersTokens;
  }

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const { user_id, expires_date, refresh_token } = data;

    const userToken = this.ormRepository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({ refresh_token });

    return userToken;
  }
}

export { UserTokenRepository };