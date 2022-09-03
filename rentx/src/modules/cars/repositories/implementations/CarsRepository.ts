import { getRepository, Repository } from 'typeorm';
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IFindAllAvailableDTO } from '@modules/cars/dtos/IFindAllAvailableDTO';
import { ICarsRepository } from "../ICarsRepository";
import { Car } from '../../entities/Car';

class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.ormRepository
          .createQueryBuilder()
          .update()
          .set({available})
          .where("id=:id")
          .setParameters({id})
          .execute()
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.ormRepository.create({
      name: data.name,
      description: data.description,
      license_plate: data.license_plate,
      fine_amount: data.fine_amount,
      brand: data.brand,
      category_id: data.category_id,
      daily_rate: data.daily_rate,
      specifications: data.specifications,
      id: data.id
    });

    await this.ormRepository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = this.ormRepository.findOne({ license_plate });

    return car;
  }

  async findAllAvailable(data?: IFindAllAvailableDTO): Promise<Car[]> {
    const parameters: IFindAllAvailableDTO = {};

    if (data?.name) parameters.name = data.name;
    if (data?.brand) parameters.brand = data.brand;
    if (data?.category_id) parameters.category_id = data.category_id;

    const cars = await this.ormRepository.find({
      where: {
        available: true,
        ...parameters,
      },
    });

    return cars;
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = await this.ormRepository.findOne(id);

    return car;
  }

  async save(car: Car): Promise<void> {
    await this.ormRepository.save(car);
  }
}

export { CarsRepository };