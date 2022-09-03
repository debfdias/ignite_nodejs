import { container } from 'tsyringe';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import { IMailProvider } from '@shared/providers/Mail/IMailProvider';
import { IStorage } from '@shared/providers/Storage/IStorage';

import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository';
import { UsersRepository } from '@modules/accounts/repositories/implementations/UserRepository';
import { CarsRepository } from '@modules/cars/repositories/implementations/CarsRepository';
import { CarsImagesRepository } from '@modules/cars/repositories/implementations/CarsImagesRepository';
import { RentalsRepository } from '@modules/rentals/repositories/implementations/RentalsRepository';
import { UserTokenRepository } from '@modules/accounts/repositories/implementations/UserTokenRepository';
import { EtherealMailProvider } from '@shared/providers/Mail/implementations/EtherealMailProvider';
import { LocalStorage } from '@shared/providers/Storage/implementations/LocalStorage';
import { S3Storage } from '@shared/providers/Storage/implementations/S3Storage';


export const registeredDependencies = {
  categoriesRepository: 'CategoriesRepository',
  specificationsRepository: 'SpecificationsRepository',
  usersRepository: 'UsersRepository',
  carsRepository: 'CarsRepository',
  carsImagesRepository: 'CarsImagesRepository',
  rentalsRepository: 'RentalsRepository',
  userTokensRepository: 'UsersTokensRepository',
  mailProvider: 'MailProvider',
  storageProvider: 'StorageProvider',
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
container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository
)

container.registerSingleton<IUsersTokenRepository>(
  'UsersTokensRepository',
  UserTokenRepository
)

container.registerInstance<IMailProvider>(
  "MailProvider",
  new EtherealMailProvider()
)

if (process.env.DISK_STORAGE === "local") {
  container.registerSingleton<IStorage>(
    "StorageProvider",
    LocalStorage
  )
} else {
  container.registerSingleton<IStorage>(
    "StorageProvider",
    S3Storage
  )
}

