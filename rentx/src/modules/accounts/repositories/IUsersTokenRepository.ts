import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserToken } from '../entities/UserToken';

interface IUsersTokenRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserToken | undefined>;
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken | undefined >;
}

export { IUsersTokenRepository };