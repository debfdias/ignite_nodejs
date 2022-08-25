import { container } from 'tsyringe';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImagesRepository';

import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository';
import { UsersRepository } from '@modules/accounts/repositories/implementations/UserRepository';
import { CarsRepository } from '@modules/cars/repositories/implementations/CarsRepository';
import { CarsImagesRepository } from '@modules/cars/repositories/implementations/CarsImagesRepository';


export const registeredDependencies = {
  categoriesRepository: 'CategoriesRepository',
  specificationsRepository: 'SpecificationsRepository',
  usersRepository: 'UsersRepository',
  carsRepository: 'CarsRepository',
  carsImagesRepository: 'CarsImagesRepository'
} as const;

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<ICarsRepository>(
  'CarsRepository',
  CarsRepository
)

container.registerSingleton<ICarsImageRepository>(
  'CarsImagesRepository',
  CarsImagesRepository
)