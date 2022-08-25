import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IFindAllAvailableDTO } from "@modules/cars/dtos/IFindAllAvailableDTO";
import { Car } from "../../entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({ name, description, brand, daily_rate, fine_amount, license_plate, category_id, id }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name, 
      description, 
      brand, 
      daily_rate, 
      fine_amount, 
      license_plate, 
      category_id,
      id
    })

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAllAvailable(data?: IFindAllAvailableDTO): Promise<Car[]> {
    let availableCars = this.cars.filter(car => car.available);

    if (!data) return availableCars;

    const { name, brand, category_id } = data;

    availableCars = availableCars.filter(car => {
      if (!name && !brand && !category_id) return true;

      if (car.name === name) return true;
      if (car.brand === brand) return true;
      if (car.category_id === category_id) return true;

      return false;
    });

    return availableCars;
  }

  async findById(id: string): Promise<Car | undefined> {
    return this.cars.find(car => car.id === id);
  }

  async save(car: Car): Promise<void> {
    const findIndex = this.cars.findIndex(findCar => findCar.id === car.id);

    this.cars[findIndex] = car;
  }
}

export { CarsRepositoryMemory }