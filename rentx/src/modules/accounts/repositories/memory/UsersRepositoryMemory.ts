import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from '../../entities/User';

import { IUsersRepository } from "../IUsersRepository";


class UsersRepositoryMemory implements IUsersRepository {
  users: User[] = [];
  
  async create({ driver_license, email, name, password}: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_license, name, email, password
    })

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id)
  }

  save(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}

export { UsersRepositoryMemory }