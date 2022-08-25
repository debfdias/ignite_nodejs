import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create({ id, name, email, password, driver_license, avatar }: ICreateUserDTO): Promise<void> {
    const user = this.ormRepository.create({
      id,
      name,
      email,
      password,
      driver_license,
      avatar
    });

    await this.ormRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  async save(user: User): Promise<void> {
    await this.ormRepository.save(user);
  }
}

export { UsersRepository };