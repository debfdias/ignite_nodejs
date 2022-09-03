import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '../../entities/Car';

interface IRequest {
  name?: string;
  brand?: string;
  category_id?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute(iRequest?: IRequest): Promise<Car[]> {
    const cars = this.carsRepository.findAllAvailable({
      name: iRequest?.name,
      brand: iRequest?.brand,
      category_id: iRequest?.category_id,
    });

    return cars;
  }
}

export { ListAvailableCarsUseCase };