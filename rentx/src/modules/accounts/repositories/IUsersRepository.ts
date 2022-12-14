import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  save(user: User): Promise<void>;
}

export { IUsersRepository };